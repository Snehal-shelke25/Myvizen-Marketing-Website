import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

/**
 * The shell every admin page sits in.
 *
 * It also owns mobile navigation. The sidebar used to simply stack full-width
 * above the content below 992px, so on a tablet or phone you scrolled past ten
 * navigation items before reaching the page. It is now a drawer: off-canvas by
 * default, opened from a button, and closed by the backdrop, the Escape key, or
 * navigating somewhere.
 */
export default function AdminLayout({ title, subtitle, actionLabel, onPrimaryAction, children }) {
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();

  // Close the drawer when the route changes, or it stays open over the new page.
  useEffect(() => { setNavOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (!navOpen) return undefined;
    const onKey = (event) => { if (event.key === 'Escape') setNavOpen(false); };
    document.addEventListener('keydown', onKey);
    // Stop the page scrolling behind the open drawer.
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [navOpen]);

  return (
    <div className={`admin-layout ${navOpen ? 'nav-open' : ''}`}>
      <AdminSidebar onNavigate={() => setNavOpen(false)} />

      {navOpen && (
        <button
          type="button"
          className="admin-nav-backdrop"
          aria-label="Close navigation"
          onClick={() => setNavOpen(false)}
        />
      )}

      <main className="admin-content">
        <AdminHeader
          title={title}
          subtitle={subtitle}
          actionLabel={actionLabel}
          onPrimaryAction={onPrimaryAction}
          onToggleNav={() => setNavOpen((open) => !open)}
          navOpen={navOpen}
        />
        <div className="admin-page-body">{children}</div>
      </main>
    </div>
  );
}
