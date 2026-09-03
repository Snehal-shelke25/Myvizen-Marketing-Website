import React, { useState } from 'react';
import { faqData } from '../data/faqData';
import FAQItem from '../components/FAQItem';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqData.filter((faq) =>
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section section-bg-light" id="faq">
      <div className="container">
        <div className="section-header reveal active">
          <div className="section-badge"><span className="badge-dot"></span> FAQ</div>
          <h2>Frequently Asked <span>Questions</span></h2>
          <p>Got questions? We have got answers. Read through our common inquiries or search dynamically.</p>
        </div>

        {/* Dynamic FAQ Search Input */}
        <div style={{ maxWidth: '500px', margin: '0 auto 30px auto' }}>
          <input 
            type="text" 
            placeholder="🔍 Search questions (e.g. download, coach, safety)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '12px 20px', borderRadius: '100px', border: '1.5px solid var(--primary-mid)', outline: 'none', fontSize: '0.9rem' }}
          />
        </div>

        <div className="faq-container">
          {filteredFaqs.map((faq, index) => (
            <FAQItem
              key={faq.id}
              question={faq.q}
              answer={faq.a}
              isOpen={openIndex === index}
              onToggle={() => toggleFaq(index)}
            />
          ))}

          {filteredFaqs.length === 0 && (
            <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
              No matching questions found for "{searchQuery}".
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
