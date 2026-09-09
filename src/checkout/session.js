/**
 * What the browser remembers between checkout steps.
 *
 * Deliberately almost nothing: just the order id and its token. Everything the
 * user sees — plan, amount, status — is re-read from the server.
 *
 * Two reasons this matters:
 *
 *  1. The coach LEAVES the browser to pay in their UPI app and comes back. On
 *     mobile the tab is often reloaded in between. The old flow kept plan and
 *     amount in router location state with hardcoded fallbacks, so a reload
 *     silently showed a different person's name and the wrong amount — on the
 *     screen where someone is about to send money.
 *
 *  2. Amount and plan can then never be tampered with from the client, because
 *     the client does not hold them.
 */
const KEY = 'myvizen_checkout';

function read() {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || 'null');
  } catch {
    return null;
  }
}

function write(value) {
  try {
    if (value) sessionStorage.setItem(KEY, JSON.stringify(value));
    else sessionStorage.removeItem(KEY);
  } catch {
    /* private browsing — the user can still finish in one sitting */
  }
}

/** Called after an order is created. */
export function startCheckout(orderId) {
  write({ orderId, token: null, startedAt: Date.now() });
}

/** Called once the email code is confirmed and the server issues the token. */
export function setOrderToken(token) {
  const current = read();
  if (current) write({ ...current, token });
}

export function getCheckout() {
  return read();
}

export function clearCheckout() {
  write(null);
}

/**
 * Remember the last completed order so someone returning to the site can find
 * their status page again without digging through email. Kept in
 * localStorage — it outlives the tab and holds nothing sensitive.
 */
const LAST_KEY = 'myvizen_last_order';

export function rememberOrder(orderId, token) {
  try {
    localStorage.setItem(LAST_KEY, JSON.stringify({ orderId, token }));
  } catch { /* ignore */ }
}

export function getLastOrder() {
  try {
    return JSON.parse(localStorage.getItem(LAST_KEY) || 'null');
  } catch {
    return null;
  }
}
