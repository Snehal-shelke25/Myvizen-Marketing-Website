import { request } from '../lib/http';

/** Public checkout endpoints. None of these are authenticated. */

export function getPlans() {
  return request('/payments/plans', { auth: false });
}

export function lookupAccount(identifier) {
  return request('/payments/lookup', { method: 'POST', auth: false, body: { identifier } });
}

export function createOrder({ identifier, planCode, months }) {
  return request('/payments/orders', {
    method: 'POST', auth: false,
    body: { identifier, plan_code: planCode, months },
  });
}

export function verifyOrder(orderId, otp) {
  return request(`/payments/orders/${orderId}/verify`, {
    method: 'POST', auth: false, body: { otp },
  });
}

export function submitProof(orderId, { token, utr, payerName, note, proofUrl }) {
  return request(`/payments/orders/${orderId}/proof`, {
    method: 'POST', auth: false,
    body: { token, utr, payer_name: payerName, note, proof_url: proofUrl },
  });
}

export function getOrder(orderId, token) {
  return request(`/payments/orders/${orderId}`, { auth: false, params: { t: token } });
}
