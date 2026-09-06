import React, { useEffect } from 'react';
import LegalTabs from '../components/LegalTabs';

const privacySections = [
  {
    title: '1. Introduction',
    body: [
      'This Privacy Policy explains how MyVizen collects, uses, stores, protects, and shares information when you use the MyVizen mobile application, website, admin services, and related support services.',
      'MyVizen is a wellness coaching platform for coaches, wellness centre operators, clients, and guests. Coaches use MyVizen to manage clients, reports, diet/workout plans, reminders, subscriptions, and centre activity. Clients and guests use MyVizen to receive coaching, reports, plans, reminders, messages, and progress tracking from their coach.',
      'By creating an account or using MyVizen, you agree to this Privacy Policy.',
    ],
  },
  {
    title: '2. Account and Profile Information',
    body: [
      'We may collect account and profile information such as name, email address, phone number, password or authentication information, profile photo, gender, age, and basic profile details.',
      'For coaches, we may collect coach profile information such as wellness centre name, city, experience, description, certification documents, partner details, centre details, and subscription status.',
    ],
  },
  {
    title: '3. Wellness, Health, Fitness, and Nutrition Information',
    body: [
      'MyVizen may collect wellness and body information entered by users or coaches, including height, weight, BMI, body-fat percentage, muscle, body composition values, goals, notes, report history, and progress records.',
      'We may also collect diet plans, meal plans, food logs, habit logs, daily progress entries, water intake, workout plans, and related coaching information.',
      'This information is used only for general wellness coaching features. MyVizen is not a medical service and does not provide medical advice, diagnosis, treatment, emergency care, disease management, or clinical decision support.',
    ],
  },
  {
    title: '4. Photos, Files, Chat, and Other User Content',
    body: [
      'Users may upload or share profile photos, progress photos, meal-proof photos, success-story photos, report PDFs, files, chat images, messages, and notes.',
      'If a coach records a voice message for an alarm or reminder, we may store and process that voice recording only for the reminder feature.',
      'Coach-client chat and shared content are part of the app service. Client information shared in the app may be visible to the assigned coach, and coach profile information may be visible to connected clients.',
    ],
  },
  {
    title: '5. Payment and Subscription Information',
    body: [
      'If you use paid subscription features or submit manual payment proof, we may collect selected plan, duration, amount, order ID, payment status, renewal date, UPI reference/UTR number, payment screenshot, payer name, and optional payment note.',
      'We do not collect UPI PINs, OTPs, card numbers, bank passwords, or full bank login information. MyVizen will never ask for your UPI PIN or OTP.',
      'Payment and subscription records may be used to verify payments, activate plans, manage renewals, handle support requests, prevent fraud, and keep audit records where legally required.',
    ],
  },
  {
    title: '6. Device, App, and Technical Information',
    body: [
      'We may collect device model, operating system, app version, basic diagnostic information, crash or error information, and usage information needed to operate and improve the app.',
      'We may collect push notification tokens to deliver reminders, alarms, chat updates, report updates, plan updates, and subscription or status alerts.',
    ],
  },
  {
    title: '7. How We Use Information',
    body: [
      'We use information to create and authenticate accounts, connect clients with coaches, create and display wellness reports, show diet/workout plans, track progress, generate PDF reports, send reminders and notifications, support chat, manage subscriptions, review payment proof, provide customer support, improve the app, protect security, prevent misuse, and comply with legal obligations.',
      'We do not sell personal information. We do not use personal or health data for third-party advertising.',
    ],
  },
  {
    title: '8. How Information Is Shared',
    body: [
      'Client/Guest wellness data, reports, plans, photos, logs, and messages may be visible to the coach managing that client. Coach profile and centre information may be visible to connected clients.',
      'We may use service providers such as our backend hosting provider, Google Firebase, Expo push notification services, Google sign-in services, email/support tools, and operational services needed to run MyVizen.',
      'We may disclose information if required by law, court order, legal process, safety needs, security protection, fraud prevention, or business transfer.',
    ],
  },
  {
    title: '9. Data Security',
    body: [
      'Data transmitted between the app, website, and our backend is encrypted in transit using HTTPS/TLS. We use reasonable technical and organisational safeguards to protect account, wellness, payment-proof, media, and communication data.',
      'No internet service is completely secure, and users are responsible for keeping their login credentials confidential.',
    ],
  },
  {
    title: '10. Data Retention',
    body: [
      'We keep personal information for as long as the account is active or as needed to provide MyVizen services.',
      'We may retain some information longer where required for legal compliance, security and fraud prevention, payment records, tax records, audit records, disputes, or support requests.',
      'When an account deletion request is completed, we delete or anonymise associated personal data unless we are legally required to retain specific records.',
    ],
  },
  {
    title: '11. Account Deletion and User Rights',
    id: 'account-deletion',
    body: [
      'Users can request account deletion in the MyVizen app by opening Settings and selecting Delete My Account. Users can also email pspmtech2020@gmail.com from their registered email address to request account/data deletion.',
      'After deletion is requested, the account may be deactivated immediately and permanently deleted or anonymised after the applicable grace or retention period, unless legal retention is required.',
      'Users may request access to personal data, correction of inaccurate information, deletion of specific personal data where legally allowed, a copy of personal data, or withdrawal of consent where processing is based on consent.',
    ],
  },
  {
    title: '12. App Permissions',
    body: [
      'MyVizen may request camera, photos/media/storage, microphone, notifications, alarms/reminders, biometric authentication, internet/network, and location-related permissions.',
      'These permissions support profile photos, progress photos, files, PDF sharing, voice reminders, notifications, alarms, secure login, backend access, and centre/profile features.',
      'Users can manage permissions in device settings. Some features may not work if permissions are denied.',
    ],
  },
  {
    title: "13. Children's Privacy",
    body: [
      'MyVizen is intended for users aged 18 and above. We do not knowingly collect personal data from children. If you believe a child has provided personal data, contact us and we will take appropriate deletion steps.',
    ],
  },
  {
    title: '14. International Users',
    body: [
      'MyVizen is operated from India. If you use the app from another country, your information may be processed in India or other locations where our service providers operate.',
    ],
  },
  {
    title: '15. Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time. When we make changes, we will update the Last updated date and, where appropriate, notify users in the app or through other reasonable means.',
    ],
  },
  {
    title: '16. Contact Us',
    body: [
      'For privacy questions, support, or account deletion requests, contact pspmtech2020@gmail.com.',
    ],
  },
];

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
          <p className="page-lead">Last updated: September 4, 2026</p>
          <LegalTabs />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="legal-container">
            <div className="legal-meta-box">
              <p><strong>Provider:</strong> PSPM Technologies / MyVizen</p>
              <p><strong>Website:</strong> https://myvizen.in</p>
              <p><strong>API service:</strong> https://api.myvizen.in</p>
              <p><strong>Contact:</strong> pspmtech2020@gmail.com</p>
            </div>

            {privacySections.map((section) => (
              <section key={section.title} id={section.id} className="legal-section-block">
                <h2>{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
