import React from 'react';

export default function ProfileImage({ profile }) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Glowing Aura Ring */}
      <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-full bg-gradient-to-tr from-[#1E6BFF]/30 via-purple-400/20 to-[#9333EA]/30 p-2 shadow-2xl shadow-purple-500/10 animate-pulse">
        <div className="w-full h-full rounded-full border-2 border-white/80 overflow-hidden shadow-inner bg-slate-100">
          <img
            src={profile?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80'}
            alt={profile?.full_name || 'Profile'}
            className="w-full h-full object-cover rounded-full transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
}