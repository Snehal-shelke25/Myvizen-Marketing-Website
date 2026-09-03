import React, { useEffect } from 'react';
import Features from '../sections/Features';
import BmiCalculator from '../components/BmiCalculator';
import DownloadCTA from '../sections/DownloadCTA';

export default function FeaturesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <section className="page-header">
        <div className="container">
          <div className="section-badge"><span className="badge-dot"></span> Complete Capabilities</div>
          <h1 className="page-title">MyVizen Features & Interactive Tools</h1>
          <p className="page-lead">
            Explore our comprehensive suite of body analysis software, diet plan creation tools, and physical center visitor diaries.
          </p>
        </div>
      </section>

      {/* Live Interactive Simulator Section */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <BmiCalculator />
        </div>
      </section>

      <Features />

      <DownloadCTA />
    </main>
  );
}
