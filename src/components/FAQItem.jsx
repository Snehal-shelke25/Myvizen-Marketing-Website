import React from 'react';

export default function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? 'active' : ''}`}>
      <div className="faq-header" onClick={onToggle} style={{ cursor: 'pointer' }}>
        <h3>{question}</h3>
        <div className="faq-icon" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
          ▼
        </div>
      </div>
      <div className="faq-body" style={{ display: isOpen ? 'block' : 'none' }}>
        <div className="faq-content">{answer}</div>
      </div>
    </div>
  );
}
