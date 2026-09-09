/**
 * The one place this app talks to the MyVizen backend.
 *
 * Shared by the admin panel and the public checkout so there is a single
 * definition of the base URL, the error shape, and how the backend's
 * { status, message, data } envelope is unwrapped.
 */
// The API lives on the api. subdomain. myvizen.in itself serves the marketing
// site, so pointing at the bare domain returns HTML for every call.
export const API_BASE =
  import.meta.env.VITE_API_BASE?.replace(/\/$/, '') || 'https://api.myvizen.in';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// The admin module registers a provider so authenticated calls pick up its
// token without this file knowing anything about admin sessions.
let authTokenProvider = () => '';
export function setAuthTokenProvider(fn) { authTokenProvider = fn; }

let onUnauthorized = null;
export function setUnauthorizedHandler(fn) { onUnauthorized = fn; }

export async function request(path, { method = 'GET', body, params, auth = true } = {}) {
  const url = new URL(`${API_BASE}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '' && value !== 'all') {
        url.searchParams.set(key, value);
      }
    });
  }

  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = authTokenProvider();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(url.toString(), {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    // fetch only rejects on network failure, so this is not a server error.
    throw new ApiError('Cannot reach the server. Check your connection.', 0);
  }

  if (response.status === 401 && auth && onUnauthorized) onUnauthorized();

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    /* nginx 413/502 pages are HTML, not JSON */
  }

  if (!response.ok) {
    // FastAPI puts HTTPException messages in `detail`; the older handlers in
    // this backend use `message`.
    const message = payload?.detail || payload?.message
      || `Request failed (${response.status})`;
    throw new ApiError(message, response.status);
  }

  if (payload && typeof payload === 'object' && 'status' in payload) {
    if (payload.status === 'error') {
      throw new ApiError(payload.message || 'Request failed', response.status);
    }
    return payload.data;
  }
  return payload;
}
