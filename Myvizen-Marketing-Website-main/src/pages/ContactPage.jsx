import React, { useState, useEffect } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    centerName: '',
    role: 'coach',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <section className="page-header">
        <div className="container">
          <div className="section-badge"><span className="badge-dot"></span> Get in Touch</div>
          <h1 className="page-title">Contact the MyVizen Team</h1>
          <p className="page-lead">
            Have questions about setting up your wellness center? Or need support with your client account? We are here to help.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info-card">
              <h2>Reach Out Directly</h2>
              <p>We work with wellness coaches, nutritionists, and club managers to transform client experience.</p>

              <div className="contact-method-item">
                <div className="contact-method-icon">📧</div>
                <div>
                  <h4>Email Support</h4>
                  <p>support@myvizen.com</p>
                </div>
              </div>

              <div className="contact-method-item">
                <div className="contact-method-icon">💬</div>
                <div>
                  <h4>WhatsApp Support</h4>
                  <p>+91 99999 99999</p>
                </div>
              </div>

              <div className="contact-method-item">
                <div className="contact-method-icon">🏢</div>
                <div>
                  <h4>Headquarters</h4>
                  <p>Mumbai & Pune, Maharashtra, India</p>
                </div>
              </div>
            </div>

            <div className="contact-form-card">
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--bg-light-green)', color: 'var(--primary-mid)', fontSize: '1.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>✓</div>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-dark)', marginBottom: '8px' }}>Message Received!</h3>
                  <p style={{ color: 'var(--text-body)' }}>Thank you, {formData.name}. A MyVizen representative will contact you within 24 hours.</p>
                  <button className="btn btn-outline" style={{ marginTop: '20px' }} onClick={() => setSubmitted(false)}>Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'var(--primary-dark)' }}>Send Us a Message</h3>

                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Your Name</label>
                    <input type="text" id="name" name="name" className="form-input" required placeholder="e.g. Snehal Shelke" value={formData.name} onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" className="form-input" required placeholder="snehal@example.com" value={formData.email} onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" className="form-input" required placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="centerName">Center / Club Name (Optional)</label>
                    <input type="text" id="centerName" name="centerName" className="form-input" placeholder="e.g. Charming Aura Club" value={formData.centerName} onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="role">I am a</label>
                    <select id="role" name="role" className="form-input" value={formData.role} onChange={handleChange}>
                      <option value="coach">Wellness Coach</option>
                      <option value="owner">Wellness Center Owner</option>
                      <option value="member">Client / Member</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="message">Message</label>
                    <textarea id="message" name="message" className="form-input form-textarea" required placeholder="Tell us how we can help you..." value={formData.message} onChange={handleChange}></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit Inquiry</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
