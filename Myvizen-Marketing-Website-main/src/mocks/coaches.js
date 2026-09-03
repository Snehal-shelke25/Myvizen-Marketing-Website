export const MOCK_COACHES = [
  {
    id: 'COACH-101',
    name: 'Pankaj Narwade',
    email: 'pankaj@example.com',
    phone: '+91 98230 11223',
    centre: 'Charming Aura, Pune',
    maskedEmail: 'pan***@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    currentPlan: 'Professional',
  },
  {
    id: 'COACH-102',
    name: 'Snehal Shelke',
    email: 'coach@myvizen.com',
    phone: '+91 98230 12345',
    centre: 'Charming Aura Wellness',
    maskedEmail: 'sne***@myvizen.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop',
    currentPlan: 'Elite',
  },
  {
    id: 'COACH-103',
    name: 'Siddharth Zende',
    email: 'siddharth@example.com',
    phone: '+91 98230 99887',
    centre: 'HerbalFit Club, Mumbai',
    maskedEmail: 'sid***@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    currentPlan: 'Free',
  },
  {
    id: 'COACH-104',
    name: 'Ananya Sharma',
    email: 'ananya@example.com',
    phone: '+91 98765 43210',
    centre: 'Vizen Care, Delhi',
    maskedEmail: 'ana***@example.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop',
    currentPlan: 'Professional',
  },
];

export function findCoachByQuery(query) {
  if (!query) return null;
  const q = query.trim().toLowerCase();
  return MOCK_COACHES.find(c => 
    c.email.toLowerCase() === q ||
    c.phone.replace(/\s+/g, '').includes(q.replace(/\s+/g, '')) ||
    c.name.toLowerCase().includes(q)
  ) || MOCK_COACHES[0];
}
