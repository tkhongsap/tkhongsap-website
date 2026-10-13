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
    isAvailable: true,
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
  beforeEach(() => {
    (emailService as { isAvailable: boolean }).isAvailable = true;
    jest.clearAllMocks();
  });

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

  test('unavailable subscription and resend leave existing records untouched', async () => {
    const subscriber = await storage.createSubscriber({ email: 'existing@example.com', name: 'Existing' });
    await storage.updateSubscriberStatus(subscriber.id, 'unsubscribed');
    await storage.createConfirmationToken(subscriber.id, 'existing-token', new Date('2030-01-01'));
    const before = await storage.getAllSubscribers();
    (emailService as { isAvailable: boolean }).isAvailable = false;
    const status = await agent.get('/api/newsletter/status').expect(200);
    expect(status.body).toEqual({ available: false });
    expect(status.headers['cache-control']).toBe('no-store');
    const token = (await agent.get('/api/csrf-token')).body.csrfToken;
    for (const [path, email] of [
      ['/api/subscribe', 'not-recorded@example.com'],
      ['/api/subscribe', subscriber.email],
      ['/api/newsletter/resend-confirmation', subscriber.email],
    ]) {
      const response = await agent.post(path).set('x-csrf-token', token).send({ email }).expect(503);
      expect(response.body).toMatchObject({ success: false, code: 'EMAIL_UNAVAILABLE' });
      expect(response.body.message).toContain('No email has been sent');
    }
    expect(await storage.getAllSubscribers()).toEqual(before);
    expect(emailService.sendConfirmationEmail).not.toHaveBeenCalled();
  });

  test('unavailable admin send changes no newsletter or tracking records', async () => {
    (emailService as { isAvailable: boolean }).isAvailable = false;
    const token = (await agent.get('/api/csrf-token')).body.csrfToken;
    const lookup = jest.spyOn(storage, 'getNewsletterById');
    const tracking = jest.spyOn(storage, 'createNewsletterTracking');
    const sentDate = jest.spyOn(storage, 'updateNewsletterSentDate');
    const auth = 'Basic ' + Buffer.from('admin:strongpassword123').toString('base64');
    await agent.post('/api/newsletters/1/send').set('Authorization', auth)
      .set('x-csrf-token', token).send({}).expect(503);
    expect(lookup).not.toHaveBeenCalled();
    expect(tracking).not.toHaveBeenCalled();
    expect(sentDate).not.toHaveBeenCalled();
    lookup.mockRestore();
    tracking.mockRestore();
    sentDate.mockRestore();
  });

  test('provider rejection does not falsely claim a confirmation email was sent', async () => {
    const token = (await agent.get('/api/csrf-token')).body.csrfToken;
    (emailService.sendConfirmationEmail as jest.Mock).mockResolvedValueOnce(false);
    const response = await agent.post('/api/subscribe').set('x-csrf-token', token)
      .send({ email: 'rejected@example.com' }).expect(503);
    expect(response.body.success).toBe(false);
    const pending = await storage.getSubscriberByEmail('rejected@example.com');
    expect(pending?.status).toBe('pending');
    (emailService.sendConfirmationEmail as jest.Mock).mockResolvedValueOnce(false);
    await agent.post('/api/newsletter/resend-confirmation').set('x-csrf-token', token)
      .send({ email: 'rejected@example.com' }).expect(503);
    await storage.updateSubscriberStatus(pending!.id, 'unsubscribed');
    (emailService.sendConfirmationEmail as jest.Mock).mockResolvedValueOnce(false);
    await agent.post('/api/subscribe').set('x-csrf-token', token)
      .send({ email: 'rejected@example.com' }).expect(503);
  });

  test('unsubscribe remains usable while email is unavailable', async () => {
    const subscriber = await storage.createSubscriber({ email: 'unsubscribe@example.com' });
    await storage.updateUnsubscribeToken(subscriber.id, 'unsubscribe-test-token');
    (emailService as { isAvailable: boolean }).isAvailable = false;
    await agent.get('/api/newsletter/unsubscribe?token=unsubscribe-test-token').expect(200);
    expect((await storage.getSubscriberById(subscriber.id))?.status).toBe('unsubscribed');
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
