import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const headers: Record<string, string> =
    data !== undefined ? { "Content-Type": "application/json" } : {};
  const normalizedMethod = method.toUpperCase();

  if (!["GET", "HEAD", "OPTIONS"].includes(normalizedMethod)) {
    // Fetch a fresh token with the same session cookie as the mutation.
    // Do not retry mutations automatically: a retry could duplicate a message.
    const tokenResponse = await fetch("/api/csrf-token", {
      credentials: "include",
      cache: "no-store",
    });
    await throwIfResNotOk(tokenResponse);
    const { csrfToken } = await tokenResponse.json();
    if (typeof csrfToken !== "string" || !csrfToken) {
      throw new Error("Unable to verify this form. Please refresh and try again.");
    }
    headers["X-CSRF-Token"] = csrfToken;
  }

  const res = await fetch(url, {
    method: normalizedMethod,
    headers,
    body: data !== undefined ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
