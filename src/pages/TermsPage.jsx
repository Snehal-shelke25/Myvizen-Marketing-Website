import React, { useEffect } from 'react';

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <section className="page-header">
        <div className="container">
          <div className="section-badge"><span className="badge-dot"></span> Legal</div>
          <h1 className="page-title">Terms & Conditions</h1>
          <p className="page-lead">Last updated: August 26, 2026</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="legal-container">
            <p>Welcome to MyVizen. By downloading, accessing, or using our mobile application and marketing website, you agree to comply with and be bound by the following terms and conditions.</p>

            <h2>1. Service Description</h2>
            <p>MyVizen provides a digital platform for wellness coaches and members to calculate body composition metrics, design diet plans, track daily habits, and manage physical wellness center operations.</p>

            <h2>2. Medical Disclaimer</h2>
            <p>MyVizen is an educational and organizational tool. Information, body metrics reports, adaptogen libraries, and diet plans generated within the app are not intended as medical advice or medical diagnosis. Always consult a qualified medical professional before starting any drastic dietary, supplement, or exercise regimen.</p>

            <h2>3. Account Responsibilities</h2>
            <p>You are responsible for maintaining the confidentiality of your login credentials and for all activities conducted under your account. Coaches agree to maintain professional standards when entering guest data.</p>

            <h2>4. Intellectual Property</h2>
            <p>All software code, graphics, brand logos, PDF templates, and website designs are the intellectual property of MyVizen. Unauthorized reproduction or reverse engineering is prohibited.</p>

            <h2>5. Termination</h2>
            <p>We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or misuse the platform.</p>

            <h2>6. Contact</h2>
            <p>Questions regarding these Terms & Conditions should be directed to <strong>legal@myvizen.com</strong>.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
