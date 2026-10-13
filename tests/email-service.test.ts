import {
  createEmailService, MockEmailService, UnavailableEmailService,
} from '../server/email-service';

jest.mock('@sendgrid/mail', () => ({
  __esModule: true,
  default: { setApiKey: jest.fn(), send: jest.fn() },
}));

describe('production email configuration', () => {
  const originalEnv = process.env;
  beforeEach(() => {
    // Do not inherit or inspect any workspace credentials.
    process.env = { NODE_ENV: 'production' };
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterEach(() => {
    process.env = originalEnv;
    jest.restoreAllMocks();
  });

  test.each([undefined, 'mock', 'unsupported'])(
    'starts with explicit unavailable service for selector %s', (selector) => {
      if (selector) process.env.EMAIL_SERVICE = selector;
      const service = createEmailService();
      expect(service).toBeInstanceOf(UnavailableEmailService);
      expect(service).not.toBeInstanceOf(MockEmailService);
      expect(service.isAvailable).toBe(false);
    },
  );

  test('incomplete SendGrid configuration does not crash startup', () => {
    process.env.EMAIL_SERVICE = 'sendgrid';
    expect(createEmailService()).toBeInstanceOf(UnavailableEmailService);
  });

  test('unavailable service never reports successful sends', async () => {
    const service = createEmailService();
    expect(await service.sendEmail({ to: 'test@example.com', subject: 'Test', html: '' })).toBe(false);
    expect(await service.sendConfirmationEmail({} as any, '')).toBe(false);
    expect(await service.sendWelcomeEmail({} as any)).toBe(false);
    expect(await service.sendNewsletterToSubscriber({} as any, {} as any)).toBe(false);
    expect(await service.sendNewsletterToAll({} as any, [{ email: 'test@example.com' }] as any))
      .toMatchObject({ success: 0, failed: 1, details: [{ success: false }] });
  });

  test('development mock does not enable public subscriptions', () => {
    process.env.NODE_ENV = 'development';
    expect(createEmailService().isAvailable).toBe(false);
  });
});
