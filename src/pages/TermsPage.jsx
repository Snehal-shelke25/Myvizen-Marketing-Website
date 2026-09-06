import React, { useEffect } from 'react';
import LegalTabs from '../components/LegalTabs';

const termsSections = [
  {
    title: '1. Acceptance of Terms',
    body: [
      'These Terms and Conditions govern your access to and use of the MyVizen mobile application, website, admin services, support services, and related features.',
      'By creating an account, accessing the app, or using MyVizen, you confirm that you have read, understood, and agree to these Terms and our Privacy Policy.',
      'If you do not agree to these Terms, please do not use MyVizen.',
    ],
  },
  {
    title: '2. Eligibility',
    body: [
      'You must be at least 18 years old, or the age of majority in your jurisdiction, and legally able to enter into a binding agreement to use MyVizen.',
      'By using the app, you confirm that you meet these requirements.',
    ],
  },
  {
    title: '3. User Roles',
    body: [
      'MyVizen supports Coaches, Clients/Guests, and authorised Admin users.',
      'Coaches are wellness coaches, centre owners, or authorised operators who manage clients, create wellness reports, assign diet/workout plans, send reminders, communicate with clients, and manage centre activity.',
      'Clients/Guests are users who receive coaching, reports, plans, reminders, messages, and progress tracking from their coach.',
      'Admin users are authorised internal MyVizen operators who may manage coach accounts, subscriptions, payment verification, support, and platform operations.',
      'Available features may differ by role, account status, subscription plan, permissions, and app version.',
    ],
  },
  {
    title: '4. Accounts and Security',
    body: [
      'Users agree to provide accurate registration and profile information, keep account details up to date, keep login credentials confidential, and use only accounts they are authorised to access.',
      'Users must notify us if they suspect unauthorised account access.',
      'We may suspend, restrict, or terminate accounts if we believe there is misuse, fraud, security risk, unlawful activity, policy violation, or breach of these Terms.',
    ],
  },
  {
    title: '5. The MyVizen Service',
    body: [
      'MyVizen provides tools for wellness coaching and client management, including coach and client login, coach profile setup, wellness centre setup, client/guest management, body composition reports, diet plans, workout plans, food logs, habit tracking, progress tracking, photos, files, PDF reports, chat, broadcasts, notifications, alarms, reminders, subscriptions, and admin management.',
      'We may add, remove, change, pause, or improve features at any time. Some features may require internet access, permissions, active subscription status, or backend availability.',
    ],
  },
  {
    title: '6. Health and Medical Disclaimer',
    body: [
      'MyVizen provides general wellness, fitness, nutrition, habit tracking, and coaching tools only.',
      'MyVizen is not a medical device, clinic, hospital, emergency service, or medical advice platform. The app does not provide medical advice, diagnosis, treatment, disease management, clinical decision support, or emergency help.',
      'Users should consult a qualified healthcare professional before starting or changing any diet, supplement, exercise, or wellness programme, especially if they have a medical condition, are pregnant, are taking medication, or need medical advice.',
      'Coaches are responsible for the guidance they provide to clients and must act within their qualifications, consent obligations, and applicable laws.',
    ],
  },
  {
    title: '7. Coach and Client Relationship',
    body: [
      'MyVizen helps coaches and clients communicate and track wellness activity, but we are not responsible for the personal coach-client relationship, advice, pricing, offline services, centre services, or promises made by individual coaches outside official MyVizen services.',
      'Clients should use their own judgement and seek qualified medical advice when needed.',
    ],
  },
  {
    title: '8. User Content',
    body: [
      'User Content means content uploaded, created, sent, or stored by users, including profile details, photos, chat messages, reports, plans, notes, measurements, files, voice recordings, and payment proof.',
      'Users retain ownership of their User Content. By using the app, users give us limited permission to host, process, display, transmit, and store User Content only as needed to operate, secure, support, and improve MyVizen.',
      'Users are responsible for making sure they have permission to upload or share content, including photos or information relating to another person.',
      'We may remove or restrict User Content that violates these Terms, applicable law, platform policies, or the rights/safety of others.',
    ],
  },
  {
    title: '9. Acceptable Use',
    body: [
      'Users must not use MyVizen for unlawful, harmful, misleading, abusive, or fraudulent purposes.',
      'Users must not upload, send, or share illegal, obscene, abusive, harassing, hateful, defamatory, violent, sexually explicit, rights-infringing, spam, malware, or unauthorised commercial content.',
      'Users must not impersonate another person, misrepresent affiliation with a coach or centre, share medical misinformation, collect or misuse another user\'s personal data, or attempt to hack, reverse engineer, overload, scrape, disrupt, or damage the app, API, backend, Firebase services, or connected systems.',
    ],
  },
  {
    title: '10. Subscriptions, Payments, and Plan Access',
    body: [
      'MyVizen may offer free and paid subscription plans for coaches or centres. Pricing, plan duration, included features, expiry date, renewal terms, and refund information should be shown before purchase or activation.',
      'Where manual UPI payment is offered, a coach may select a plan, receive an order ID, pay the exact amount using UPI, and submit payment proof such as UTR/reference number and screenshot.',
      'The MyVizen admin team verifies manual payment proof. Plan access is activated only after verification. Manual payment activation is not instant and may take up to 12 working hours after payment proof is submitted unless another timeline is shown.',
      'UPI payments do not auto-renew. Renewals require a fresh payment and verification.',
      'MyVizen will never ask for your UPI PIN, OTP, card password, bank password, or full bank login details.',
      'For paid digital app features sold inside the Android app distributed through Google Play, payment handling will follow Google Play billing requirements or any allowed alternative billing programme that applies.',
    ],
  },
  {
    title: '11. Refunds',
    body: [
      'Refund terms may depend on the plan, payment method, activation status, and applicable law.',
      'For manual UPI payments, if we cannot verify a payment after the user provides valid proof, we will support review and, where appropriate, refund the paid amount using a suitable manual method within a reasonable period.',
      'If a specific refund window or condition is shown on the payment page, order page, or refund policy page, that user-facing condition will apply.',
    ],
  },
  {
    title: '12. Notifications, Alarms, and Reminders',
    body: [
      'MyVizen may send notifications, alarms, reminders, chat alerts, report updates, plan updates, and subscription/status alerts.',
      'Delivery can depend on device permissions, battery optimisation, network availability, operating system restrictions, and user settings. We are not responsible for missed or delayed notifications caused by device or network conditions outside our control.',
    ],
  },
  {
    title: '13. Third-Party Services',
    body: [
      'MyVizen may use third-party services such as Google Firebase, Google sign-in, Expo push notifications, hosting providers, analytics/diagnostic tools, email services, and other operational tools.',
      'Third-party services may have their own terms and privacy practices. We are not responsible for third-party service interruptions or actions outside our reasonable control.',
    ],
  },
  {
    title: '14. Intellectual Property',
    body: [
      'The MyVizen app, brand, logo, design, software, user interface, content, and related materials are owned by us or our licensors, except for User Content.',
      'Users may not copy, modify, distribute, sell, reverse engineer, or create derivative works from MyVizen without written permission.',
    ],
  },
  {
    title: '15. Account Deletion and Termination',
    body: [
      'Users may stop using MyVizen at any time. Users can request account deletion through the in-app Settings > Delete My Account flow or by emailing pspmtech2020@gmail.com from their registered email address.',
      'We may suspend or terminate access if a user violates these Terms, misuses the app, creates legal/security risk, or if continued access would harm users, the platform, or our business operations.',
      'After termination, the user\'s right to use MyVizen ends. Some provisions, such as health disclaimers, limitation of liability, intellectual property, payment obligations, and dispute terms, continue to apply.',
    ],
  },
  {
    title: '16. Disclaimers',
    body: [
      'MyVizen is provided on an "as is" and "as available" basis. We do not guarantee that the app will always be available, uninterrupted, secure, error-free, or that all information will be accurate or complete.',
      'We do not guarantee any specific health, fitness, weight, nutrition, business, income, coaching, or wellness outcome from use of the app.',
    ],
  },
  {
    title: '17. Limitation of Liability',
    body: [
      'To the maximum extent permitted by law, we are not liable for indirect, incidental, special, consequential, punitive, or exemplary damages, including loss of profits, data, goodwill, health outcomes, business interruption, or missed reminders.',
      'Where liability cannot be excluded, our total liability for any claim will be limited to the amount paid by the user to MyVizen for the service in the 12 months before the claim, or the minimum amount permitted by law if no amount was paid.',
    ],
  },
  {
    title: '18. Indemnity',
    body: [
      'Users agree to defend, indemnify, and hold us harmless from claims, losses, damages, liabilities, costs, and expenses arising from their use of MyVizen, their User Content, their coaching or client activity, their violation of these Terms, or their violation of applicable law or third-party rights.',
    ],
  },
  {
    title: '19. Changes to Terms',
    body: [
      'We may update these Terms from time to time. We will update the Last updated date and, where appropriate, notify users through the app or another reasonable method. Continued use of MyVizen after changes means the user accepts the updated Terms.',
    ],
  },
  {
    title: '20. Governing Law and Contact',
    body: [
      'These Terms are governed by the laws of India, without regard to conflict of law principles. Disputes will be subject to the competent courts in India, unless applicable consumer law requires another venue.',
      'For questions about these Terms, contact pspmtech2020@gmail.com.',
    ],
  },
];

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

            {termsSections.map((section) => (
              <section key={section.title} className="legal-section-block">
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
