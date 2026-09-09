import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);

    // Errors stay until dismissed. A failure that disappears after 3.5 seconds
    // is a failure the operator never read — and in this panel those messages
    // explain why a payment or a suspension did not go through.
    if (type === 'error') return;

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration || 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast: addToast, toasts, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
