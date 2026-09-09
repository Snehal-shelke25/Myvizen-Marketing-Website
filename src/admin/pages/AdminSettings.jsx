import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import * as adminApi from '../api/endpoints';
import AdminLayout from '../components/AdminLayout';
import ConfirmDialog from '../components/ConfirmDialog';
import { EmptyState, ErrorState, LoadingState } from '../components/StateBlock';
import Modal from '../components/Modal';

const ROLE_LABELS = {
  super: 'Super Admin — everything, including managing admins',
  support: 'Support — read everything, grant plans, suspend coaches',
  viewer: 'Viewer — read only',
};

const formatWhen = (value) => (value
  ? new Date(value).toLocaleString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  : 'Never');

export default function AdminSettings() {
  const { admin: me } = useAuth();
  const { showToast } = useToast();

  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [confirming, setConfirming] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setAdmins(await adminApi.listAdmins());
    } catch (err) {
      setError(err.message || 'Could not load admin users.');
      setAdmins([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggleActive = async (reason) => {
    const { target, activate } = confirming;
    setBusy(true);
    try {
      if (activate) await adminApi.activateAdmin(target.id);
      else await adminApi.deactivateAdmin(target.id);
      showToast(`${target.email} ${activate ? 'reactivated' : 'deactivated'}.`, 'success');
      setConfirming(null);
      load();
    } catch (err) {
      showToast(err.message || 'Could not update this admin.', 'error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminLayout
      title="Settings"
      subtitle="Admin users and access"
      actionLabel="Add Admin"
      onPrimaryAction={() => setShowCreate(true)}
    >
      <section className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <h3>Admin Users</h3>
            <p>Who can sign in to this panel, and what they are allowed to do.</p>
          </div>
        </div>

        {error && <ErrorState message={error} onRetry={load} />}

        {loading ? (
          <LoadingState label="Loading admin users..." />
        ) : admins.length === 0 ? (
          <EmptyState title="No admin users found."
                      hint="Create one with admin/create_admin.py on the server." />
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Admin</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last sign-in</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <div className="admin-person">
                        <div className="admin-avatar-fallback">
                          {(row.name || row.email || '?').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <strong>
                            {row.name || row.email}
                            {row.id === me?.id && <span className="admin-pill" style={{ marginLeft: 8 }}>You</span>}
                          </strong>
                          <span>{row.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>{(ROLE_LABELS[row.role] || row.role).split(' — ')[0]}</td>
                    <td>
                      <span className="admin-status" style={row.active
                        ? { background: '#dcfce7', color: '#15803d' }
                        : { background: '#fee2e2', color: '#b91c1c' }}>
                        {row.active ? 'Active' : 'Deactivated'}
                      </span>
                      {row.locked && (
                        <span className="admin-muted">Locked (failed sign-ins)</span>
                      )}
                    </td>
                    <td>{formatWhen(row.last_login_at)}</td>
                    <td>
                      <div className="admin-actions">
                        {row.id === me?.id ? (
                          <span className="admin-muted">--</span>
                        ) : row.active ? (
                          <button type="button" className="danger"
                                  onClick={() => setConfirming({ target: row, activate: false })}>
                            Deactivate
                          </button>
                        ) : (
                          <button type="button"
                                  onClick={() => setConfirming({ target: row, activate: true })}>
                            Reactivate
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {showCreate && (
        <CreateAdminModal
          onClose={() => setShowCreate(false)}
          onCreated={() => { setShowCreate(false); load(); }}
        />
      )}

      {confirming && (
        <ConfirmDialog
          title={confirming.activate
            ? `Reactivate ${confirming.target.email}?`
            : `Deactivate ${confirming.target.email}?`}
          message={confirming.activate
            ? 'They will be able to sign in to this panel again.'
            : 'They will be signed out and cannot sign in again until reactivated.'}
          confirmLabel={confirming.activate ? 'Reactivate' : 'Deactivate'}
          destructive={!confirming.activate}
          busy={busy}
          onConfirm={toggleActive}
          onCancel={() => setConfirming(null)}
        />
      )}
    </AdminLayout>
  );
}

function CreateAdminModal({ onClose, onCreated }) {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', role: 'support', password: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const generate = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$';
    const bytes = new Uint32Array(16);
    crypto.getRandomValues(bytes);
    let out = '';
    bytes.forEach((b) => { out += chars[b % chars.length]; });
    setForm((f) => ({ ...f, password: out }));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (form.password.length < 10) {
      setError('Password must be at least 10 characters.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await adminApi.createAdmin(form);
      showToast('Admin created.', 'success');
      onCreated();
    } catch (err) {
      setError(err.message || 'Could not create this admin.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title="Add Admin" onClose={onClose} maxWidth="560px" busy={saving}>
        <p className="admin-muted">
          Share the password with them directly. It is hashed on the server and
          cannot be read back from this panel.
        </p>

        {error && <div className="admin-error-alert">{error}</div>}

        <form className="admin-form-grid" onSubmit={submit}>
          <input className="admin-input" required placeholder="Full name"
                 value={form.name} onChange={set('name')} />
          <input className="admin-input" required type="email" placeholder="Email address"
                 value={form.email} onChange={set('email')} />

          <div>
            <label className="admin-field-label">Role</label>
            <select className="admin-input" value={form.role} onChange={set('role')}>
              {Object.entries(ROLE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="admin-field-label">Password (min 10 characters)</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input className="admin-input" required value={form.password}
                     onChange={set('password')} style={{ flex: 1 }} />
              <button type="button" className="btn btn-outline" onClick={generate}>
                Generate
              </button>
            </div>
          </div>

          <div className="admin-modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Creating...' : 'Add Admin'}
            </button>
          </div>
        </form>
    </Modal>
  );
}
