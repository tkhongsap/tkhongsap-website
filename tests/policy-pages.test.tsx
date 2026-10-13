import { renderToStaticMarkup } from 'react-dom/server';
import PrivacyPolicy from '../client/src/pages/privacy-policy';
import TermsOfUse from '../client/src/pages/terms-of-use';
import Footer from '../client/src/components/footer';
import SEO from '../client/src/components/seo';

jest.mock('../client/src/components/seo', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));
jest.mock('wouter', () => ({
  Link: ({ href, children, ...props }: any) =>
    <a href={href} {...props}>{children}</a>,
}));

describe('public policy pages', () => {
  beforeEach(() => jest.clearAllMocks());

  test.each([
    ['/privacy-policy', 'Privacy Policy', PrivacyPolicy],
    ['/terms-of-use', 'Terms of Use', TermsOfUse],
  ] as const)('%s has readable content, metadata and related links', (path, title, Page) => {
    const html = renderToStaticMarkup(<Page />);
    expect(html).toMatch(new RegExp(`<h1[^>]*>${title}</h1>`));
    expect(html).toContain('Separate website, BNIC and Microsoft responsibilities');
    expect(html).not.toContain('Draft');
    expect(html).not.toContain('not approved for publication');
    expect(html).toContain('dateTime="2026-10-13"');
    for (const href of ['/privacy-policy', '/terms-of-use', '/contact']) {
      expect(html).toContain(`href="${href}"`);
    }
    expect(SEO).toHaveBeenCalledWith(expect.objectContaining({
      title: `${title} | Ta Khongsap`,
      canonicalUrl: path,
      pageUrl: path,
      description: expect.any(String),
    }), expect.anything());
    expect((SEO as jest.Mock).mock.calls[0][0].noindex).not.toBe(true);
  });

  test('footer retains existing destinations and wraps policy links', () => {
    const html = renderToStaticMarkup(<Footer />);
    for (const href of ['/', '/portfolio', '/writing', '/about', '/privacy-policy', '/terms-of-use']) {
      expect(html).toContain(`href="${href}"`);
    }
    expect(html).toContain('flex-wrap');
    expect(html).toContain('Footer navigation');
    expect(html).toContain('aria-label="Email"');
  });

  test('privacy notice separates website operation from BNIC evaluation', () => {
    const html = renderToStaticMarkup(<PrivacyPolicy />);
    expect(html).toContain('Totrakool (Ta) Khongsap');
    expect(html).toContain('he is not identified as the owner or operator of BNIC');
    expect(html).toContain('Microsoft Copilot receives query results');
    expect(html).toContain('Do not send BNIC data, credentials or query results');
    expect(html).toContain('It does not forward submissions by email');
    expect(html).toContain('Server'); // Providers and server responsibilities remain explicit.
    expect(html).toContain('exact access-revocation process are also unconfirmed');
  });

  test('terms do not grant Ta control over BNIC access', () => {
    const html = renderToStaticMarkup(<TermsOfUse />);
    expect(html).toContain('read-only Redshift queries');
    expect(html).toContain('Ta’s decision to stop testing does not itself revoke');
    expect(html).toContain('Do not attempt to write, update or delete source data');
    expect(html).toContain('Do not submit BNIC data, credentials or query results');
  });
});
