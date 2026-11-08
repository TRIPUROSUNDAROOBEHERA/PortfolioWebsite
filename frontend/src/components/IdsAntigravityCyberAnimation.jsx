import React from 'react';

/**
 * IdsAntigravityCyberAnimation
 * 
 * Refined strictly according to user image analysis and instructions:
 * 1. Image 1: Removed the upper light-blue glow/blob over the shield completely ("remove upeer the lightblue").
 * 2. Image 2: Clean, vibrant cyber line with glowing vertex dots and a sleek travelling photon capsule bead.
 * 3. Image 3: ONE AND ONLY ONE continuous line passing across the database floor into the laptop ("no upper folwer, one and onle that line passed").
 *    - No upper branch lines or background clutter.
 *    - Accurate floor path: Node 1 -> Server 1 -> Server 3 -> Server 5 -> Junction -> Laptop Computer -> Lock.
 * 4. Dynamic Color Transition & Holographic Status Text:
 *    - "database that line passed ina hancement last computer set line passed going red or green(content to be textadded)"
 *    - Green Phase (Normal / Secured): Line, laptop, and lock glow emerald green (#10B981) with holographic badge "🛡️ SYSTEM SECURED".
 *    - Red Phase (Threat Alert): Line, laptop, and lock pulse glowing crimson red (#EF4444) with holographic badge "⚠️ INTRUSION DETECTED".
 * 5. Hardware-accelerated CSS stroke-dashoffset + native SVG animateMotion for 100% reliable 60fps movement.
 */
export default function IdsAntigravityCyberAnimation() {
  // Single continuous floor connection line (Length: 1595px)
  const singleLinePath = "M 644,690 L 807,710 L 900,710 L 980,630 L 980,550 L 1100,550 L 1250,550 L 1330,610 L 1415,610 L 1520,610 L 1640,580 L 1720,580 L 1830,550 L 1930,510 L 2028,385";

  return (
    <div 
      className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-20"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 3208 892"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Intense Cyan/Blue Laser Glow */}
          <filter id="idsLaserGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4.0" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Intense Green Secured Glow */}
          <filter id="idsGreenGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5.0" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Intense Red Alert Glow */}
          <filter id="idsRedGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5.0" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* High Energy Packet Glow */}
          <filter id="idsPacketGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7.0" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <style>{`
          /* ─── 1. SINGLE CONTINUOUS LINE — 6.0s DUAL-PHASE TIMELINE ─── */
          
          /* Clean, subtle base circuit line */
          .ids-base-track {
            stroke: rgba(0, 215, 255, 0.45);
            stroke-width: 3.2;
            fill: none;
            stroke-dasharray: 8 8;
          }

          /* Active moving laser stream (Path length: 1595px) */
          .ids-travel-beam-green {
            stroke-width: 5.0;
            fill: none;
            stroke-dasharray: 200 1395;
            stroke-linecap: round;
            filter: url(#idsLaserGlow);
            animation: travelBeamGreen 6.0s linear infinite;
          }

          .ids-travel-beam-red {
            stroke-width: 5.5;
            fill: none;
            stroke-dasharray: 200 1395;
            stroke-linecap: round;
            filter: url(#idsRedGlow);
            animation: travelBeamRed 6.0s linear infinite;
          }

          /* Phase 1: Green/Cyan stream (0% to 50%) */
          @keyframes travelBeamGreen {
            0% {
              stroke: #00F0FF;
              stroke-dashoffset: 0;
              opacity: 1;
            }
            45% {
              stroke: #10B981;
              stroke-dashoffset: -1595;
              opacity: 1;
            }
            49%, 100% {
              opacity: 0;
              stroke-dashoffset: -1595;
            }
          }

          /* Phase 2: Red Threat stream (50% to 100%) */
          @keyframes travelBeamRed {
            0%, 49% {
              opacity: 0;
              stroke-dashoffset: 0;
            }
            50% {
              stroke: #EF4444;
              stroke-dashoffset: 0;
              opacity: 1;
            }
            95% {
              stroke: #DC2626;
              stroke-dashoffset: -1595;
              opacity: 1;
            }
            100% {
              opacity: 0;
              stroke-dashoffset: -1595;
            }
          }

          /* ─── 2. PHOTON BEAD CAPSULE (SVG animateMotion) ─── */
          .ids-capsule-bead {
            animation: beadColorShift 6.0s linear infinite;
          }

          @keyframes beadColorShift {
            0%, 45% {
              fill: #10B981;
              stroke: #FFFFFF;
            }
            50%, 95% {
              fill: #EF4444;
              stroke: #FFFFFF;
            }
            100% {
              fill: #00F0FF;
              stroke: #FFFFFF;
            }
          }

          /* ─── 3. SEQUENTIAL DATABASE ENHANCEMENT PULSES ─── */
          /* Synchronized with moving light along the 1595px path:
             Server 1 (807, 710):  ~10.3% (0.62s) & ~60.3% (3.62s)
             Server 3 (980, 550):  ~28.2% (1.69s) & ~78.2% (4.69s)
             Server 5 (1415, 610): ~56.8% (3.41s) & ~86.8% (5.21s)
             Junction (1720, 580): ~76.1% (4.56s)
          */
          .ids-db-flash-1 { animation: dbFlash1 6.0s ease-out infinite; }
          .ids-db-flash-3 { animation: dbFlash3 6.0s ease-out infinite; }
          .ids-db-flash-5 { animation: dbFlash5 6.0s ease-out infinite; }

          @keyframes dbFlash1 {
            0%, 7% { opacity: 0.25; transform: scale(1); }
            10.3% { opacity: 0.95; transform: scale(1.3); }
            15%, 57% { opacity: 0.25; transform: scale(1); }
            60.3% { opacity: 0.95; transform: scale(1.3); }
            65%, 100% { opacity: 0.25; transform: scale(1); }
          }

          @keyframes dbFlash3 {
            0%, 25% { opacity: 0.25; transform: scale(1); }
            28.2% { opacity: 0.95; transform: scale(1.3); }
            33%, 75% { opacity: 0.25; transform: scale(1); }
            78.2% { opacity: 0.95; transform: scale(1.3); }
            83%, 100% { opacity: 0.25; transform: scale(1); }
          }

          @keyframes dbFlash5 {
            0%, 53% { opacity: 0.25; transform: scale(1); }
            56.8% { opacity: 0.95; transform: scale(1.3); }
            62%, 84% { opacity: 0.25; transform: scale(1); }
            86.8% { opacity: 0.95; transform: scale(1.3); }
            92%, 100% { opacity: 0.25; transform: scale(1); }
          }

          /* ─── 4. LAST COMPUTER SET & LOCK: GREEN OR RED TRANSITION ─── */
          .ids-computer-core-pulse {
            animation: compCoreColor 6.0s ease-in-out infinite;
          }

          @keyframes compCoreColor {
            0%, 46% {
              fill: #10B981; /* Emerald Green */
              opacity: 0.85;
            }
            48%, 96% {
              fill: #EF4444; /* Red Threat Alert */
              opacity: 0.95;
            }
            100% {
              fill: #10B981;
              opacity: 0.85;
            }
          }

          .ids-computer-ring-pulse {
            animation: compRingColor 6.0s ease-in-out infinite;
          }

          @keyframes compRingColor {
            0%, 46% {
              stroke: #10B981;
              opacity: 0.75;
            }
            48%, 96% {
              stroke: #EF4444;
              opacity: 0.9;
            }
            100% {
              stroke: #10B981;
              opacity: 0.75;
            }
          }

          /* ─── 5. HOLOGRAPHIC STATUS CONTENT TEXT (GREEN / RED) ─── */
          /* Dynamic text badge displayed over the computer set */
          .ids-status-badge {
            transform-origin: 2028px 465px;
            animation: statusFloat 4.5s ease-in-out infinite;
          }
          @keyframes statusFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-4px); }
          }

          .ids-badge-pill {
            animation: badgePillColors 6.0s ease-in-out infinite;
          }
          @keyframes badgePillColors {
            0%, 47% {
              fill: rgba(6, 45, 32, 0.92);
              stroke: #10B981;
            }
            50%, 97% {
              fill: rgba(70, 10, 18, 0.95);
              stroke: #EF4444;
            }
            100% {
              fill: rgba(6, 45, 32, 0.92);
              stroke: #10B981;
            }
          }

          .ids-text-green {
            animation: textGreenToggle 6.0s ease-in-out infinite;
          }
          .ids-text-red {
            animation: textRedToggle 6.0s ease-in-out infinite;
          }

          @keyframes textGreenToggle {
            0%, 47% { opacity: 1; display: inline; }
            48%, 98% { opacity: 0; display: none; }
            99%, 100% { opacity: 1; display: inline; }
          }

          @keyframes textRedToggle {
            0%, 47% { opacity: 0; display: none; }
            48%, 97% { opacity: 1; display: inline; }
            98%, 100% { opacity: 0; display: none; }
          }

          /* ─── 6. ROTATING RINGS (CLEAN & SUBTLE, NO UPPER BLOB) ─── */
          .ids-clean-ring-rotate {
            transform-origin: 2024px 305px;
            animation: rotateClockwise 22s linear infinite;
          }
          @keyframes rotateClockwise {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          /* Ambient Rhythmic Vertex Dots Breathing */
          .ids-vertex-dot {
            animation: dotBreathe 3.5s ease-in-out infinite;
          }
          @keyframes dotBreathe {
            0%, 100% { opacity: 0.55; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }

          /* ─── ACCESSIBILITY: REDUCED MOTION ─── */
          @media (prefers-reduced-motion: reduce) {
            .ids-travel-beam-green,
            .ids-travel-beam-red,
            .ids-capsule-bead,
            .ids-db-flash-1,
            .ids-db-flash-3,
            .ids-db-flash-5,
            .ids-computer-core-pulse,
            .ids-computer-ring-pulse,
            .ids-status-badge,
            .ids-badge-pill,
            .ids-text-green,
            .ids-text-red,
            .ids-clean-ring-rotate,
            .ids-vertex-dot {
              animation: none !important;
              transform: none !important;
            }
          }
        `}</style>

        {/* ─── LAYER 1: ONE AND ONLY ONE CONTINUOUS NETWORK LINE (Requirement 3) ─── */}
        {/* Strictly follows the database floor path directly to the laptop without any upper flow */}
        <g>
          {/* Base circuit line */}
          <path
            d={singleLinePath}
            className="ids-base-track"
          />

          {/* Phase 1: Moving Green/Cyan Stream */}
          <path
            d={singleLinePath}
            className="ids-travel-beam-green"
          />

          {/* Phase 2: Moving Red Threat Stream */}
          <path
            d={singleLinePath}
            className="ids-travel-beam-red"
          />
        </g>

        {/* ─── LAYER 2: GLOWING VERTEX CONNECTION DOTS (Image 2 style) ─── */}
        <g>
          {/* Node 1 (644, 690) */}
          <circle cx="644" cy="690" r="8" fill="#00F0FF" className="ids-vertex-dot" filter="url(#idsLaserGlow)" />
          <circle cx="644" cy="690" r="3.5" fill="#FFFFFF" />

          {/* Server 1 Connection Point (807, 710) */}
          <circle cx="807" cy="710" r="8.5" fill="#00F0FF" className="ids-vertex-dot" filter="url(#idsLaserGlow)" />
          <circle cx="807" cy="710" r="4" fill="#FFFFFF" />

          {/* Floor Corner Dot (900, 710) */}
          <circle cx="900" cy="710" r="6.5" fill="#00F0FF" className="ids-vertex-dot" />

          {/* Server 3 Connection Point (980, 550) */}
          <circle cx="980" cy="550" r="9" fill="#00F0FF" className="ids-vertex-dot" filter="url(#idsLaserGlow)" />
          <circle cx="980" cy="550" r="4" fill="#FFFFFF" />

          {/* Floor Tile Node next to blue cube (1250, 550) */}
          <circle cx="1250" cy="550" r="7.5" fill="#00F0FF" className="ids-vertex-dot" filter="url(#idsLaserGlow)" />
          <circle cx="1250" cy="550" r="3" fill="#FFFFFF" />

          {/* Server 5 Connection Point (1415, 610) */}
          <circle cx="1415" cy="610" r="8.5" fill="#00F0FF" className="ids-vertex-dot" filter="url(#idsLaserGlow)" />
          <circle cx="1415" cy="610" r="4" fill="#FFFFFF" />

          {/* Central Junction Dot (1720, 580) */}
          <circle cx="1720" cy="580" r="9.5" fill="#00F0FF" className="ids-vertex-dot" filter="url(#idsLaserGlow)" />
          <circle cx="1720" cy="580" r="4.5" fill="#FFFFFF" />

          {/* Laptop Base Entry Point (1930, 510) */}
          <circle cx="1930" cy="510" r="8.5" fill="#00F0FF" className="ids-vertex-dot" filter="url(#idsLaserGlow)" />
          <circle cx="1930" cy="510" r="4" fill="#FFFFFF" />
        </g>

        {/* ─── LAYER 3: MOVING PHOTON CAPSULE BEAD (Image 2 style) ─── */}
        <g>
          {/* Outer high-energy glow */}
          <circle r="22" className="ids-capsule-bead" opacity="0.6" filter="url(#idsPacketGlow)">
            <animateMotion
              path={singleLinePath}
              dur="6.0s"
              repeatCount="indefinite"
              calcMode="linear"
            />
          </circle>

          {/* Mid intense capsule */}
          <circle r="12" className="ids-capsule-bead" strokeWidth="2.5" filter="url(#idsPacketGlow)">
            <animateMotion
              path={singleLinePath}
              dur="6.0s"
              repeatCount="indefinite"
              calcMode="linear"
            />
          </circle>

          {/* Core bright spark */}
          <circle r="6" fill="#FFFFFF">
            <animateMotion
              path={singleLinePath}
              dur="6.0s"
              repeatCount="indefinite"
              calcMode="linear"
            />
          </circle>
        </g>

        {/* ─── LAYER 4: DATABASE ENHANCEMENT ILLUMINATION ─── */}
        <g>
          {/* Server 1 Enhancement Pulse (807, 710) */}
          <g transform="translate(807, 710)">
            <ellipse cx="0" cy="18" rx="65" ry="24" fill="#00F0FF" className="ids-db-flash-1" filter="url(#idsPacketGlow)" />
            <circle cx="0" cy="0" r="32" fill="none" stroke="#00F0FF" strokeWidth="2.5" className="ids-db-flash-1" />
          </g>

          {/* Server 3 Enhancement Pulse (980, 550) */}
          <g transform="translate(980, 550)">
            <ellipse cx="0" cy="18" rx="65" ry="24" fill="#00F0FF" className="ids-db-flash-3" filter="url(#idsPacketGlow)" />
            <circle cx="0" cy="0" r="32" fill="none" stroke="#00F0FF" strokeWidth="2.5" className="ids-db-flash-3" />
          </g>

          {/* Server 5 Enhancement Pulse (1415, 610) */}
          <g transform="translate(1415, 610)">
            <ellipse cx="0" cy="18" rx="65" ry="24" fill="#00F0FF" className="ids-db-flash-5" filter="url(#idsPacketGlow)" />
            <circle cx="0" cy="0" r="32" fill="none" stroke="#00F0FF" strokeWidth="2.5" className="ids-db-flash-5" />
          </g>
        </g>

        {/* ─── LAYER 5: LAST COMPUTER SET & LOCK (GOING RED OR GREEN) ─── */}
        {/* At the computer laptop base (1930, 510) and Lock (2028, 385) */}
        <g>
          {/* Laptop Base Lighting Plate (dynamically shifts Green <-> Red) */}
          <ellipse
            cx="1930"
            cy="510"
            rx="85"
            ry="28"
            className="ids-computer-core-pulse"
            filter="url(#idsPacketGlow)"
          />

          {/* Padlock Gentle Halo Ring at (2028, 385) */}
          <circle
            cx="2028"
            cy="385"
            r="38"
            fill="none"
            strokeWidth="3.5"
            className="ids-computer-ring-pulse"
            filter="url(#idsLaserGlow)"
          />

          {/* Thin Clean Rotating Arc around Shield (No upper blue blob!) */}
          <circle
            cx="2024"
            cy="305"
            r="165"
            fill="none"
            strokeWidth="2.0"
            strokeDasharray="40 100 20 100"
            className="ids-clean-ring-rotate ids-computer-ring-pulse"
            filter="url(#idsLaserGlow)"
          />
        </g>

        {/* ─── LAYER 6: HOLOGRAPHIC STATUS CONTENT TEXT (Requirement 4) ─── */}
        {/* "last computer set line passed going red or green(content to be textadded)" */}
        <g className="ids-status-badge">
          {/* Sleek Floating Glass Pill over the computer set */}
          <rect
            x="1898"
            y="450"
            width="260"
            height="40"
            rx="20"
            strokeWidth="2.5"
            className="ids-badge-pill"
            filter="url(#idsLaserGlow)"
          />

          {/* GREEN SECURED CONTENT TEXT */}
          <g className="ids-text-green">
            <circle cx="1922" cy="470" r="6" fill="#10B981" filter="url(#idsGreenGlow)" />
            <text
              x="1938"
              y="476"
              fill="#ECFDF5"
              fontSize="14"
              fontWeight="800"
              letterSpacing="0.8"
              fontFamily="system-ui, sans-serif"
            >
              🛡️ SYSTEM SECURED
            </text>
          </g>

          {/* RED INTRUSION DETECTED CONTENT TEXT */}
          <g className="ids-text-red">
            <circle cx="1922" cy="470" r="6" fill="#EF4444" filter="url(#idsRedGlow)" />
            <text
              x="1938"
              y="476"
              fill="#FEF2F2"
              fontSize="14"
              fontWeight="800"
              letterSpacing="0.8"
              fontFamily="system-ui, sans-serif"
            >
              ⚠️ INTRUSION DETECTED
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
