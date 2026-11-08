import React, { useState } from 'react';
import barcodeImg from '../assets/english_master_barcode.png';

export default function EnglishMasterFooter({ selectedProject }) {
  const [copiedField, setCopiedField] = useState('');

  const handleCopy = (text, field) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2000);
  };

  return (
    <footer
      className="w-full mt-2 sm:mt-4 border-t border-slate-200/80 relative overflow-hidden text-slate-800 transition-colors"
      style={{
        backgroundColor: '#FFF5F6',
        backgroundImage: `
          /* 5. Blush Pink (#FFE5E8): Lower-left glow accent illuminating the bottom-left corner */
          radial-gradient(circle at 10% 85%, #FFE5E8 0%, rgba(255, 229, 232, 0.95) 38%, transparent 68%),
          
          /* 1. Soft Peach (#FFD5C1): Soft pink/peach ambient glow diffused through the lower-center */
          radial-gradient(circle at 45% 75%, #FFD5C1 0%, rgba(255, 213, 193, 0.9) 36%, transparent 68%),
          
          /* 4. Pastel Pink (#F9DDF3): Upper-center glow centered across the top */
          radial-gradient(circle at 50% 8%, #F9DDF3 0%, rgba(249, 221, 243, 0.95) 36%, transparent 70%),
          
          /* 3. Soft Lavender (#E9E4FF): Center-right background illumination softly highlighting behind the APK card */
          radial-gradient(circle at 78% 45%, #E9E4FF 0%, rgba(233, 228, 255, 0.95) 44%, transparent 75%),
          
          /* 2. Sky Blue (#BFE0FF): Right-side glow and bottom waves flowing across the lower-right edge */
          radial-gradient(circle at 94% 82%, #BFE0FF 0%, rgba(191, 224, 255, 0.95) 45%, transparent 75%),
          radial-gradient(circle at 98% 30%, #BFE0FF 0%, rgba(191, 224, 255, 0.8) 35%, transparent 65%),
          
          /* Seamless 5-color pastel base flow */
          linear-gradient(135deg, #FFE5E8 0%, #FFF2F5 25%, #F9DDF3 50%, #E9E4FF 75%, #BFE0FF 100%)
        `,
      }}
    >
      {/* 5. Blush Pink (#FFE5E8) — Lower-left glow accent illuminating the bottom-left corner */}
      <div
        className="absolute bottom-0 left-0 w-80 h-72 rounded-full pointer-events-none blur-3xl opacity-85"
        style={{ backgroundColor: '#FFE5E8' }}
      ></div>

      {/* 1. Soft Peach (#FFD5C1) — Soft pink/peach ambient glow diffused through the lower-center */}
      <div
        className="absolute -bottom-8 left-1/3 w-96 h-64 rounded-full pointer-events-none blur-3xl opacity-85"
        style={{ backgroundColor: '#FFD5C1' }}
      ></div>

      {/* 4. Pastel Pink (#F9DDF3) — Upper-center glow centered across the top */}
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-[34rem] h-64 rounded-full pointer-events-none blur-3xl opacity-85"
        style={{ backgroundColor: '#F9DDF3' }}
      ></div>

      {/* 3. Soft Lavender (#E9E4FF) — Center-right background illumination softly highlighting behind the APK card */}
      <div
        className="absolute top-1/4 right-20 w-[28rem] h-72 rounded-full pointer-events-none blur-3xl opacity-85"
        style={{ backgroundColor: '#E9E4FF' }}
      ></div>

      {/* 2. Sky Blue (#BFE0FF) — Right-side glow and bottom waves flowing across the lower-right edge */}
      <div
        className="absolute bottom-0 right-0 w-[30rem] h-80 rounded-full pointer-events-none blur-3xl opacity-90"
        style={{ backgroundColor: '#BFE0FF' }}
      ></div>

      <div className="max-w-7xl mx-auto px-2.5 xs:px-3.5 sm:px-8 lg:px-10 py-3.5 sm:py-8 lg:py-10 relative z-10">
        
        {/* ─── MOBILE VIEW (< sm): 2-TIER STACKED LAYOUT MATCHING IMAGE 2 REFERENCE ─── */}
        <div className="block sm:hidden space-y-2.5">
          {/* 1. Header (Centered Title, Description & Feature Badges) */}
          <div className="text-center space-y-1">
            <h3 className="text-base xs:text-lg font-black tracking-tight text-slate-900 leading-tight">
              English Master Pro
            </h3>
            <p className="text-[8.5px] xs:text-[9.5px] text-slate-700 leading-relaxed font-medium max-w-sm mx-auto px-1">
              A Complete English learning platform to Improve Grammar, Vocabulary, Speaking and more — with practices, Progress tracking and Certificates.
            </p>
            {/* Feature Badges Centered */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
              <span className="px-2 py-0.5 rounded-full text-[7.5px] xs:text-[8px] font-semibold bg-white/85 backdrop-blur-md border border-slate-200/90 text-slate-700 shadow-2xs flex items-center gap-1">
                <i className="fa-solid fa-book-open text-blue-600 text-[8px]"></i>
                Grammar Academy
              </span>
              <span className="px-2 py-0.5 rounded-full text-[7.5px] xs:text-[8px] font-semibold bg-white/85 backdrop-blur-md border border-slate-200/90 text-slate-700 shadow-2xs flex items-center gap-1">
                <i className="fa-solid fa-microphone-lines text-purple-600 text-[8px]"></i>
                Speech & Audio Lab
              </span>
              <span className="px-2 py-0.5 rounded-full text-[7.5px] xs:text-[8px] font-semibold bg-white/85 backdrop-blur-md border border-slate-200/90 text-slate-700 shadow-2xs flex items-center gap-1">
                <i className="fa-solid fa-certificate text-amber-600 text-[8px]"></i>
                Verified Certificates
              </span>
            </div>
          </div>

          {/* 2. Bottom Row: Side-by-Side White Cards (QR Code + Student Access Card) */}
          <div className="flex items-stretch justify-center gap-2 xs:gap-2.5 pt-1">
            {/* QR Code Card */}
            <div className="bg-white rounded-2xl p-1.5 xs:p-2 shadow-sm border border-slate-200/90 flex flex-col items-center justify-center shrink-0 w-[110px] xs:w-[120px] text-center select-none">
              <img
                src={barcodeImg}
                alt="English Master Pro Barcode"
                className="w-[88px] h-[88px] xs:w-[96px] xs:h-[96px] object-contain block"
              />
            </div>

            {/* Student Credential Card */}
            <div className="bg-white rounded-2xl p-2.5 xs:p-3 shadow-sm border border-slate-200/90 flex-1 flex flex-col justify-between min-w-0">
              {/* Badge at top */}
              <div className="flex items-center mb-1.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] xs:text-[9px] font-bold bg-blue-100 text-blue-800 border border-blue-200 shadow-2xs">
                  <i className="fa-solid fa-user-graduate text-blue-600 text-[8px]"></i>
                  Student
                </span>
              </div>

              {/* ID and Password List */}
              <div className="space-y-1.5">
                {/* Line 1: ID */}
                <div
                  onClick={() => handleCopy('STD177650', 'id')}
                  title="Click to copy USER ID"
                  className="flex items-center px-2 py-1.5 rounded-lg bg-slate-50/90 hover:bg-blue-50/70 border border-slate-200/70 active:scale-98 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <img
                      src="/student-avatar-man.png"
                      alt="Student"
                      className="w-4 h-4 rounded-full object-cover border border-blue-200 shadow-2xs shrink-0"
                    />
                    <span className="text-[7.5px] xs:text-[8px] font-bold text-slate-500 uppercase tracking-wider shrink-0">
                      ID :
                    </span>
                    <span className="font-mono font-bold text-slate-900 tracking-wider text-[8.5px] xs:text-[9.5px] select-all truncate">
                      STD177650
                    </span>
                  </div>
                </div>

                {/* Line 2: Password */}
                <div
                  onClick={() => handleCopy('Bram@123', 'pwd')}
                  title="Click to copy Password"
                  className="flex items-center px-2 py-1.5 rounded-lg bg-slate-50/90 hover:bg-amber-50/70 border border-slate-200/70 active:scale-98 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="w-4 flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-key text-amber-500 text-[8.5px]"></i>
                    </div>
                    <span className="text-[7.5px] xs:text-[8px] font-bold text-slate-500 uppercase tracking-wider shrink-0">
                      PWD :
                    </span>
                    <span className="font-mono font-bold text-slate-900 tracking-wider text-[8.5px] xs:text-[9.5px] select-all truncate">
                      Bram@123
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── DESKTOP VIEW (sm and above): 100% UNCHANGED ─── */}
        <div className="hidden sm:grid grid-cols-12 gap-8 lg:gap-10 items-center justify-between">
          
          {/* ─── LEFT SIDE: BRANDING, DESCRIPTION, BADGES & DIRECT APK DOWNLOAD ─── */}
          <div className="sm:col-span-6 lg:col-span-7 space-y-4">
            
            {/* Header: Title */}
            <div>
              <h3 className="sm:text-2xl lg:text-3xl font-black tracking-tight text-slate-900 leading-tight">
                English Master Pro
              </h3>
            </div>

            {/* Complete Platform Description as Requested */}
            <p className="sm:text-sm lg:text-[15px] text-slate-700 leading-relaxed font-medium max-w-2xl">
              A Complete English learning platform to Improve Grammar, Vocabulary, Speaking and more — with practices, Progress tracking and Certificates.
            </p>

            {/* Quick Feature Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-white/80 backdrop-blur-md border border-slate-200/90 text-slate-700 shadow-2xs flex items-center gap-1.5 whitespace-nowrap">
                <i className="fa-solid fa-book-open text-blue-600 text-[11px]"></i>
                Grammar Academy
              </span>
              <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-white/80 backdrop-blur-md border border-slate-200/90 text-slate-700 shadow-2xs flex items-center gap-1.5 whitespace-nowrap">
                <i className="fa-solid fa-microphone-lines text-purple-600 text-[11px]"></i>
                Speech & Audio Lab
              </span>
              <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-white/80 backdrop-blur-md border border-slate-200/90 text-slate-700 shadow-2xs flex items-center gap-1.5 whitespace-nowrap">
                <i className="fa-solid fa-certificate text-amber-600 text-[11px]"></i>
                Verified Certificates
              </span>
            </div>
          </div>

          {/* ─── RIGHT SIDE: BARCODE (LEFT) AND USER PORTAL CREDENTIALS (RIGHT) ─── */}
          <div className="sm:col-span-6 lg:col-span-5 flex justify-end">
            <div className="flex flex-row items-center gap-3">
              
              {/* Left Side: QR Code */}
              <div
                className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200/90 flex flex-col items-center justify-center shrink-0 select-none text-center"
              >
                <img
                  src={barcodeImg}
                  alt="English Master Pro Barcode"
                  className="sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain block"
                />
              </div>

              {/* Right Side: User Portal Access Details with rounded-2xl Corners */}
              <div className="space-y-2 text-left min-w-0">
                {/* Line 1: USER iD : STD177650 */}
                <div
                  onClick={() => handleCopy('STD177650', 'id')}
                  title="Click to copy USER ID"
                  className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl px-4 py-2.5 shadow-2xs hover:shadow-xs hover:border-blue-300 transition-all flex items-center gap-2 min-w-[225px] cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src="/student-avatar-man.png"
                      alt="User Portal Man Avatar"
                      className="w-6 h-6 rounded-full object-cover border border-blue-200 shadow-2xs shrink-0"
                    />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 shrink-0">
                      USER iD
                    </span>
                    <span className="font-bold text-slate-400 text-xs">:</span>
                    <span className="font-mono font-bold text-slate-900 tracking-wider text-sm select-all ml-1">
                      STD177650
                    </span>
                  </div>
                </div>

                {/* Line 2: PWD : Bram@123 */}
                <div
                  onClick={() => handleCopy('Bram@123', 'pwd')}
                  title="Click to copy Password"
                  className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl px-4 py-2.5 shadow-2xs hover:shadow-xs hover:border-amber-300 transition-all flex items-center gap-2 min-w-[225px] cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-key text-amber-500 text-xs"></i>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 shrink-0">
                      PWD
                    </span>
                    <span className="font-bold text-slate-400 text-xs">:</span>
                    <span className="font-mono font-bold text-slate-900 tracking-wider text-sm select-all ml-1">
                      Bram@123
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

