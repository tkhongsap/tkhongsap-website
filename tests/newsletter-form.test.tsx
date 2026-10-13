import { renderToStaticMarkup } from 'react-dom/server';
import NewsletterForm from '../client/src/components/newsletter-form';
import { useQuery } from '@tanstack/react-query';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));
jest.mock('../client/src/hooks/use-toast', () => ({
  useToast: () => ({ toast: jest.fn() }),
}));

describe('newsletter availability display', () => {
  test.each([
    [{ data: { available: false }, isLoading: false, isError: false }, 'Unavailable'],
    [{ data: undefined, isLoading: false, isError: true }, 'Unavailable'],
    [{ data: undefined, isLoading: true, isError: false }, 'Checking availability...'],
  ])('blocks submission when unavailable or unknown', (state, label) => {
    (useQuery as jest.Mock).mockReturnValue(state);
    const html = renderToStaticMarkup(<NewsletterForm />);
    expect(html).toContain('disabled=""');
    expect(html).toContain(label);
    if (!state.isLoading) {
      expect(html).toContain('No subscription will be recorded or email sent');
    }
    expect(html).not.toContain('Success!');
  });

  test('enables submission only when delivery is explicitly available', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { available: true }, isLoading: false, isError: false,
    });
    const html = renderToStaticMarkup(<NewsletterForm />);
    expect(html).not.toContain('disabled=""');
    expect(html).not.toContain('temporarily unavailable');
    expect(html).toContain('Subscribe');
  });
});
