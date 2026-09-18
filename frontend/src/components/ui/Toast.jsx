import React, { useState, useEffect } from 'react';
import notificationService from '../../services/notificationService';

export default function Toast({ message, type = 'success', onClose }) {
  const [serviceToasts, setServiceToasts] = useState([]);

  useEffect(() => {
    // Only subscribe to notificationService if no direct prop message is passed
    if (!message) {
      const unsubscribe = notificationService.subscribe((item) => {
        if (item.dismiss) {
          setServiceToasts((prev) => prev.filter((t) => t.id !== item.id));
        } else {
          setServiceToasts((prev) => [...prev, item]);
        }
      });

      return () => unsubscribe();
    }
  }, [message]);

  const typeConfig = {
    success: {
      icon: 'fa-solid fa-circle-check',
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200 shadow-emerald-500/10',
      iconColor: 'text-emerald-600',
    },
    error: {
      icon: 'fa-solid fa-triangle-exclamation',
      bg: 'bg-rose-50 text-rose-800 border-rose-200 shadow-rose-500/10',
      iconColor: 'text-rose-600',
    },
    warning: {
      icon: 'fa-solid fa-triangle-exclamation',
      bg: 'bg-amber-50 text-amber-800 border-amber-200 shadow-amber-500/10',
      iconColor: 'text-amber-600',
    },
    info: {
      icon: 'fa-solid fa-circle-info',
      bg: 'bg-blue-50 text-blue-800 border-blue-200 shadow-blue-500/10',
      iconColor: 'text-blue-600',
    },
  };

  // Case 1: Used as a Standalone Prop-Driven Component (<Toast message="..." />)
  if (message) {
    const conf = typeConfig[type] || typeConfig.success;

    return (
      <div className="fixed bottom-5 right-5 z-[9999] font-['Plus_Jakarta_Sans',sans-serif] pointer-events-none">
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-xl text-xs font-bold pointer-events-auto backdrop-blur-md transition-all ${conf.bg}`}
        >
          <i className={`${conf.icon} text-sm ${conf.iconColor}`}></i>
          <span>{message}</span>
          {onClose && (
            <button
              onClick={onClose}
              className="ml-2 hover:opacity-70 transition-opacity cursor-pointer text-slate-500 hover:text-slate-900"
              aria-label="Close notification"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>
      </div>
    );
  }

  // Case 2: Global Service Listener (<Toast /> placed in App.jsx or Root)
  if (serviceToasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none max-w-sm w-full font-['Plus_Jakarta_Sans',sans-serif]">
      {serviceToasts.map((item) => {
        const conf = typeConfig[item.type] || typeConfig.info;

        return (
          <div
            key={item.id}
            className={`flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border shadow-xl text-xs font-bold pointer-events-auto backdrop-blur-md transition-all ${conf.bg}`}
          >
            <div className="flex items-center gap-2.5">
              <i className={`${conf.icon} text-sm ${conf.iconColor}`}></i>
              <span>{item.message}</span>
            </div>
            <button
              onClick={() => notificationService.dismiss(item.id)}
              className="hover:opacity-70 transition-opacity cursor-pointer text-slate-500 hover:text-slate-900 ml-2"
              aria-label="Dismiss notification"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        );
      })}
    </div>
  );
}