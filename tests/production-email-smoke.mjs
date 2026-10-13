// Run after npm run build. No workspace secrets or live database are inherited.
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
import { once } from 'node:events';

// Keep this disposable production process off the application's preview port.
const preload = `
import { Server } from 'node:net';
const listen = Server.prototype.listen;
Server.prototype.listen = function(options, callback) {
  return listen.call(this, { ...options, port: 0, host: '127.0.0.1' }, () => {
    console.log('SMOKE_PORT=' + this.address().port);
    callback?.();
  });
};`;

for (const selector of ['', 'sendgrid', 'mock']) {
  const child = spawn(process.execPath, [
    '--import', `data:text/javascript,${encodeURIComponent(preload)}`,
    'dist/index.js',
  ], {
    env: {
      NODE_ENV: 'production',
      // Nonexistent test database; the tested paths must never query it.
      DATABASE_URL: 'postgresql://test:test@127.0.0.1:1/unreachable',
      SESSION_SECRET: 'isolated-production-smoke-test-only',
      EMAIL_SERVICE: selector,
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let output = '';
  const exit = once(child, 'exit');
  try {
    const port = await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Production startup timed out: ' + output)), 15000);
      child.stdout.on('data', (chunk) => {
        output += chunk.toString();
        const match = output.match(/SMOKE_PORT=(\d+)/);
        if (match) { clearTimeout(timeout); resolve(match[1]); }
      });
      child.stderr.on('data', (chunk) => { output += chunk.toString(); });
      child.once('exit', (code) => {
        clearTimeout(timeout);
        reject(new Error(`Production exited (${code}): ${output}`));
      });
    });
    const base = `http://127.0.0.1:${port}`;
    assert.equal((await fetch(base + '/')).status, 200);
    const status = await fetch(base + '/api/newsletter/status');
    assert.deepEqual(await status.json(), { available: false });
    const tokenResponse = await fetch(base + '/api/csrf-token', {
      headers: { 'X-Forwarded-Proto': 'https' },
    });
    const { csrfToken } = await tokenResponse.json();
    const cookie = tokenResponse.headers.get('set-cookie')?.split(';')[0];
    assert.ok(cookie, 'Production must issue a session cookie behind HTTPS proxy');
    for (const path of ['/api/subscribe', '/api/newsletter/resend-confirmation']) {
      const response = await fetch(base + path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', Cookie: cookie,
          'X-CSRF-Token': csrfToken, 'X-Forwarded-Proto': 'https',
        },
        body: JSON.stringify({ email: 'never-sent@example.com' }),
      });
      assert.equal(response.status, 503);
      assert.equal((await response.json()).code, 'EMAIL_UNAVAILABLE');
    }
    assert.equal((await fetch(base + '/')).status, 200);
    console.log(`Production startup and newsletter failure passed: ${selector || 'no provider'}`);
  } finally {
    child.kill('SIGTERM');
    await exit;
  }
}
