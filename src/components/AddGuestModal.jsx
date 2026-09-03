import React, { useState } from 'react';

export default function AddGuestModal({ isOpen, onClose, onAddGuest }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState('Female');
  const [goal, setGoal] = useState('Weight Loss & Herbal Nutrition');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGuest = {
      id: `G${Date.now().toString().slice(-3)}`,
      name,
      phone,
      age: Number(age),
      gender,
      goal,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
      status: 'on-track',
      joinDate: new Date().toISOString().split('T')[0],
      metrics: { height: 165, weight: 65, bmi: 23.8, bodyFat: 23.5, visceralFat: 5, muscleMass: 42, bodyWater: 58, metabolicRate: 1420 },
      assignedDiet: 'Standard Herbal Plan',
      complianceRate: 80,
      lastLog: 'Just added'
    };
    onAddGuest(newGuest);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '20px' }}>
          👤 Add New Guest / Client
        </h3>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary-dark)' }}>Full Name</label>
            <input type="text" required placeholder="e.g. Snehal Shelke" value={name} onChange={(e) => setName(e.target.value)} className="form-input" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary-dark)' }}>Phone Number</label>
            <input type="tel" required placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-input" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary-dark)' }}>Age</label>
              <input type="number" required value={age} onChange={(e) => setAge(e.target.value)} className="form-input" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary-dark)' }}>Gender</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} className="form-input" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary-dark)' }}>Target Goal</label>
            <input type="text" value={goal} onChange={(e) => setGoal(e.target.value)} className="form-input" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add Guest</button>
          </div>
        </form>
      </div>
    </div>
  );
}
