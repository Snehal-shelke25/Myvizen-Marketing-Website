import React, { useEffect } from 'react';

export default function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <section className="page-header">
        <div className="container">
          <div className="section-badge"><span className="badge-dot"></span> Legal</div>
          <h1 className="page-title">Privacy Policy</h1>
          <p className="page-lead">Last updated: August 26, 2026</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="legal-container">
            <p>Welcome to MyVizen ("we," "our," or "us"). MyVizen is committed to respecting your privacy and protecting the health and personal information shared across our mobile applications and web platforms.</p>

            <h2>1. Information We Collect</h2>
            <p>We collect personal information necessary to deliver body composition reports, personalized diet plans, and habit tracking services:</p>
            <ul>
              <li><strong>Account Details:</strong> Name, email address, phone number, and profile image.</li>
              <li><strong>Health & Body Composition Data:</strong> Height, weight, age, BMI, body fat %, visceral fat rating, skeletal muscle %, water %, and metabolic rates.</li>
              <li><strong>App Usage & Habit Logs:</strong> Daily meal check-offs, hydration logs, supplement alarms, and coach chat logs.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>Your data is strictly used to empower your wellness journey and facilitate coaching communications:</p>
            <ul>
              <li>To calculate body composition metrics and generate PDF health scorecards.</li>
              <li>To display diet plans and habit compliance logs to your assigned wellness coach.</li>
              <li>To deliver push notifications and reminder alarms configured by you or your coach.</li>
              <li>To improve platform security and maintain cloud synchronization.</li>
            </ul>

            <h2>3. Data Protection & Sharing</h2>
            <p>We do not sell, rent, or trade your health or personal data to third-party advertisers. Your information is shared exclusively with your designated wellness coach and center staff for program management.</p>

            <h2>4. Security Standards</h2>
            <p>All data transmitted between the MyVizen app and our servers is encrypted using industry-standard SSL/TLS protocols. Stored data is safeguarded in secure cloud databases.</p>

            <h2>5. Contact Us</h2>
            <p>If you have questions regarding this Privacy Policy or wish to request data deletion, please contact us at <strong>privacy@myvizen.com</strong>.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
