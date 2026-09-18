import React from 'react';
import AppRoutes from './routes/AppRoutes';
import Toast from './components/ui/Toast';
import OfflinePage from './pages/public/OfflinePage';
import useOnlineStatus from './hooks/useOnlineStatus';

export default function App() {
  const isOnline = useOnlineStatus();

  if (!isOnline) {
    return <OfflinePage />;
  }

  return (
    <div className="min-h-screen bg-[#f8faff] text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
      <AppRoutes />
      <Toast />
    </div>
  );
}