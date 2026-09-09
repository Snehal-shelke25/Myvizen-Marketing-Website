import React, { useEffect, useRef } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Dialog shell used by every admin modal.
 *
 * The modals were plain divs, which meant: Escape did nothing, the page kept
 * scrolling behind the overlay, Tab wandered off into the page underneath, and
 * screen readers were never told a dialog had opened. This fixes all four in
 * one place so no individual modal has to remember.
 */
export default function Modal({ title, onClose, maxWidth = '560px', busy = false, children }) {
  const cardRef = useRef(null);
  const restoreFocusTo = useRef(null);

  useEffect(() => {
    restoreFocusTo.current = document.activeElement;

    // Move focus into the dialog so keyboard users start inside it.
    const first = cardRef.current?.querySelector(FOCUSABLE);
    (first || cardRef.current)?.focus?.();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape' && !busy) {
        onClose?.();
        return;
      }
      if (event.key !== 'Tab') return;

      // Keep Tab inside the dialog.
      const items = Array.from(cardRef.current?.querySelectorAll(FOCUSABLE) || [])
        .filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      // Send focus back where it came from, not to the top of the page.
      if (restoreFocusTo.current?.focus) restoreFocusTo.current.focus();
    };
  }, [onClose, busy]);

  return (
    <div
      className="modal-overlay"
      onClick={busy ? undefined : onClose}
      role="presentation"
    >
      <div
        ref={cardRef}
        className="modal-card"
        style={{ maxWidth }}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : undefined}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        {title && (
          <div className="admin-modal-head">
            <h3>{title}</h3>
            <button
              type="button"
              className="admin-modal-close"
              onClick={onClose}
              disabled={busy}
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
