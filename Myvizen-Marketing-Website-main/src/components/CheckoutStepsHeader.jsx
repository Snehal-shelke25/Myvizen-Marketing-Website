import React from 'react';

export default function CheckoutStepsHeader({ currentStep = 1 }) {
  const steps = [
    { num: 1, label: 'Account' },
    { num: 2, label: 'Verify' },
    { num: 3, label: 'Review' },
    { num: 4, label: 'Pay' },
    { num: 5, label: 'Proof' },
  ];

  return (
    <div style={{
      maxWidth: '680px',
      margin: '0 auto 36px auto',
      padding: '0 16px',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
      }}>

        {/* Progress Line */}
        <div style={{
          position: 'absolute',
          top: '18px',
          left: '30px',
          right: '30px',
          height: '3px',
          background: '#e2e8f0',
          zIndex: 1,
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, #22c55e, #16a34a)',
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            transition: 'width 0.4s ease',
          }} />
        </div>

        {/* Step Circles */}
        {steps.map((step) => {
          const isDone = step.num < currentStep;
          const isCurrent = step.num === currentStep;

          return (
            <div
              key={step.num}
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: isDone
                  ? '#22c55e'
                  : isCurrent
                  ? '#09381e'
                  : '#ffffff',
                color: isDone || isCurrent ? '#ffffff' : '#64748b',
                border: isDone || isCurrent ? 'none' : '2px solid #cbd5e1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                fontWeight: '800',
                boxShadow: isCurrent ? '0 0 0 4px rgba(34,197,94,0.25)' : 'none',
                transition: 'all 0.3s ease',
              }}>
                {isDone ? '✓' : step.num}
              </div>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: isCurrent ? '800' : '600',
                color: isCurrent ? '#09381e' : isDone ? '#165830' : '#94a3b8',
              }}>
                {step.label}
              </span>
            </div>
          );
        })}

      </div>
    </div>
  );
}
