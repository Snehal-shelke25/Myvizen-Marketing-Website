/**
 * Every admin endpoint, one function each.
 *
 * These mirror admin/router.py on the backend. When an endpoint changes, this
 * file changes — screens do not need to know the URL shape.
 */
import { request, setToken } from './client';

// ── auth ─────────────────────────────────────────────────────────────────────

export async function login(email, password) {
  const data = await request('/admin/login', {
    method: 'POST',
    auth: false,
    body: { email, password },
  });
  setToken(data.token);
  return data;
}

export function me() {
  return request('/admin/me');
}

export function logout() {
  setToken('');
}

// ── dashboard ────────────────────────────────────────────────────────────────

export function getStats() {
  return request('/admin/stats');
}

// ── coaches ──────────────────────────────────────────────────────────────────

export function listCoaches({ page = 1, pageSize = 25, q = '', status = 'all', plan = 'all' } = {}) {
  return request('/admin/coaches', {
    params: { page, page_size: pageSize, q, status, plan },
  });
}

export function getCoach(id) {
  return request(`/admin/coaches/${id}`);
}

export function createCoach(payload) {
  return request('/admin/coaches', { method: 'POST', body: payload });
}

export function suspendCoach(id, reason) {
  return request(`/admin/coaches/${id}/suspend`, { method: 'POST', body: { reason } });
}

export function activateCoach(id) {
  return request(`/admin/coaches/${id}/activate`, { method: 'POST' });
}

export function coachSubscriptionHistory(id) {
  return request(`/admin/coaches/${id}/subscription-history`);
}

// ── guests ───────────────────────────────────────────────────────────────────

export function listGuests({ page = 1, pageSize = 25, q = '', coachId } = {}) {
  return request('/admin/guests', {
    params: { page, page_size: pageSize, q, coach_id: coachId },
  });
}

// ── subscriptions ────────────────────────────────────────────────────────────

export function listPlans() {
  return request('/admin/plans');
}

export function listSubscriptions({
  page = 1, pageSize = 25, q = '', plan = 'all', status = 'all', expiringDays,
} = {}) {
  return request('/admin/subscriptions', {
    params: { page, page_size: pageSize, q, plan, status, expiring_days: expiringDays },
  });
}

/**
 * Assign or extend a coach's plan.
 * `note` is required by the backend so every grant is accountable.
 */
export function grantSubscription({ coachId, planCode, months, days, note, source, paymentRef }) {
  return request('/admin/subscriptions/grant', {
    method: 'POST',
    body: {
      coach_id: coachId,
      plan_code: planCode,
      months,
      days,
      note,
      source,
      payment_ref: paymentRef,
    },
  });
}

// ── audit log ────────────────────────────────────────────────────────────────

export function listAudit({ page = 1, pageSize = 50, q = '', action = '' } = {}) {
  // The backend filters actors by `actor`; the shared list hook calls it `q`.
  return request('/admin/audit', {
    params: { page, page_size: pageSize, actor: q, action },
  });
}

// ── admin users (super only) ─────────────────────────────────────────────────

export function listAdmins() {
  return request('/admin/admins');
}

export function createAdmin({ email, name, role, password }) {
  return request('/admin/admins', {
    method: 'POST',
    body: { email, name, role, password },
  });
}

export function deactivateAdmin(id) {
  return request(`/admin/admins/${id}/deactivate`, { method: 'POST' });
}

export function activateAdmin(id) {
  return request(`/admin/admins/${id}/activate`, { method: 'POST' });
}

// ── account deletion queue ───────────────────────────────────────────────────

export function listDeletions({ page = 1, pageSize = 25, q = '', status = 'pending' } = {}) {
  return request('/admin/deletions', {
    params: { page, page_size: pageSize, q, status },
  });
}

export function restoreDeletion(id, reason) {
  return request(`/admin/deletions/${id}/restore`, { method: 'POST', body: { reason } });
}

// ── plan catalogue (authenticated) ───────────────────────────────────────────

export function createPlan(payload) {
  return request('/admin/plans', { method: 'POST', body: payload });
}

export function updatePlan(id, payload) {
  return request(`/admin/plans/${id}`, { method: 'POST', body: payload });
}

export function retirePlan(id) {
  return request(`/admin/plans/${id}/retire`, { method: 'POST' });
}

// ── support tools ────────────────────────────────────────────────────────────

export function listErrors({ page = 1, pageSize = 50, q = '' } = {}) {
  return request('/admin/errors', { params: { page, page_size: pageSize, q } });
}

export function resetCoachPassword(id, password, reason) {
  return request(`/admin/coaches/${id}/reset-password`, {
    method: 'POST',
    body: { password, reason },
  });
}

// ── payment verification ─────────────────────────────────────────────────────

export function listPayments({ page = 1, pageSize = 25, q = '', status = 'under_review' } = {}) {
  return request('/admin/payments', {
    params: { page, page_size: pageSize, q, status },
  });
}

export function approvePayment(id, note) {
  return request(`/admin/payments/${id}/approve`, { method: 'POST', body: { note } });
}

export function rejectPayment(id, reason) {
  return request(`/admin/payments/${id}/reject`, { method: 'POST', body: { reason } });
}

export function updateCoach(id, payload) {
  return request(`/admin/coaches/${id}`, { method: 'PATCH', body: payload });
}

// ── reports & activity ───────────────────────────────────────────────────────

export function listReports({ page = 1, pageSize = 25, q = '', coachId } = {}) {
  return request('/admin/reports', {
    params: { page, page_size: pageSize, q, coach_id: coachId },
  });
}

export function getActivity(days = 30) {
  return request('/admin/activity', { params: { days } });
}
