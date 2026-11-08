import React, { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import Toast from './components/ui/Toast';
import OfflinePage from './pages/OfflinePage';
import useOnlineStatus from './hooks/useOnlineStatus';

export default function App() {
  const isOnline = useOnlineStatus();

  useEffect(() => {
    // 1. Silently Disable Mouse Right-Click (Context Menu)
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // 2. Silently Disable Inspect Element & DevTools Keyboard Shortcuts
    const handleKeyDown = (e) => {
      // F12 key
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+Shift+C (Inspect Element)
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key)
      ) {
        e.preventDefault();
        return false;
      }

      // Ctrl+U / Cmd+U (View Page Source)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!isOnline) {
    return <OfflinePage />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
      <AppRoutes />
      <Toast />
    </div>
  );
}