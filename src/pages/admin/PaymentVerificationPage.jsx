import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import { useToast } from '../../context/ToastContext';
import { INITIAL_PAYMENT_REQUESTS } from '../../mocks/paymentRequests';

export default function PaymentVerificationPage() {
  const { showToast } = useToast();

  const [paymentRequests, setPaymentRequests] = useState(INITIAL_PAYMENT_REQUESTS);
  const [activeTab, setActiveTab] = useState('Under Review'); // 'Under Review' | 'Approved' | 'Rejected' | 'All'
  const [searchQuery, setSearchQuery] = useState('');

  // Review Side Panel / Modal state
  const [selectedReq, setSelectedReq] = useState(null);
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const filteredRequests = paymentRequests.filter(req => {
    const matchesTab = activeTab === 'All' || req.status === activeTab;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q ||
      req.id.toLowerCase().includes(q) ||
      req.utr.toLowerCase().includes(q) ||
      req.coachName.toLowerCase().includes(q) ||
      req.coachEmail.toLowerCase().includes(q);

    return matchesTab && matchesSearch;
  });

  const handleApprove = (req) => {
    const updated = paymentRequests.map(r => {
      if (r.id === req.id) return { ...r, status: 'Approved' };
      return r;
    });
    setPaymentRequests(updated);
    setSelectedReq(null);
    showToast(`Payment ${req.id} approved & subscription activated!`, 'success');
  };

  const handleReject = (req) => {
    if (!rejectionReason) {
      showToast('Please specify a rejection reason', 'error');
      return;
    }
    const updated = paymentRequests.map(r => {
      if (r.id === req.id) return { ...r, status: 'Rejected', rejectionReason };
      return r;
    });
    setPaymentRequests(updated);
    setSelectedReq(null);
    setShowRejectInput(false);
    setRejectionReason('');
    showToast(`Payment ${req.id} rejected. Reason recorded.`, 'error');
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-content">
        <AdminHeader
          title="Payment Verification"
          subtitle="Verify manual UPI payments, UTR references, and activate coach plans"
        />

        <div className="admin-page-body">

          {/* ── TOP HEADER BANNER ── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: '800', color: '#09381e', margin: '0 0 4px 0' }}>
                💳 Manual UPI Payment Approvals
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                Review UTR transaction IDs and verify receipts before plan activation
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ background: '#fef3c7', color: '#b45309', padding: '6px 14px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: '800' }}>
                ⏳ {paymentRequests.filter(r => r.status === 'Under Review').length} Pending Approval
              </div>
            </div>
          </div>

          {/* ── TABS & SEARCH ── */}
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '20px 24px',
            boxShadow: '0 4px 20px rgba(15,23,42,0.04)',
            border: '1px solid #f1f5f9',
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {['Under Review', 'Approved', 'Rejected', 'All'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    border: 'none',
                    padding: '8px 18px',
                    borderRadius: '100px',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    background: activeTab === tab ? '#09381e' : '#f1f5f9',
                    color: activeTab === tab ? '#ffffff' : '#64748b',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div style={{ width: '280px' }}>
              <input
                type="text"
                placeholder="Search Order, UTR, or Coach..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '9px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem', outline: 'none' }}
              />
            </div>
          </div>

          {/* ── PAYMENT TABLE ── */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(15,23,42,0.04)',
            border: '1px solid #f1f5f9',
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #f1f5f9', background: '#f8fafc' }}>
                    <th style={{ padding: '12px 16px', fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Order ID</th>
                    <th style={{ padding: '12px 16px', fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Coach / Centre</th>
                    <th style={{ padding: '12px 16px', fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Plan Tier</th>
                    <th style={{ padding: '12px 16px', fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Amount</th>
                    <th style={{ padding: '12px 16px', fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>UTR Reference</th>
                    <th style={{ padding: '12px 16px', fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Waiting</th>
                    <th style={{ padding: '12px 16px', fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Status</th>
                    <th style={{ padding: '12px 16px', fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.length === 0 ? (
                    <tr>
                      <td colSpan="8" style={{ padding: '32px', textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>
                        No payment verification requests found in this view.
                      </td>
                    </tr>
                  ) : (
                    filteredRequests.map(req => {
                      const isPending = req.status === 'Under Review';
                      const isApproved = req.status === 'Approved';

                      return (
                        <tr key={req.id} style={{ borderBottom: '1px solid #f1f5f9' }}>

                          <td style={{ padding: '14px 16px', fontSize: '0.85rem', fontWeight: '800', color: '#09381e' }}>
                            {req.id}
                          </td>

                          <td style={{ padding: '14px 16px' }}>
                            <div>
                              <span style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0f172a', display: 'block' }}>
                                {req.coachName}
                              </span>
                              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                {req.centreName} • {req.coachEmail}
                              </span>
                            </div>
                          </td>

                          <td style={{ padding: '14px 16px' }}>
                            <span style={{
                              display: 'inline-block',
                              padding: '4px 10px',
                              borderRadius: '100px',
                              fontSize: '0.75rem',
                              fontWeight: '800',
                              background: req.plan === 'Elite' ? '#ffedd5' : '#dcfce7',
                              color: req.plan === 'Elite' ? '#c2410c' : '#15803d',
                            }}>
                              {req.plan} ({req.duration})
                            </span>
                          </td>

                          <td style={{ padding: '14px 16px', fontSize: '0.9rem', fontWeight: '800', color: '#16a34a' }}>
                            ₹{req.amount.toLocaleString()}
                          </td>

                          <td style={{ padding: '14px 16px', fontSize: '0.85rem', fontFamily: 'monospace', fontWeight: '700', color: '#334155' }}>
                            {req.utr}
                          </td>

                          <td style={{ padding: '14px 16px', fontSize: '0.8rem', color: '#64748b' }}>
                            {req.waitingTime}
                          </td>

                          <td style={{ padding: '14px 16px' }}>
                            <span style={{
                              display: 'inline-block',
                              padding: '4px 10px',
                              borderRadius: '100px',
                              fontSize: '0.72rem',
                              fontWeight: '800',
                              background: isPending ? '#fef3c7' : isApproved ? '#dcfce7' : '#fef2f2',
                              color: isPending ? '#b45309' : isApproved ? '#15803d' : '#dc2626',
                            }}>
                              {isPending ? '⏳ Under Review' : isApproved ? '🟢 Approved' : '🔴 Rejected'}
                            </span>
                          </td>

                          <td style={{ padding: '14px 16px' }}>
                            <button
                              onClick={() => { setSelectedReq(req); setShowRejectInput(false); }}
                              style={{
                                background: '#f0fdf4',
                                border: '1px solid #bbf7d0',
                                color: '#15803d',
                                padding: '6px 14px',
                                borderRadius: '8px',
                                fontSize: '0.8rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                              }}
                            >
                              🔍 Review
                            </button>
                          </td>

                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── PAYMENT REVIEW SIDE PANEL / MODAL ── */}
          {selectedReq && (
            <div className="modal-overlay" onClick={() => setSelectedReq(null)}>
              <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '640px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '800', color: '#09381e', margin: 0 }}>
                    🔍 Review Payment Request #{selectedReq.id}
                  </h3>
                  <button onClick={() => setSelectedReq(null)} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#94a3b8' }}>✕</button>
                </div>

                {/* Details Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.85rem', marginBottom: '20px' }}>
                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px' }}>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '700', display: 'block' }}>COACH</span>
                    <strong style={{ color: '#0f172a' }}>{selectedReq.coachName}</strong>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>{selectedReq.coachEmail}</span>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px' }}>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '700', display: 'block' }}>PLAN & DURATION</span>
                    <strong style={{ color: '#15803d' }}>{selectedReq.plan} ({selectedReq.duration})</strong>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Amount: ₹{selectedReq.amount.toLocaleString()}</span>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px' }}>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '700', display: 'block' }}>UTR REFERENCE</span>
                    <strong style={{ fontFamily: 'monospace', color: '#09381e' }}>{selectedReq.utr}</strong>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Payer: {selectedReq.payerName}</span>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px' }}>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '700', display: 'block' }}>ACTIVATION PREVIEW</span>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'block' }}>Current: {selectedReq.currentPlan} ({selectedReq.currentEndDate})</span>
                    <strong style={{ fontSize: '0.78rem', color: '#16a34a', display: 'block' }}>New End: {selectedReq.newEndDate}</strong>
                  </div>
                </div>

                {/* Screenshot Preview */}
                <div style={{ marginBottom: '24px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#09381e', marginBottom: '6px', display: 'block' }}>
                    Payment Screenshot Receipt:
                  </span>
                  <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid #e2e8f0', height: '180px' }}>
                    <img
                      src={selectedReq.screenshotUrl}
                      alt="Payment Receipt"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>

                {/* Rejection Input (if toggled) */}
                {showRejectInput && (
                  <div style={{ marginBottom: '20px', background: '#fef2f2', border: '1px solid #fca5a5', padding: '14px', borderRadius: '12px' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#991b1b', marginBottom: '6px' }}>
                      Rejection Reason:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. UTR reference not found in bank statement"
                      value={rejectionReason}
                      onChange={e => setRejectionReason(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #fca5a5', fontSize: '0.88rem', outline: 'none' }}
                    />
                  </div>
                )}

                {/* Action Buttons */}
                {selectedReq.status === 'Under Review' ? (
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {!showRejectInput ? (
                      <button
                        onClick={() => setShowRejectInput(true)}
                        style={{ flex: 1, padding: '12px', background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626', borderRadius: '12px', fontSize: '0.88rem', fontWeight: '700', cursor: 'pointer' }}
                      >
                        Reject Request
                      </button>
                    ) : (
                      <button
                        onClick={() => handleReject(selectedReq)}
                        style={{ flex: 1, padding: '12px', background: '#dc2626', border: 'none', color: '#ffffff', borderRadius: '12px', fontSize: '0.88rem', fontWeight: '700', cursor: 'pointer' }}
                      >
                        Confirm Rejection
                      </button>
                    )}

                    <button
                      onClick={() => handleApprove(selectedReq)}
                      className="btn btn-primary"
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      ✓ Approve & Activate Plan
                    </button>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', fontSize: '0.88rem', fontWeight: '700', color: selectedReq.status === 'Approved' ? '#15803d' : '#dc2626' }}>
                    Status: {selectedReq.status} {selectedReq.rejectionReason && `(${selectedReq.rejectionReason})`}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
