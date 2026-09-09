/**
 * Admin session token, layered on the shared HTTP client in src/lib/http.js.
 *
 * The token lives in sessionStorage, not localStorage: it is cleared when the
 * tab closes, which is the right default for a panel that can grant
 * subscriptions and suspend accounts.
 */
import { setAuthTokenProvider, setUnauthorizedHandler } from '../../lib/http';

export { API_BASE, ApiError, request, setUnauthorizedHandler } from '../../lib/http';

const TOKEN_KEY = 'myvizen_admin_token';

export function getToken() {
  try {
    return sessionStorage.getItem(TOKEN_KEY) || '';
  } catch {
    return '';
  }
}

export function setToken(token) {
  try {
    if (token) sessionStorage.setItem(TOKEN_KEY, token);
    else sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    /* private browsing — the session simply will not survive a reload */
  }
}

setAuthTokenProvider(getToken);
// Re-exported above for AuthContext; kept here so importing this module is
// enough to wire the admin token into every authenticated request.
export { setUnauthorizedHandler as _setUnauthorizedHandler };
