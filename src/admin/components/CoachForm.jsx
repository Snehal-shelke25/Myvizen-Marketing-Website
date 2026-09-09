import React, { useState } from 'react';
import Modal from './Modal';

/**
 * Create or edit a coach.
 *
 * The fields and the rules are taken from the app's own signup screen. If they
 * drifted apart, this panel could produce an account the app itself rejects —
 * a phone the app's phone-login cannot resolve, or a password its
 * change-password screen refuses. The server validates the same way; this is
 * here so the admin is told before they submit, not after.
 */
const GENDERS = ['', 'Male', 'Female', 'Other'];

export const COACH_RULES = {
  name: (v) => (!v?.trim() ? 'Required'
    : v.trim().length < 2 ? 'At least 2 characters'
    : v.trim().length > 60 ? 'At most 60 characters' : null),
  email: (v) => (!v?.trim() ? 'Required'
    : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? 'Enter a valid email address'
    : v.trim().length > 100 ? 'At most 100 characters' : null),
  phone: (v) => (!v?.trim() ? 'Required'
    : !/^\d{10}$/.test(v.trim()) ? 'Must be exactly 10 digits'
    : !/^[6-9]/.test(v.trim()) ? 'Must start with 6, 7, 8 or 9' : null),
  experience: (v) => (!v?.trim() ? 'Required' : null),
  address: (v) => (!v?.trim() ? 'Required'
    : v.trim().length < 5 ? 'Enter a complete address'
    : v.trim().length > 200 ? 'At most 200 characters' : null),
  password: (v) => (!v ? 'Required'
    : v.length < 6 ? 'At least 6 characters'
    : v.length > 50 ? 'At most 50 characters'
    : !(/[A-Za-z]/.test(v) && /\d/.test(v)) ? 'Needs at least one letter and one number'
    : null),
};

export function generatePassword() {
  // Always ends up with letters and digits, so it satisfies the app's rule.
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  const digits = '23456789';
  const bytes = new Uint32Array(10);
  crypto.getRandomValues(bytes);
  let out = '';
  bytes.forEach((b, i) => {
    out += i % 3 === 2 ? digits[b % digits.length] : letters[b % letters.length];
  });
  return out;
}

function Field({ label, name, value, onChange, error, required, type = 'text',
                 placeholder, hint, as, options, children }) {
  const id = `coach-${name}`;
  return (
    <div className="admin-form-field">
      <label className="admin-field-label" htmlFor={id}>
        {label}{required && <span className="admin-required"> *</span>}
      </label>
      {as === 'select' ? (
        <select id={id} className="admin-input" value={value || ''}
                onChange={(e) => onChange(name, e.target.value)}>
          {options.map((o) => (
            <option key={o} value={o}>{o || 'Not specified'}</option>
          ))}
        </select>
      ) : as === 'textarea' ? (
        <textarea id={id} className="admin-input" rows={2} value={value || ''}
                  placeholder={placeholder}
                  onChange={(e) => onChange(name, e.target.value)} />
      ) : children ? children : (
        <input id={id} className="admin-input" type={type} value={value || ''}
               placeholder={placeholder}
               aria-invalid={!!error}
               onChange={(e) => onChange(name, e.target.value)} />
      )}
      {error ? <p className="admin-field-error">{error}</p>
             : hint ? <p className="admin-field-hint">{hint}</p> : null}
    </div>
  );
}

export default function CoachForm({ mode = 'create', coach, onClose, onSaved, onSubmit }) {
  const isEdit = mode === 'edit';

  const [form, setForm] = useState({
    name: coach?.name || '',
    email: coach?.email || '',
    phone: coach?.phone || '',
    centre: coach?.centre || '',
    experience: coach?.experience || '',
    address: coach?.address || '',
    description: coach?.description || '',
    zoom_link: coach?.zoom_link || '',
    gender: coach?.gender || '',
    password: '',
    plan_code: 'free',
    months: 1,
  });
  const [touched, setTouched] = useState({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState('');
  // After creating, hold the dialog open on a hand-off screen. The password is
  // only knowable at this moment — closing straight away would lose it before
  // it reaches the coach.
  const [created, setCreated] = useState(null);
  const [copied, setCopied] = useState(false);

  const set = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    setTouched((t) => ({ ...t, [name]: true }));
  };

  const errors = {
    name: COACH_RULES.name(form.name),
    email: COACH_RULES.email(form.email),
    phone: COACH_RULES.phone(form.phone),
    experience: COACH_RULES.experience(form.experience),
    address: COACH_RULES.address(form.address),
    password: isEdit ? null : COACH_RULES.password(form.password),
  };
  const firstError = Object.values(errors).find(Boolean);
  const showError = (name) => (touched[name] ? errors[name] : null);

  const submit = async (event) => {
    event.preventDefault();
    setTouched({ name: 1, email: 1, phone: 1, experience: 1, address: 1, password: 1 });
    if (firstError) return;

    setSaving(true);
    setServerError('');
    try {
      const payload = { ...form };
      if (isEdit) delete payload.password;
      await onSubmit(payload);
      if (isEdit) {
        onSaved();
      } else {
        setCreated({ email: form.email.trim(), password: form.password });
      }
    } catch (err) {
      setServerError(err.message || 'Could not save this coach.');
    } finally {
      setSaving(false);
    }
  };

  if (created) {
    const credentials =
      `MyVizen sign-in\nEmail: ${created.email}\nPassword: ${created.password}`;
    const copy = async () => {
      try {
        await navigator.clipboard.writeText(credentials);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch { /* select-and-copy still works */ }
    };
    return (
      <Modal title="Coach Created" onClose={onSaved} maxWidth="520px">
        <div className="admin-callout" style={{ marginBottom: 14 }}>
          Send these to {form.name} yourself. The password cannot be read back
          from this panel once you close this dialog.
        </div>

        <pre className="admin-credentials">{credentials}</pre>

        <p className="admin-field-hint" style={{ marginTop: 12 }}>
          They sign in with these in the MyVizen app — no extra setup needed.
        </p>

        <div className="admin-modal-actions">
          <button type="button" className="btn btn-outline" onClick={copy}>
            {copied ? 'Copied' : 'Copy credentials'}
          </button>
          <button type="button" className="btn btn-primary" onClick={onSaved}>Done</button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      title={isEdit ? `Edit ${coach?.name || 'Coach'}` : 'Create Coach Account'}
      onClose={onClose}
      maxWidth="720px"
      busy={saving}
    >
      <p className="admin-muted">
        {isEdit
          ? 'These are the same details the coach sees in the app.'
          : 'The coach signs in to the mobile app with this email and password. These are the same fields and rules as the app’s own signup.'}
      </p>

      {serverError && <div className="admin-error-alert" role="alert">{serverError}</div>}

      <form onSubmit={submit}>
        <h4 className="admin-form-section">Account</h4>
        <div className="admin-form-grid-2">
          <Field label="Full name" name="name" required value={form.name}
                 onChange={set} error={showError('name')} placeholder="e.g. Pankaj Narwade" />
          <Field label="Email address" name="email" required type="email" value={form.email}
                 onChange={set} error={showError('email')} placeholder="coach@example.com"
                 hint="Used to sign in to the app" />
          <Field label="Phone number" name="phone" required value={form.phone}
                 onChange={set} error={showError('phone')} placeholder="9876543210"
                 hint="10 digits, starting 6-9" />
          <Field label="Gender" name="gender" as="select" options={GENDERS}
                 value={form.gender} onChange={set} />
        </div>

        {!isEdit && (
          <>
            <h4 className="admin-form-section">Password</h4>
            <Field label="Temporary password" name="password" required
                   value={form.password} onChange={set} error={showError('password')}
                   hint="At least 6 characters with a letter and a number — the app's own rule">
              <div style={{ display: 'flex', gap: 8 }}>
                <input className="admin-input" style={{ flex: 1 }} value={form.password}
                       placeholder="Share this with the coach"
                       onChange={(e) => set('password', e.target.value)} />
                <button type="button" className="btn btn-outline"
                        onClick={() => set('password', generatePassword())}>
                  Generate
                </button>
              </div>
            </Field>
          </>
        )}

        <h4 className="admin-form-section">Practice</h4>
        <div className="admin-form-grid-2">
          <Field label="Years of experience" name="experience" required
                 value={form.experience} onChange={set} error={showError('experience')}
                 placeholder="e.g. 3" />
          <Field label="Wellness centre" name="centre" value={form.centre}
                 onChange={set} placeholder="e.g. Charming Aura" />
        </div>
        <Field label="Address" name="address" required as="textarea" value={form.address}
               onChange={set} error={showError('address')}
               placeholder="Street, area, city" />
        <div className="admin-form-grid-2">
          <Field label="Zoom link" name="zoom_link" value={form.zoom_link}
                 onChange={set} placeholder="https://zoom.us/j/..." />
          <Field label="Short description" name="description" value={form.description}
                 onChange={set} placeholder="Shown on reports" />
        </div>

        {!isEdit && (
          <>
            <h4 className="admin-form-section">Starting plan</h4>
            <div className="admin-form-grid-2">
              <Field label="Plan" name="plan_code" as="select"
                     options={['free', 'professional', 'elite']}
                     value={form.plan_code} onChange={set} />
              {form.plan_code !== 'free' && (
                <Field label="Duration (months)" name="months" as="select"
                       options={['1', '3', '6', '12']}
                       value={String(form.months)} onChange={set} />
              )}
            </div>
            {form.plan_code === 'free' && (
              <p className="admin-field-hint">
                Free starts the same 90-day trial a coach gets when they register
                in the app themselves.
              </p>
            )}
          </>
        )}

        <div className="admin-modal-actions">
          <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Coach'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
