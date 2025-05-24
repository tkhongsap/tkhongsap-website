import request from 'supertest';
import express from 'express';
import session from 'express-session';
import MemoryStore from 'memorystore';
import csurf from 'csurf';
import { registerRoutes } from '../server/routes';
import { storage } from '../server/storage';

function createTestApp() {
  const MemoryStoreSession = MemoryStore(session);
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(session({
    secret: 'test-secret',
    resave: false,
    saveUninitialized: false,
    store: new MemoryStoreSession({ checkPeriod: 86400000 }),
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 }
  }));

  const csrfProtection = csurf();
  app.use('/api', (req, res, next) => {
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
    csrfProtection(req, res, next);
  });
  app.get('/api/csrf-token', csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
  });

  registerRoutes(app);
  return app;
}

describe('Newsletter API', () => {
  const app = createTestApp();

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    const tokenRes = await request(app).get('/api/csrf-token');
    await request(app)
      .post('/api/setup/admin')
      .set('x-csrf-token', tokenRes.body.csrfToken)
      .send({ username: 'admin', password: 'strongpassword123' });
  });

  test('newsletter subscription creates pending subscriber', async () => {
    const tokenRes = await request(app).get('/api/csrf-token');
    const email = 'sub1@example.com';
    const res = await request(app)
      .post('/api/subscribe')
      .set('x-csrf-token', tokenRes.body.csrfToken)
      .send({ name: 'Tester', email });
    expect(res.status).toBe(201);
    const subscriber = await storage.getSubscriberByEmail(email);
    expect(subscriber?.status).toBe('pending');
  });

  test('subscription confirmation sets subscriber to confirmed', async () => {
    const tokenRes = await request(app).get('/api/csrf-token');
    const email = 'sub2@example.com';
    await request(app)
      .post('/api/subscribe')
      .set('x-csrf-token', tokenRes.body.csrfToken)
      .send({ name: 'Tester', email });
    const subscriber = await storage.getSubscriberByEmail(email);
    expect(subscriber).toBeTruthy();
    const confirmRes = await request(app)
      .get(`/api/newsletter/confirm?token=${subscriber!.confirmationToken}`);
    expect(confirmRes.status).toBe(200);
    const confirmed = await storage.getSubscriberByEmail(email);
    expect(confirmed?.status).toBe('confirmed');
  });

  test('admin endpoints require authentication', async () => {
    const resUnauth = await request(app).get('/api/subscribers');
    expect(resUnauth.status).toBe(401);

    const auth = 'Basic ' + Buffer.from('admin:strongpassword123').toString('base64');
    const resAuth = await request(app).get('/api/subscribers').set('Authorization', auth);
    expect(resAuth.status).toBe(200);
    expect(Array.isArray(resAuth.body)).toBe(true);
  });
});
