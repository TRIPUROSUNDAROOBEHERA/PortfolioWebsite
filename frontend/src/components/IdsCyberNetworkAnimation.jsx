import React from 'react';

/**
 * IdsCyberNetworkAnimation
 * 
 * Cinematic high-clarity serial cyber security transition animation:
 * 1. Full-Screen edge-to-edge high-clarity circuit grid overlay.
 * 2. Sequential luminous data pulses connecting all 6 database storage servers one by one
 *    along the exact floor circuit traces (starting from far-left nodes through servers 1-6).
 * 3. High-definition radiant optic photon packets streaming along circuit tracks into the laptop.
 * 4. 3-Phase Serial Security Transition:
 *    - Phase 1 (0s - 3.5s): ACTIVE SCAN (Cyan/Blue data packets streaming server-to-server)
 *    - Phase 2 (3.6s - 5.5s): INTRUSION DETECTED (Red warning packets, hazard indicators,
 *      red alert lock, expanding red shockwaves, and "⚠️ INTRUSION DETECTED" HUD)
 *    - Phase 3 (5.6s - 8.0s): THREAT NEUTRALIZED (Emerald Green lock surge, concentric
 *      green shockwave pulses, and "🛡️ SYSTEM SECURED" HUD)
 * 5. Infinite, continuous, hardware-accelerated 8-second synchronized loop with 100% vector clarity.
 */
export default function IdsCyberNetworkAnimation() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-20">
      <svg
        viewBox="0 0 1024 446"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Intense Neon Laser Glow Filter */}
          <filter id="idsLaserGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Core High-Definition Packet Glow Filter */}
          <filter id="idsPacketGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="5.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* High Energy Shield Shockwave Burst Filter */}
          <filter id="idsShieldBurst" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Red Alert Threat Glow Filter */}
          <filter id="idsRedThreatGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="redBlur" />
            <feMerge>
              <feMergeNode in="redBlur" />
              <feMergeNode in="redBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Path Definitions for Animated Packet Motion */}
          <path id="path_0_1" d="M 32 345 L 75 345 L 117 395" />
          <path id="path_0_2" d="M 32 345 L 65 310 L 98 250" />
          <path id="path_1_3" d="M 117 395 L 175 395 L 208 360 L 208 320" />
          <path id="path_2_3" d="M 98 250 L 145 250 L 175 260 L 208 260" />
          <path id="path_3_4" d="M 208 270 L 255 240 L 285 240 L 312 220" />
          <path id="path_3_5" d="M 208 320 L 260 320 L 310 310 L 370 310 L 417 325" />
          <path id="path_4_6" d="M 312 220 L 360 210 L 420 210 L 450 225 L 488 225" />
          <path id="path_5_junc" d="M 417 325 L 460 325 L 510 325 L 540 310 L 570 305" />
          <path id="path_6_junc" d="M 488 255 L 530 285 L 570 305" />
          <path id="path_junc_laptop" d="M 570 305 L 615 290 L 645 275 L 675 260 L 705 245" />
          <path id="path_threat_full" d="M 117 395 L 175 395 L 208 360 L 260 320 L 370 310 L 417 325 L 510 325 L 570 305 L 645 275 L 705 245" />
        </defs>

        <style>{`
          /* ─── 8-SECOND CONTINUOUS MASTER SEQUENCE ─── */

          /* Base Inactive Circuit Traces (Vivid & Clear) */
          .ids-trace-idle {
            stroke: rgba(0, 215, 255, 0.42);
            stroke-width: 2.2;
            fill: none;
          }

          /* Active Laser Paths (High-Definition Glowing Flow) */
          .ids-laser-0-1 {
            stroke: #00F0FF;
            stroke-width: 3.5;
            fill: none;
            stroke-dasharray: 120;
            stroke-dashoffset: 120;
            filter: url(#idsLaserGlow);
            animation: flow0_1 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }

          .ids-laser-1-3 {
            stroke: #00F0FF;
            stroke-width: 3.5;
            fill: none;
            stroke-dasharray: 200;
            stroke-dashoffset: 200;
            filter: url(#idsLaserGlow);
            animation: flow1_3 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }

          .ids-laser-2-3 {
            stroke: #00F0FF;
            stroke-width: 3.5;
            fill: none;
            stroke-dasharray: 180;
            stroke-dashoffset: 180;
            filter: url(#idsLaserGlow);
            animation: flow2_3 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }

          .ids-laser-3-4 {
            stroke: #38BDF8;
            stroke-width: 3.5;
            fill: none;
            stroke-dasharray: 180;
            stroke-dashoffset: 180;
            filter: url(#idsLaserGlow);
            animation: flow3_4 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }

          .ids-laser-3-5 {
            stroke: #38BDF8;
            stroke-width: 3.5;
            fill: none;
            stroke-dasharray: 240;
            stroke-dashoffset: 240;
            filter: url(#idsLaserGlow);
            animation: flow3_5 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }

          .ids-laser-4-6 {
            stroke: #38BDF8;
            stroke-width: 3.5;
            fill: none;
            stroke-dasharray: 200;
            stroke-dashoffset: 200;
            filter: url(#idsLaserGlow);
            animation: flow4_6 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }

          .ids-laser-5-junc {
            stroke: #38BDF8;
            stroke-width: 3.5;
            fill: none;
            stroke-dasharray: 220;
            stroke-dashoffset: 220;
            filter: url(#idsLaserGlow);
            animation: flow5_junc 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }

          .ids-laser-6-junc {
            stroke: #38BDF8;
            stroke-width: 3.5;
            fill: none;
            stroke-dasharray: 180;
            stroke-dashoffset: 180;
            filter: url(#idsLaserGlow);
            animation: flow6_junc 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }

          .ids-laser-laptop {
            stroke: #00F0FF;
            stroke-width: 4.5;
            fill: none;
            stroke-dasharray: 220;
            stroke-dashoffset: 220;
            filter: url(#idsLaserGlow);
            animation: flowLaptop 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }

          /* Threat Laser Beam (Crimson Red Alert Flow) */
          .ids-laser-threat {
            stroke: #EF4444;
            stroke-width: 4.5;
            fill: none;
            stroke-dasharray: 600;
            stroke-dashoffset: 600;
            filter: url(#idsRedThreatGlow);
            animation: flowThreat 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }

          /* Keyframes for Sequential Laser Beams */
          @keyframes flow0_1 {
            0% { stroke-dashoffset: 120; opacity: 0; }
            2% { opacity: 1; }
            10% { stroke-dashoffset: 0; opacity: 1; }
            18% { opacity: 0.45; stroke-dashoffset: 0; }
            85% { opacity: 0.45; stroke-dashoffset: 0; }
            100% { stroke-dashoffset: 120; opacity: 0; }
          }

          @keyframes flow1_3 {
            0%, 6% { stroke-dashoffset: 200; opacity: 0; }
            8% { opacity: 1; }
            16% { stroke-dashoffset: 0; opacity: 1; }
            24% { opacity: 0.45; stroke-dashoffset: 0; }
            85% { opacity: 0.45; stroke-dashoffset: 0; }
            100% { stroke-dashoffset: 200; opacity: 0; }
          }

          @keyframes flow2_3 {
            0%, 8% { stroke-dashoffset: 180; opacity: 0; }
            10% { opacity: 1; }
            18% { stroke-dashoffset: 0; opacity: 1; }
            26% { opacity: 0.45; stroke-dashoffset: 0; }
            85% { opacity: 0.45; stroke-dashoffset: 0; }
            100% { stroke-dashoffset: 180; opacity: 0; }
          }

          @keyframes flow3_4 {
            0%, 15% { stroke-dashoffset: 180; opacity: 0; }
            17% { opacity: 1; }
            26% { stroke-dashoffset: 0; opacity: 1; }
            34% { opacity: 0.45; stroke-dashoffset: 0; }
            85% { opacity: 0.45; stroke-dashoffset: 0; }
            100% { stroke-dashoffset: 180; opacity: 0; }
          }

          @keyframes flow3_5 {
            0%, 15% { stroke-dashoffset: 240; opacity: 0; }
            17% { opacity: 1; }
            27% { stroke-dashoffset: 0; opacity: 1; }
            35% { opacity: 0.45; stroke-dashoffset: 0; }
            85% { opacity: 0.45; stroke-dashoffset: 0; }
            100% { stroke-dashoffset: 240; opacity: 0; }
          }

          @keyframes flow4_6 {
            0%, 24% { stroke-dashoffset: 200; opacity: 0; }
            26% { opacity: 1; }
            35% { stroke-dashoffset: 0; opacity: 1; }
            42% { opacity: 0.45; stroke-dashoffset: 0; }
            85% { opacity: 0.45; stroke-dashoffset: 0; }
            100% { stroke-dashoffset: 200; opacity: 0; }
          }

          @keyframes flow5_junc {
            0%, 28% { stroke-dashoffset: 220; opacity: 0; }
            30% { opacity: 1; }
            39% { stroke-dashoffset: 0; opacity: 1; }
            46% { opacity: 0.45; stroke-dashoffset: 0; }
            85% { opacity: 0.45; stroke-dashoffset: 0; }
            100% { stroke-dashoffset: 220; opacity: 0; }
          }

          @keyframes flow6_junc {
            0%, 31% { stroke-dashoffset: 180; opacity: 0; }
            33% { opacity: 1; }
            41% { stroke-dashoffset: 0; opacity: 1; }
            48% { opacity: 0.45; stroke-dashoffset: 0; }
            85% { opacity: 0.45; stroke-dashoffset: 0; }
            100% { stroke-dashoffset: 180; opacity: 0; }
          }

          @keyframes flowLaptop {
            0%, 36% { stroke-dashoffset: 220; opacity: 0; }
            38% { opacity: 1; }
            48% { stroke-dashoffset: 0; opacity: 1; }
            58% { stroke-dashoffset: 0; opacity: 1; }
            85% { stroke-dashoffset: 0; opacity: 0.45; }
            100% { stroke-dashoffset: 220; opacity: 0; }
          }

          @keyframes flowThreat {
            0%, 46% { stroke-dashoffset: 600; opacity: 0; }
            48% { opacity: 1; }
            62% { stroke-dashoffset: 0; opacity: 1; }
            68% { opacity: 0.9; stroke-dashoffset: 0; }
            74% { opacity: 0; stroke-dashoffset: 0; }
            100% { opacity: 0; }
          }

          /* Server Pulsing Auras */
          .ids-server-glow {
            filter: url(#idsPacketGlow);
            opacity: 0.3;
          }

          .ids-server-1 { animation: sPulse1 8s ease-in-out infinite; }
          .ids-server-2 { animation: sPulse2 8s ease-in-out infinite; }
          .ids-server-3 { animation: sPulse3 8s ease-in-out infinite; }
          .ids-server-4 { animation: sPulse4 8s ease-in-out infinite; }
          .ids-server-5 { animation: sPulse5 8s ease-in-out infinite; }
          .ids-server-6 { animation: sPulse6 8s ease-in-out infinite; }

          @keyframes sPulse1 {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            4% { opacity: 1; transform: scale(1.2); }
            14% { opacity: 0.4; transform: scale(1); }
            48% { opacity: 1; fill: #EF4444; }
            60% { opacity: 0.4; fill: #00F0FF; }
          }

          @keyframes sPulse2 {
            0%, 100% { opacity: 0.3; }
            8% { opacity: 1; transform: scale(1.2); }
            18% { opacity: 0.4; }
          }

          @keyframes sPulse3 {
            0%, 100% { opacity: 0.3; }
            15% { opacity: 1; transform: scale(1.25); }
            26% { opacity: 0.4; }
            50% { opacity: 1; fill: #EF4444; }
            62% { opacity: 0.4; fill: #38BDF8; }
          }

          @keyframes sPulse4 {
            0%, 100% { opacity: 0.3; }
            22% { opacity: 1; transform: scale(1.2); }
            32% { opacity: 0.4; }
          }

          @keyframes sPulse5 {
            0%, 100% { opacity: 0.3; }
            26% { opacity: 1; transform: scale(1.2); }
            36% { opacity: 0.4; }
            54% { opacity: 1; fill: #EF4444; }
            64% { opacity: 0.4; fill: #00F0FF; }
          }

          @keyframes sPulse6 {
            0%, 100% { opacity: 0.3; }
            30% { opacity: 1; transform: scale(1.2); }
            40% { opacity: 0.4; }
          }

          /* Server Warning Threat Badges (Hazard Triangles) */
          .ids-hazard-badge {
            animation: hazardAlert 8s ease-in-out infinite;
          }

          @keyframes hazardAlert {
            0%, 46% { opacity: 0; transform: translateY(4px) scale(0.7); }
            48% { opacity: 1; transform: translateY(-3px) scale(1.15); }
            52% { opacity: 0.9; transform: translateY(0px) scale(1); }
            56% { opacity: 1; transform: translateY(-2px) scale(1.1); }
            64% { opacity: 0.9; }
            68% { opacity: 0; transform: translateY(-6px) scale(0.6); }
            100% { opacity: 0; }
          }

          /* ─── ROTATING HOLOGRAPHIC CYBER RADAR RINGS AROUND LOCK ─── */
          .ids-radar-ring-1 {
            transform-origin: 705px 245px;
            animation: rotateRadar1 12s linear infinite;
          }

          .ids-radar-ring-2 {
            transform-origin: 705px 245px;
            animation: rotateRadar2 8s linear infinite;
          }

          @keyframes rotateRadar1 {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes rotateRadar2 {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }

          /* ─── SHIELD LOCK 3-PHASE TRANSITION (CYAN -> RED ALERT -> EMERALD SECURED) ─── */
          .ids-lock-aura {
            filter: url(#idsShieldBurst);
            transform-origin: 705px 245px;
            animation: lockTransition 8s ease-in-out infinite;
          }

          .ids-lock-ring-red {
            transform-origin: 705px 245px;
            animation: lockShockwaveRed 8s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
          }

          .ids-lock-ring-green {
            transform-origin: 705px 245px;
            animation: lockShockwaveGreen 8s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
          }

          .ids-status-badge {
            transform-origin: 705px 158px;
            animation: hudBadgeTransition 8s ease-in-out infinite;
          }

          /* Dynamic Lock Color Shift */
          @keyframes lockTransition {
            0%, 45% {
              opacity: 0.45;
              fill: #00F0FF; /* Phase 1: Electric Cyan */
            }
            48% {
              opacity: 1;
              fill: #EF4444; /* Phase 2: Crimson Alert */
            }
            54% {
              opacity: 0.85;
              fill: #DC2626;
            }
            60% {
              opacity: 1;
              fill: #EF4444;
            }
            68% {
              opacity: 1;
              fill: #10B981; /* Phase 3: Emerald Defense */
            }
            76% {
              opacity: 0.9;
              fill: #10B981;
            }
            86% {
              opacity: 0.7;
              fill: #00F0FF; /* Smooth reset to Cyan */
            }
            100% {
              opacity: 0.45;
              fill: #00F0FF;
            }
          }

          /* Red Warning Shockwave */
          @keyframes lockShockwaveRed {
            0%, 48% {
              opacity: 0;
              transform: scale(0.3);
              stroke: #EF4444;
            }
            50% {
              opacity: 1;
              stroke: #EF4444;
            }
            62% {
              opacity: 0;
              transform: scale(2.6);
              stroke: #EF4444;
            }
            100% {
              opacity: 0;
              transform: scale(2.6);
            }
          }

          /* Emerald Defense Shockwave */
          @keyframes lockShockwaveGreen {
            0%, 67% {
              opacity: 0;
              transform: scale(0.3);
              stroke: #10B981;
            }
            70% {
              opacity: 1;
              stroke: #10B981;
            }
            82% {
              opacity: 0;
              transform: scale(3.0);
              stroke: #00F0FF;
            }
            100% {
              opacity: 0;
              transform: scale(3.0);
            }
          }

          /* HUD Badge State Transition */
          @keyframes hudBadgeTransition {
            0%, 45% {
              opacity: 0;
              transform: translateY(6px) scale(0.9);
            }
            48% {
              opacity: 1;
              transform: translateY(0px) scale(1.06);
            }
            64% {
              opacity: 1;
              transform: translateY(0px) scale(1);
            }
            68% {
              opacity: 1;
              transform: translateY(-2px) scale(1.08);
            }
            85% {
              opacity: 0.95;
              transform: translateY(-2px) scale(1);
            }
            92% {
              opacity: 0;
              transform: translateY(-5px) scale(0.9);
            }
            100% {
              opacity: 0;
            }
          }

          /* HUD Background Pill Color Shift */
          .ids-hud-pill {
            animation: hudPillColor 8s ease-in-out infinite;
          }

          @keyframes hudPillColor {
            0%, 45% {
              stroke: #00F0FF;
              fill: rgba(7, 24, 60, 0.92);
            }
            48%, 65% {
              stroke: #EF4444;
              fill: rgba(80, 10, 18, 0.95);
            }
            68%, 88% {
              stroke: #10B981;
              fill: rgba(6, 45, 32, 0.95);
            }
            92%, 100% {
              stroke: #00F0FF;
              fill: rgba(7, 24, 60, 0.92);
            }
          }

          /* HUD Status Text Switching */
          .ids-hud-alert-text {
            animation: alertTextVis 8s ease-in-out infinite;
          }

          .ids-hud-secure-text {
            animation: secureTextVis 8s ease-in-out infinite;
          }

          @keyframes alertTextVis {
            0%, 47% { opacity: 0; display: none; }
            48%, 65% { opacity: 1; display: inline; }
            66%, 100% { opacity: 0; display: none; }
          }

          @keyframes secureTextVis {
            0%, 67% { opacity: 0; display: none; }
            68%, 88% { opacity: 1; display: inline; }
            89%, 100% { opacity: 0; display: none; }
          }
        `}</style>

        {/* ─── 1. BASE IDLE CIRCUIT TRACES (Floor Grid Connections) ─── */}
        <g className="ids-trace-idle">
          {/* Left entry node to Server 1 & Server 2 */}
          <path d="M 32 345 L 75 345 L 117 395" />
          <path d="M 32 345 L 65 310 L 98 250" />
          {/* Server 1 -> Server 3 */}
          <path d="M 117 395 L 175 395 L 208 360 L 208 320" />
          {/* Server 2 -> Server 3 */}
          <path d="M 98 250 L 145 250 L 175 260 L 208 260" />
          {/* Server 3 -> Server 4 */}
          <path d="M 208 270 L 255 240 L 285 240 L 312 220" />
          {/* Server 3 -> Server 5 */}
          <path d="M 208 320 L 260 320 L 310 310 L 370 310 L 417 325" />
          {/* Server 4 -> Server 6 */}
          <path d="M 312 220 L 360 210 L 420 210 L 450 225 L 488 225" />
          {/* Server 5 -> Junction */}
          <path d="M 417 325 L 460 325 L 510 325 L 540 310 L 570 305" />
          {/* Server 6 -> Junction */}
          <path d="M 488 255 L 530 285 L 570 305" />
          {/* Junction -> Laptop Floor Entry -> Shield Lock */}
          <path d="M 570 305 L 615 290 L 645 275 L 675 260 L 705 245" />
        </g>

        {/* ─── 2. ACTIVE SEQUENTIAL LASER BEAMS ─── */}
        <g>
          <path className="ids-laser-0-1" d="M 32 345 L 75 345 L 117 395" />
          <path className="ids-laser-1-3" d="M 117 395 L 175 395 L 208 360 L 208 320" />
          <path className="ids-laser-2-3" d="M 98 250 L 145 250 L 175 260 L 208 260" />
          <path className="ids-laser-3-4" d="M 208 270 L 255 240 L 285 240 L 312 220" />
          <path className="ids-laser-3-5" d="M 208 320 L 260 320 L 310 310 L 370 310 L 417 325" />
          <path className="ids-laser-4-6" d="M 312 220 L 360 210 L 420 210 L 450 225 L 488 225" />
          <path className="ids-laser-5-junc" d="M 417 325 L 460 325 L 510 325 L 540 310 L 570 305" />
          <path className="ids-laser-6-junc" d="M 488 255 L 530 285 L 570 305" />
          <path className="ids-laser-laptop" d="M 570 305 L 615 290 L 645 275 L 675 260 L 705 245" />

          {/* Red Intrusion Threat Laser Pulse Beam */}
          <path className="ids-laser-threat" d="M 117 395 L 175 395 L 208 360 L 260 320 L 370 310 L 417 325 L 510 325 L 570 305 L 645 275 L 705 245" />
        </g>

        {/* ─── 3. STREAMING HIGH-DEFINITION PHOTON PACKETS ─── */}
        <g>
          {/* Packet 0: Left Entry -> Server 1 */}
          <circle r="5.5" fill="#FFFFFF" stroke="#00F0FF" strokeWidth="1.5" filter="url(#idsPacketGlow)">
            <animateMotion
              path="M 32 345 L 75 345 L 117 395"
              dur="8s"
              begin="0s"
              keyTimes="0;0.03;0.10;1"
              keyPoints="0;0;1;1"
              repeatCount="indefinite"
            />
          </circle>

          {/* Packet 1: Server 1 -> Server 3 */}
          <circle r="6" fill="#00F0FF" stroke="#FFFFFF" strokeWidth="1.5" filter="url(#idsPacketGlow)">
            <animateMotion
              path="M 117 395 L 175 395 L 208 360 L 208 320"
              dur="8s"
              begin="0s"
              keyTimes="0;0.08;0.16;1"
              keyPoints="0;0;1;1"
              repeatCount="indefinite"
            />
          </circle>

          {/* Packet 2: Server 2 -> Server 3 */}
          <circle r="5.5" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1.5" filter="url(#idsPacketGlow)">
            <animateMotion
              path="M 98 250 L 145 250 L 175 260 L 208 260"
              dur="8s"
              begin="0s"
              keyTimes="0;0.10;0.18;1"
              keyPoints="0;0;1;1"
              repeatCount="indefinite"
            />
          </circle>

          {/* Packet 3A: Server 3 -> Server 4 */}
          <circle r="5.5" fill="#00F0FF" stroke="#FFFFFF" strokeWidth="1.5" filter="url(#idsPacketGlow)">
            <animateMotion
              path="M 208 270 L 255 240 L 285 240 L 312 220"
              dur="8s"
              begin="0s"
              keyTimes="0;0.17;0.26;1"
              keyPoints="0;0;1;1"
              repeatCount="indefinite"
            />
          </circle>

          {/* Packet 3B: Server 3 -> Server 5 */}
          <circle r="5.5" fill="#00F0FF" stroke="#FFFFFF" strokeWidth="1.5" filter="url(#idsPacketGlow)">
            <animateMotion
              path="M 208 320 L 260 320 L 310 310 L 370 310 L 417 325"
              dur="8s"
              begin="0s"
              keyTimes="0;0.17;0.27;1"
              keyPoints="0;0;1;1"
              repeatCount="indefinite"
            />
          </circle>

          {/* Packet 4: Server 4 -> Server 6 */}
          <circle r="5.5" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1.5" filter="url(#idsPacketGlow)">
            <animateMotion
              path="M 312 220 L 360 210 L 420 210 L 450 225 L 488 225"
              dur="8s"
              begin="0s"
              keyTimes="0;0.26;0.35;1"
              keyPoints="0;0;1;1"
              repeatCount="indefinite"
            />
          </circle>

          {/* Packet 5: Server 5 -> Junction */}
          <circle r="6" fill="#00F0FF" stroke="#FFFFFF" strokeWidth="1.5" filter="url(#idsPacketGlow)">
            <animateMotion
              path="M 417 325 L 460 325 L 510 325 L 540 310 L 570 305"
              dur="8s"
              begin="0s"
              keyTimes="0;0.29;0.39;1"
              keyPoints="0;0;1;1"
              repeatCount="indefinite"
            />
          </circle>

          {/* Packet 6: Server 6 -> Junction */}
          <circle r="5.5" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1.5" filter="url(#idsPacketGlow)">
            <animateMotion
              path="M 488 255 L 530 285 L 570 305"
              dur="8s"
              begin="0s"
              keyTimes="0;0.33;0.41;1"
              keyPoints="0;0;1;1"
              repeatCount="indefinite"
            />
          </circle>

          {/* Packet 7 (Normal Converged Stream): Junction -> Laptop Base -> Lock */}
          <circle r="6.5" fill="#FFFFFF" stroke="#00F0FF" strokeWidth="2" filter="url(#idsPacketGlow)">
            <animateMotion
              path="M 570 305 L 615 290 L 645 275 L 675 260 L 705 245"
              dur="8s"
              begin="0s"
              keyTimes="0;0.38;0.48;1"
              keyPoints="0;0;1;1"
              repeatCount="indefinite"
            />
          </circle>

          {/* Red Intrusion Threat Packet (High-Visibility Malicious Cube) */}
          <g filter="url(#idsRedThreatGlow)">
            <rect width="13" height="13" x="-6.5" y="-6.5" rx="3" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5">
              <animateMotion
                path="M 117 395 L 175 395 L 208 360 L 260 320 L 370 310 L 417 325 L 510 325 L 570 305 L 645 275 L 705 245"
                dur="8s"
                begin="0s"
                keyTimes="0;0.48;0.62;1"
                keyPoints="0;0;1;1"
                repeatCount="indefinite"
              />
            </rect>
          </g>
        </g>

        {/* ─── 4. THE 6 DATABASE STORAGE SERVERS & NODES ─── */}
        <g>
          {/* Far Left Entry Floor Node (32, 345) */}
          <g transform="translate(32, 345)">
            <circle cx="0" cy="0" r="9" fill="none" stroke="#00F0FF" strokeWidth="2" className="animate-ping" />
            <circle cx="0" cy="0" r="5.5" fill="#00F0FF" filter="url(#idsPacketGlow)" />
          </g>

          {/* Node near Server 1 base (75, 380) */}
          <g transform="translate(75, 380)">
            <circle cx="0" cy="0" r="4.5" fill="#00F0FF" filter="url(#idsPacketGlow)" />
          </g>

          {/* Server 1 (Bottom Left: 117, 345) */}
          <g transform="translate(117, 345)">
            <ellipse cx="0" cy="20" rx="38" ry="17" className="ids-server-glow ids-server-1" fill="#00F0FF" />
            <circle cx="0" cy="25" r="5.5" fill="#FFFFFF" filter="url(#idsPacketGlow)" className="ids-server-1" />
            {/* Flashing Hazard Icon during Intrusion */}
            <g className="ids-hazard-badge" transform="translate(0, -36)">
              <polygon points="0,-12 12,10 -12,10" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" filter="url(#idsRedThreatGlow)" />
              <text x="0" y="7" fill="#FFFFFF" fontSize="9" fontWeight="900" textAnchor="middle">!</text>
            </g>
          </g>

          {/* Server 2 (Top Left: 98, 205) */}
          <g transform="translate(98, 205)">
            <ellipse cx="0" cy="20" rx="34" ry="15" className="ids-server-glow ids-server-2" fill="#00F0FF" />
            <circle cx="0" cy="25" r="5" fill="#FFFFFF" filter="url(#idsPacketGlow)" className="ids-server-2" />
          </g>

          {/* Inter-server Junction Node (145, 290) */}
          <g transform="translate(145, 290)">
            <circle cx="0" cy="0" r="6" fill="none" stroke="#38BDF8" strokeWidth="2" className="animate-ping" />
            <circle cx="0" cy="0" r="4.5" fill="#00F0FF" filter="url(#idsPacketGlow)" />
          </g>

          {/* Server 3 (Lower Mid-Left: 208, 275) */}
          <g transform="translate(208, 275)">
            <ellipse cx="0" cy="25" rx="38" ry="17" className="ids-server-glow ids-server-3" fill="#38BDF8" />
            <circle cx="0" cy="30" r="5.5" fill="#FFFFFF" filter="url(#idsPacketGlow)" className="ids-server-3" />
            {/* Flashing Hazard Icon during Intrusion */}
            <g className="ids-hazard-badge" transform="translate(0, -34)">
              <polygon points="0,-12 12,10 -12,10" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" filter="url(#idsRedThreatGlow)" />
              <text x="0" y="7" fill="#FFFFFF" fontSize="9" fontWeight="900" textAnchor="middle">!</text>
            </g>
          </g>

          {/* Server 4 (Upper Mid-Left: 312, 175) */}
          <g transform="translate(312, 175)">
            <ellipse cx="0" cy="22" rx="34" ry="15" className="ids-server-glow ids-server-4" fill="#38BDF8" />
            <circle cx="0" cy="26" r="5" fill="#FFFFFF" filter="url(#idsPacketGlow)" className="ids-server-4" />
          </g>

          {/* Server 5 (Center Lower: 417, 285) */}
          <g transform="translate(417, 285)">
            <ellipse cx="0" cy="24" rx="36" ry="16" className="ids-server-glow ids-server-5" fill="#00F0FF" />
            <circle cx="0" cy="28" r="5" fill="#FFFFFF" filter="url(#idsPacketGlow)" className="ids-server-5" />
            {/* Flashing Hazard Icon during Intrusion */}
            <g className="ids-hazard-badge" transform="translate(0, -32)">
              <polygon points="0,-12 12,10 -12,10" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" filter="url(#idsRedThreatGlow)" />
              <text x="0" y="7" fill="#FFFFFF" fontSize="9" fontWeight="900" textAnchor="middle">!</text>
            </g>
          </g>

          {/* Server 6 (Center Upper: 488, 225) */}
          <g transform="translate(488, 225)">
            <ellipse cx="0" cy="22" rx="32" ry="15" className="ids-server-glow ids-server-6" fill="#00F0FF" />
            <circle cx="0" cy="25" r="5" fill="#FFFFFF" filter="url(#idsPacketGlow)" className="ids-server-6" />
          </g>

          {/* Central Conduit Junction Node (570, 305) */}
          <g transform="translate(570, 305)">
            <circle cx="0" cy="0" r="10" fill="none" stroke="#00F0FF" strokeWidth="2" className="animate-pulse" />
            <circle cx="0" cy="0" r="6" fill="#00F0FF" filter="url(#idsPacketGlow)" />
          </g>
        </g>

        {/* ─── 5. LAPTOP HOLOGRAPHIC LOCK: RADAR RINGS & 3-PHASE TRANSITIONS ─── */}
        <g>
          {/* Outer Rotating Cyber Radar Circle 1 */}
          <circle
            cx="705"
            cy="245"
            r="64"
            fill="none"
            stroke="#00F0FF"
            strokeWidth="2"
            strokeDasharray="10 14"
            className="ids-radar-ring-1"
            opacity="0.7"
          />

          {/* Outer Rotating Cyber Radar Circle 2 (Counter-clockwise) */}
          <circle
            cx="705"
            cy="245"
            r="76"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1.5"
            strokeDasharray="6 12 18 12"
            className="ids-radar-ring-2"
            opacity="0.55"
          />

          {/* Lock Core Halo Glow (Color shifting: Cyan -> Red Alert -> Emerald Secured) */}
          <circle
            cx="705"
            cy="245"
            r="52"
            className="ids-lock-aura"
          />

          {/* Red Intrusion Shockwave Burst Ring */}
          <circle
            cx="705"
            cy="245"
            r="46"
            fill="none"
            strokeWidth="4"
            className="ids-lock-ring-red"
            filter="url(#idsRedThreatGlow)"
          />

          {/* Emerald Green Mitigation Shockwave Burst Ring */}
          <circle
            cx="705"
            cy="245"
            r="50"
            fill="none"
            strokeWidth="4"
            className="ids-lock-ring-green"
            filter="url(#idsShieldBurst)"
          />

          {/* Inner High-Intensity Core Spot */}
          <circle
            cx="705"
            cy="245"
            r="11"
            fill="#FFFFFF"
            filter="url(#idsPacketGlow)"
            opacity="0.95"
          />

          {/* ─── DYNAMIC HOLOGRAPHIC CYBER HUD BADGE ─── */}
          <g className="ids-status-badge">
            {/* HUD Glass Pill Box */}
            <rect
              x="615"
              y="146"
              width="180"
              height="32"
              rx="16"
              className="ids-hud-pill"
              strokeWidth="2.5"
              filter="url(#idsLaserGlow)"
            />

            {/* Red State: "⚠️ INTRUSION DETECTED" */}
            <g className="ids-hud-alert-text">
              <circle cx="633" cy="162" r="5" fill="#EF4444" className="animate-ping" />
              <circle cx="633" cy="162" r="3.5" fill="#EF4444" />
              <text
                x="646"
                y="167"
                fill="#FEE2E2"
                fontSize="11.5"
                fontWeight="900"
                letterSpacing="0.8"
                fontFamily="sans-serif"
              >
                ⚠️ INTRUSION DETECTED
              </text>
            </g>

            {/* Green State: "🛡️ SYSTEM SECURED" */}
            <g className="ids-hud-secure-text">
              <circle cx="633" cy="162" r="5" fill="#10B981" className="animate-ping" />
              <circle cx="633" cy="162" r="3.5" fill="#10B981" />
              <text
                x="646"
                y="167"
                fill="#ECFDF5"
                fontSize="11.5"
                fontWeight="900"
                letterSpacing="0.8"
                fontFamily="sans-serif"
              >
                🛡️ SYSTEM SECURED
              </text>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
