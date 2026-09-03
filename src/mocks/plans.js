export const MOCK_PLANS = [
  {
    id: 'free',
    name: 'Free',
    subtitle: 'Everything you need to get started, free for 3 months',
    monthlyPrice: 0,
    yearlyMonthlyPrice: 0,
    popular: false,
    badge: '3 months free',
    badgeType: 'free',
    features: [
      { name: 'Client Management', included: true },
      { name: 'Wellness Reports', included: true },
      { name: 'Body Measurements', included: true },
      { name: 'Client Messaging', included: false },
      { name: 'Analytics Dashboard', included: false },
      { name: 'AI Diet Assistant', included: false },
      { name: 'Custom Branding', included: false },
      { name: 'Priority Support', included: false },
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    subtitle: 'Unlimited clients, messaging and analytics',
    monthlyPrice: 499,
    yearlyMonthlyPrice: 399,
    popular: true,
    badge: '★ MOST POPULAR',
    badgeType: 'popular',
    features: [
      { name: 'Client Management', included: true },
      { name: 'Wellness Reports', included: true },
      { name: 'Body Measurements', included: true },
      { name: 'Client Messaging', included: true },
      { name: 'Analytics Dashboard', included: true },
      { name: 'AI Diet Assistant', included: true },
      { name: 'Custom Branding', included: false },
      { name: 'Priority Support', included: false },
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    subtitle: 'Every feature, including AI insights and priority support',
    monthlyPrice: 999,
    yearlyMonthlyPrice: 833,
    popular: false,
    badge: 'Everything included',
    badgeType: 'elite',
    features: [
      { name: 'Client Management', included: true },
      { name: 'Wellness Reports', included: true },
      { name: 'Body Measurements', included: true },
      { name: 'Client Messaging', included: true },
      { name: 'Analytics Dashboard', included: true },
      { name: 'AI Diet Assistant', included: true },
      { name: 'Custom Branding', included: true },
      { name: 'Priority Support', included: true },
    ],
  },
];

export function calculatePlanAmount(planId, durationMonths) {
  const plan = MOCK_PLANS.find(p => p.id === planId) || MOCK_PLANS[1];
  if (planId === 'free') return 0;
  
  // 1 month: full monthly rate
  // 3 months: 5% discount
  // 6 months: 10% discount
  // 12 months: 20% discount (approx yearlyMonthlyPrice * 12)
  let baseMonthly = plan.monthlyPrice;
  let discount = 0;
  if (durationMonths === 3) discount = 0.05;
  if (durationMonths === 6) discount = 0.10;
  if (durationMonths === 12) discount = 0.20;

  const total = Math.round(baseMonthly * durationMonths * (1 - discount));
  return total;
}
