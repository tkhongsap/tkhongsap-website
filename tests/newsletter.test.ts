import request from 'supertest';
import express from 'express';
import session from 'express-session';
import csurf from 'csurf';
import { registerRoutes } from '../server/routes';
import { storage } from '../server/storage';
import { emailService } from '../server/email-service';

// Never connect to a configured database or send real email during tests.
jest.mock('../server/pg-storage', () => ({ PgStorage: jest.fn() }));
jest.mock('../server/storage', () => {
  const actual = jest.requireActual('../server/storage');
  return { ...actual, storage: new actual.MemStorage() };
});
jest.mock('../server/email-service', () => ({
  emailService: {
    sendConfirmationEmail: jest.fn().mockResolvedValue(true),
    sendWelcomeEmail: jest.fn().mockResolvedValue(true),
  },
}));

function createTestApp() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(session({
    secret: 'test-secret',
    resave: false,
    saveUninitialized: false,
    store: new session.MemoryStore(),
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
  const agent = request.agent(app);

  beforeAll(async () => {
    const tokenRes = await agent.get('/api/csrf-token');
    await agent
      .post('/api/setup/admin')
      .set('x-csrf-token', tokenRes.body.csrfToken)
      .send({ username: 'admin', password: 'strongpassword123' })
      .expect(201);
  });

  test('newsletter subscription creates pending subscriber', async () => {
    const tokenRes = await agent.get('/api/csrf-token');
    const email = 'sub1@example.com';
    const res = await agent
      .post('/api/subscribe')
      .set('x-csrf-token', tokenRes.body.csrfToken)
      .send({ name: 'Tester', email });
    expect(res.status).toBe(201);
    const subscriber = await storage.getSubscriberByEmail(email);
    expect(subscriber?.status).toBe('pending');
    expect(emailService.sendConfirmationEmail).toHaveBeenCalled();
  });

  test('subscription confirmation sets subscriber to confirmed', async () => {
    const tokenRes = await agent.get('/api/csrf-token');
    const email = 'sub2@example.com';
    await agent
      .post('/api/subscribe')
      .set('x-csrf-token', tokenRes.body.csrfToken)
      .send({ name: 'Tester', email })
      .expect(201);
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

  test('contact submissions save only with a matching session and CSRF token', async () => {
    const message = { name: 'Test Visitor', email: 'visitor@example.com', message: 'A test contact message.' };
    const before = (await storage.getAllContactMessages()).length;
    await request(app).post('/api/contact').send(message).expect(403);
    const tokenRes = await agent.get('/api/csrf-token');
    // A token without its corresponding session cookie must also be rejected.
    await request(app).post('/api/contact')
      .set('x-csrf-token', tokenRes.body.csrfToken).send(message).expect(403);
    expect(await storage.getAllContactMessages()).toHaveLength(before);
    await agent.post('/api/contact')
      .set('x-csrf-token', tokenRes.body.csrfToken).send(message).expect(201);
    expect(await storage.getAllContactMessages()).toHaveLength(before + 1);
    expect((await storage.getAllContactMessages())[before]).toMatchObject(message);
  });

  test('invalid contact data is not saved', async () => {
    const before = (await storage.getAllContactMessages()).length;
    const tokenRes = await agent.get('/api/csrf-token');
    await agent.post('/api/contact')
      .set('x-csrf-token', tokenRes.body.csrfToken).send({}).expect(400);
    expect(await storage.getAllContactMessages()).toHaveLength(before);
  });
});
