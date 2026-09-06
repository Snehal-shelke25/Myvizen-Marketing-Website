import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import PricingNavbar from './components/PricingNavbar';
import Footer from './components/Footer';
import MobileStickyCTA from './components/MobileStickyCTA';

import Home from './pages/Home';
import FeaturesPage from './pages/FeaturesPage';
import CoachesPage from './pages/CoachesPage';
import MembersPage from './pages/MembersPage';
import WellnessCenterPage from './pages/WellnessCenterPage';
import PricingPage from './pages/PricingPage';
import DownloadPage from './pages/DownloadPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import SupportPage from './pages/SupportPage';
import NotFoundPage from './pages/NotFoundPage';

import AccountStep from './pages/checkout/AccountStep';
import VerifyStep from './pages/checkout/VerifyStep';
import ReviewStep from './pages/checkout/ReviewStep';
import PayStep from './pages/checkout/PayStep';
import ProofStep from './pages/checkout/ProofStep';
import OrderStatusPage from './pages/OrderStatusPage';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import CoachManagement from './pages/admin/CoachManagement';
import GuestManagement from './pages/admin/GuestManagement';
import ReportGenerator from './pages/admin/ReportGenerator';
import DietArchitect from './pages/admin/DietArchitect';
import VisitorRegistry from './pages/admin/VisitorRegistry';
import CenterAnalytics from './pages/admin/CenterAnalytics';
import SubscriptionsPage from './pages/admin/SubscriptionsPage';
import PaymentVerificationPage from './pages/admin/PaymentVerificationPage';
import AdminSettings from './pages/admin/AdminSettings';

import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import ToastContainer from './components/ToastContainer';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';
import './index.css';
import './assets/styles/admin.css';

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isPricingPortalRoute = location.pathname === '/pricing' || location.pathname.startsWith('/checkout') || location.pathname.startsWith('/order');

  return (
    <ToastProvider>
      <AuthProvider>
        <div className="app-container">
          <ToastContainer />
          
          {/* Conditional Navigation */}
          {isPricingPortalRoute ? (
            <PricingNavbar />
          ) : !isAdminRoute ? (
            <Navbar />
          ) : null}

          <Routes>
            {/* Public Marketing Website Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/for-coaches" element={<CoachesPage />} />
            <Route path="/for-members" element={<MembersPage />} />
            <Route path="/wellness-center" element={<WellnessCenterPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/download" element={<DownloadPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/refund-policy" element={<RefundPolicyPage />} />
            <Route path="/support" element={<SupportPage />} />

            {/* Public Checkout Flow Routes */}
            <Route path="/checkout/account" element={<AccountStep />} />
            <Route path="/checkout/verify" element={<VerifyStep />} />
            <Route path="/checkout/review" element={<ReviewStep />} />
            <Route path="/checkout/pay" element={<PayStep />} />
            <Route path="/checkout/proof" element={<ProofStep />} />
            <Route path="/order/:id" element={<OrderStatusPage />} />

            {/* Admin Login Route */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Coach / Admin Dashboard Portal Routes */}
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/coaches" element={<ProtectedRoute><CoachManagement /></ProtectedRoute>} />
            <Route path="/admin/guests" element={<ProtectedRoute><GuestManagement /></ProtectedRoute>} />
            <Route path="/admin/reports" element={<ProtectedRoute><ReportGenerator /></ProtectedRoute>} />
            <Route path="/admin/diet-plans" element={<ProtectedRoute><DietArchitect /></ProtectedRoute>} />
            <Route path="/admin/visitors" element={<ProtectedRoute><VisitorRegistry /></ProtectedRoute>} />
            <Route path="/admin/payments" element={<ProtectedRoute><PaymentVerificationPage /></ProtectedRoute>} />
            <Route path="/admin/subscriptions" element={<ProtectedRoute><SubscriptionsPage /></ProtectedRoute>} />
            <Route path="/admin/analytics" element={<ProtectedRoute><CenterAnalytics /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          {!isAdminRoute && !isPricingPortalRoute && <Footer />}
          {!isAdminRoute && !isPricingPortalRoute && <MobileStickyCTA />}
        </div>
      </AuthProvider>
    </ToastProvider>
  );
}
