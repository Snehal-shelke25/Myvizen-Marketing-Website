import React from 'react';
import { testimonialsData } from '../data/testimonialsData';
import TestimonialCard from '../components/TestimonialCard';

export default function Testimonials() {
  return (
    <section className="section section-bg-light" id="testimonials">
      <div className="container">
        <div className="section-header reveal active">
          <div className="section-badge"><span className="badge-dot"></span> Wall of Trust</div>
          <h2>Loved by <span>Coaches & Members</span></h2>
          <p>Read how MyVizen is helping physical wellness centers scale their daily client transformation flow.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {testimonialsData.map((item) => (
            <TestimonialCard
              key={item.id}
              name={item.name}
              role={item.role}
              club={item.club}
              quote={item.quote}
              avatar={item.avatar}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
