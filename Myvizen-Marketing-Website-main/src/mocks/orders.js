export function createMockOrder({ coach, plan, durationMonths, amount }) {
  const randomId = `MV-${new Date().getFullYear()}${String(new Date().getMonth()+1).padStart(2,'0')}-${Math.floor(10000 + Math.random() * 90000)}`;
  return {
    orderId: randomId,
    coachName: coach?.name || 'Pankaj Narwade',
    coachEmail: coach?.email || 'pankaj@example.com',
    centreName: coach?.centre || 'Charming Aura, Pune',
    maskedEmail: coach?.maskedEmail || 'pan***@example.com',
    planName: plan?.name || 'Professional',
    planId: plan?.id || 'professional',
    durationMonths: durationMonths || 3,
    durationText: `${durationMonths || 3} Months`,
    amount: amount || 1497,
    status: 'Submitted', // 'Submitted' | 'Verifying' | 'Active'
    createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    createdDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    upiId: 'myvizen@upi',
    merchantName: 'MyVizen Wellness Technologies',
  };
}
