import { apiRequest } from '../client/src/lib/queryClient';

describe('form request CSRF handling', () => {
  const originalFetch = global.fetch;
  const fetchMock = jest.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    global.fetch = fetchMock;
  });
  afterAll(() => { global.fetch = originalFetch; });

  test('fetches a fresh session token before sending a form', async () => {
    fetchMock
      .mockResolvedValueOnce(new Response(JSON.stringify({ csrfToken: 'test-token' })))
      .mockResolvedValueOnce(new Response(JSON.stringify({ success: true }), { status: 201 }));
    const result = await apiRequest('post', '/api/contact', { name: 'Test' });
    expect(result.status).toBe(201);
    expect(fetchMock.mock.calls).toEqual([
      ['/api/csrf-token', { credentials: 'include', cache: 'no-store' }],
      ['/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': 'test-token' },
        credentials: 'include',
        body: JSON.stringify({ name: 'Test' }),
      }],
    ]);
  });

  test('read requests do not fetch a token', async () => {
    fetchMock.mockResolvedValueOnce(new Response('{}'));
    await apiRequest('GET', '/api/example');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  test('does not send the form if token retrieval fails', async () => {
    fetchMock.mockResolvedValueOnce(new Response('Unavailable', { status: 503 }));
    await expect(apiRequest('POST', '/api/contact', {})).rejects.toThrow('503');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  test('rejects a missing token instead of pretending submission succeeded', async () => {
    fetchMock.mockResolvedValueOnce(new Response('{}'));
    await expect(apiRequest('POST', '/api/contact', {})).rejects.toThrow('Unable to verify');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  test('reports a rejected mutation without retrying it', async () => {
    fetchMock
      .mockResolvedValueOnce(new Response(JSON.stringify({ csrfToken: 'test-token' })))
      .mockResolvedValueOnce(new Response('Forbidden', { status: 403 }));
    await expect(apiRequest('POST', '/api/contact', {})).rejects.toThrow('403');
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
