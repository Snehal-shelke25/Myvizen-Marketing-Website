import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import MarqueeTicker from '../components/MarqueeTicker';
import ExperienceSection from '../components/ExperienceSection';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import ScreenshotCarousel from '../components/ScreenshotCarousel';
import Benefits from '../components/Benefits';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import DownloadCTA from '../components/DownloadCTA';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Scroll reveal observer
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    };

    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <Hero />
      <StatsBar />
      <MarqueeTicker />
      <ExperienceSection />
      <Features />
      <HowItWorks />
      <ScreenshotCarousel />
      <Benefits />
      <Testimonials />
      <FAQ />
      <DownloadCTA />
    </main>
  );
}
