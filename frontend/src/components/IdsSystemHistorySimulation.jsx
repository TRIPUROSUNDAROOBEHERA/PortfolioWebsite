import React, { useState, useEffect, useRef } from 'react';

/**
 * Initial historical logs matching live IDS operations (Zeek, Snort, NSL-KDD, Django)
 */
const INITIAL_LOGS = [
  {
    id: 1,
    time: '13:05:31',
    step: 'Data Preprocessing',
    details: 'Parsing, Normalization - Extracting structural features',
    status: 'INF_NORMAL',
    type: 'normal',
  },
  {
    id: 2,
    time: '13:05:30',
    step: 'Data Collection',
    details: 'Zeek, Snort, Wireshark - Capturing network packets',
    status: 'INF_NORMAL',
    type: 'normal',
  },
  {
    id: 3,
    time: '13:05:19',
    step: 'Dashboard & Database',
    details: 'PostgreSQL / Elasticsearch - Committed telemetry state',
    status: 'INF_NORMAL',
    type: 'normal',
  },
  {
    id: 4,
    time: '13:05:18',
    step: 'Real-Time Alerts',
    details: 'SIEM / Slack / Email - Dispatched threat markers',
    status: 'INF_NORMAL',
    type: 'normal',
  },
  {
    id: 5,
    time: '13:05:10',
    step: 'Intrusion Detection & Prediction',
    details: 'Random Forest NSL-KDD - Binary classification score: 0.02 (Benign)',
    status: 'INF_NORMAL',
    type: 'normal',
  },
  {
    id: 6,
    time: '13:05:04',
    step: 'Network Traffic Source',
    details: 'Ingress Interface eth0 - Monitored 42,000 incoming IP flows',
    status: 'INF_NORMAL',
    type: 'normal',
  },
];

export default function IdsSystemHistorySimulation({ isEmbedded = false, onComplete } = {}) {
  const [vectorMode, setVectorMode] = useState('safe'); // 'safe' | 'malicious'
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStage, setActiveStage] = useState(0); // 0 (idle), 1 (source), 2 (prep), 3 (ml), 4 (detect)
  const [autoLoop, setAutoLoop] = useState(true); // Continuous automatic cycle requested
  const [inspectedCount, setInspectedCount] = useState(1250);
  const [anomalyCount, setAnomalyCount] = useState(15);
  const [nodeHealth, setNodeHealth] = useState(97.3);
  const [logs, setLogs] = useState(INITIAL_LOGS);

  const logContainerRef = useRef(null);
  const simTimerRef = useRef(null);
  const loopTimerRef = useRef(null);
  const vectorModeRef = useRef(vectorMode);
  const autoLoopRef = useRef(autoLoop);
  const isSimulatingRef = useRef(isSimulating);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Synchronize refs for async timer access
  useEffect(() => {
    vectorModeRef.current = vectorMode;
  }, [vectorMode]);

  useEffect(() => {
    autoLoopRef.current = autoLoop;
  }, [autoLoop]);

  useEffect(() => {
    isSimulatingRef.current = isSimulating;
  }, [isSimulating]);

  // Clean up all timers on unmount
  useEffect(() => {
    return () => {
      if (simTimerRef.current) clearTimeout(simTimerRef.current);
      if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
    };
  }, []);

  // Format current timestamp HH:MM:SS
  const getCurrentTime = () => {
    const d = new Date();
    return d.toTimeString().split(' ')[0];
  };

  // Auto-scroll log console to top when new event arrives
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [logs]);

  // Core Simulation Step Pipeline (supports automatic alternating loops)
  const runSimulation = (modeToRun) => {
    const mode = modeToRun || vectorModeRef.current;
    setIsSimulating(true);
    setActiveStage(1);

    const now = getCurrentTime();

    // Stage 1: Traffic Ingestion
    setLogs((prev) => [
      {
        id: Date.now(),
        time: now,
        step: 'Network Traffic Source',
        details:
          mode === 'safe'
            ? 'HTTPS / TLS 1.3 Packets - Standard User Session Stream'
            : '⚠️ Anomaly Influx: High-Frequency TCP SYN Flood detected on Port 80/443',
        status: mode === 'safe' ? 'INF_NORMAL' : 'WARN_ANOMALY',
        type: mode === 'safe' ? 'normal' : 'danger',
      },
      ...prev.slice(0, 24),
    ]);

    // Stage 2: Data Collection & Preprocessing
    simTimerRef.current = setTimeout(() => {
      setActiveStage(2);
      setLogs((prev) => [
        {
          id: Date.now() + 1,
          time: getCurrentTime(),
          step: 'Data Preprocessing',
          details:
            mode === 'safe'
              ? 'Feature Scaling: 41 NSL-KDD attributes extracted & normalized'
              : 'Protocol Analysis: Abnormal packet header entropy flagged (score 0.89)',
          status: mode === 'safe' ? 'INF_NORMAL' : 'WARN_ANOMALY',
          type: mode === 'safe' ? 'normal' : 'danger',
        },
        ...prev.slice(0, 24),
      ]);

      // Stage 3: ML Inference Model
      simTimerRef.current = setTimeout(() => {
        setActiveStage(3);
        setLogs((prev) => [
          {
            id: Date.now() + 2,
            time: getCurrentTime(),
            step: 'Machine Learning Model',
            details:
              mode === 'safe'
                ? 'Random Forest / LSTM: Clean signature match, 99.4% confidence benign'
                : 'Neural Classifier: Malicious pattern identified (DoS attack signature)',
            status: mode === 'safe' ? 'INF_NORMAL' : 'ALERT_MALICIOUS',
            type: mode === 'safe' ? 'normal' : 'danger',
          },
          ...prev.slice(0, 24),
        ]);

        // Stage 4: Intrusion Detection & Final Routing (Metrics DB or Incident Alerts)
        simTimerRef.current = setTimeout(() => {
          setActiveStage(4);

          if (mode === 'safe') {
            setInspectedCount((c) => c + 45);
            setNodeHealth((h) => Math.min(99.8, Number((h + 0.4).toFixed(1))));

            setLogs((prev) => [
              {
                id: Date.now() + 3,
                time: getCurrentTime(),
                step: 'Dashboard & Database',
                details: 'PostgreSQL / Elasticsearch - Telemetry saved, metrics updated',
                status: 'INF_NORMAL',
                type: 'normal',
              },
              ...prev.slice(0, 24),
            ]);
          } else {
            setInspectedCount((c) => c + 60);
            setAnomalyCount((a) => a + 1);
            setNodeHealth((h) => Math.max(91.2, Number((h - 1.8).toFixed(1))));

            setLogs((prev) => [
              {
                id: Date.now() + 3,
                time: getCurrentTime(),
                step: 'Real-Time Alerts',
                details: '🚨 CRITICAL: Firewall Rule Applied, SIEM & Slack notified',
                status: 'ALERT_MALICIOUS',
                type: 'danger',
              },
              ...prev.slice(0, 24),
            ]);
          }

          // Complete current cycle and prepare next automatic alternating loop
          simTimerRef.current = setTimeout(() => {
            setIsSimulating(false);
            setActiveStage(0);

            // If autoLoop is active, alternate mode: Safe -> Malicious -> System Architecture Core Features
            if (autoLoopRef.current) {
              if (mode === 'safe') {
                // Safe complete, transition to Malicious Intrusion simulation
                loopTimerRef.current = setTimeout(() => {
                  if (autoLoopRef.current) {
                    setVectorMode('malicious');
                    runSimulation('malicious');
                  }
                }, 1800);
              } else {
                // Malicious complete! Both Safe Traffic and Malicious Intrusion have completed their animation!
                // Automatically switch back to System Architecture Core Features!
                if (typeof onCompleteRef.current === 'function') {
                  loopTimerRef.current = setTimeout(() => {
                    if (autoLoopRef.current) {
                      onCompleteRef.current();
                    }
                  }, 2200);
                } else {
                  // Standalone fallback: loop back to safe
                  loopTimerRef.current = setTimeout(() => {
                    if (autoLoopRef.current) {
                      setVectorMode('safe');
                      runSimulation('safe');
                    }
                  }, 2200);
                }
              }
            }
          }, 1400);
        }, 1100);
      }, 1100);
    }, 1000);
  };

  // Launch automatic simulation loop after mount
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      if (autoLoopRef.current && !isSimulatingRef.current) {
        runSimulation('safe');
      }
    }, 1200);

    return () => {
      clearTimeout(initialTimer);
      if (simTimerRef.current) clearTimeout(simTimerRef.current);
      if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
    };
  }, []);

  // Manual Trigger or Toggle Auto Loop
  const handleToggleAutoLoop = () => {
    const nextState = !autoLoop;
    setAutoLoop(nextState);
    if (nextState) {
      if (!isSimulating) {
        runSimulation(vectorMode);
      }
    } else {
      if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
    }
  };

  const handleSelectMode = (newMode) => {
    setVectorMode(newMode);
    if (!isSimulating) {
      if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
      runSimulation(newMode);
    }
  };

  const handleManualStart = () => {
    if (isSimulating) return;
    if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
    runSimulation(vectorMode);
  };

  // Reset to initial state
  const handleReset = () => {
    if (simTimerRef.current) clearTimeout(simTimerRef.current);
    if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
    setIsSimulating(false);
    setActiveStage(0);
    setInspectedCount(1250);
    setAnomalyCount(15);
    setNodeHealth(97.3);
    setLogs(INITIAL_LOGS);
    setVectorMode('safe');

    if (autoLoop) {
      loopTimerRef.current = setTimeout(() => {
        runSimulation('safe');
      }, 1500);
    }
  };

  return (
    <div
      id="ids-system-history-simulation"
      className={`w-full text-slate-800 space-y-2.5 sm:space-y-6 overflow-hidden ${
        isEmbedded ? '' : 'bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-md p-2 xs:p-2.5 sm:p-6 lg:p-7'
      }`}
    >
      {/* 2-Column Responsive Grid: Left side System History, Right side Simulation Vector */}
      <div className="grid grid-cols-2 gap-2 sm:gap-6 lg:gap-8 items-start">
        
        {/* ─── LEFT COLUMN: SYSTEM HISTORY & LOGS ─── */}
        <div className="flex flex-col space-y-2 sm:space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between pb-1 sm:pb-2 border-b border-slate-200 gap-1">
            <div>
              <h4 className="font-extrabold text-[8.5px] xs:text-[9.5px] sm:text-base tracking-tight sm:tracking-wide text-slate-900 uppercase">
                <span className="hidden sm:inline">System History & Logs</span>
                <span className="sm:hidden">History & Logs</span>
              </h4>
            </div>

            <div className="px-1.5 xs:px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-slate-100 text-slate-600 text-[7px] xs:text-[8px] sm:text-[11px] font-mono border border-slate-200 flex items-center gap-1 shadow-2xs shrink-0">
              <i className="fa-regular fa-clock text-blue-500 text-[6.5px] xs:text-[7.5px] sm:text-[10px]"></i>
              <span><span className="hidden xs:inline">Real-time </span>Console</span>
            </div>
          </div>

          {/* 3 Metrics Cards */}
          <div className="grid grid-cols-3 gap-1 xs:gap-1.5 sm:gap-3">
            {/* Inspected */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg sm:rounded-2xl p-1 xs:p-1.5 sm:p-3.5 flex flex-col justify-between shadow-2xs">
              <span className="text-[6px] xs:text-[7px] sm:text-[11px] font-mono uppercase text-slate-500 font-semibold tracking-tighter sm:tracking-wider truncate">
                INSPECTED
              </span>
              <span className="text-[9px] xs:text-[11px] sm:text-2xl font-mono font-extrabold text-slate-900 mt-0.5 sm:mt-1 truncate">
                {inspectedCount.toLocaleString()}
              </span>
            </div>

            {/* Anomalies */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg sm:rounded-2xl p-1 xs:p-1.5 sm:p-3.5 flex flex-col justify-between shadow-2xs">
              <span className="text-[6px] xs:text-[7px] sm:text-[11px] font-mono uppercase text-slate-500 font-semibold tracking-tighter sm:tracking-wider truncate">
                ANOMALIES
              </span>
              <span className="text-[9px] xs:text-[11px] sm:text-2xl font-mono font-extrabold text-red-600 mt-0.5 sm:mt-1 truncate">
                {anomalyCount}
              </span>
            </div>

            {/* Node Health */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg sm:rounded-2xl p-1 xs:p-1.5 sm:p-3.5 flex flex-col justify-between shadow-2xs">
              <span className="text-[6px] xs:text-[7px] sm:text-[11px] font-mono uppercase text-slate-500 font-semibold tracking-tighter sm:tracking-wider truncate">
                <span className="hidden sm:inline">NODE </span>HEALTH
              </span>
              <span className="text-[9px] xs:text-[11px] sm:text-2xl font-mono font-extrabold text-emerald-600 mt-0.5 sm:mt-1 truncate">
                {nodeHealth}%
              </span>
            </div>
          </div>

          {/* Live Console Logs Container */}
          <div
            ref={logContainerRef}
            className="w-full h-[280px] xs:h-[310px] sm:h-[400px] lg:h-[440px] overflow-y-auto rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 p-1.5 xs:p-2 sm:p-3 space-y-1.5 sm:space-y-2.5 font-mono text-xs scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent"
          >
            {logs.map((log) => {
              const isDanger = log.type === 'danger';
              return (
                <div
                  key={log.id}
                  className={`rounded-lg sm:rounded-xl p-1.5 xs:p-2 sm:p-3 border transition-all duration-300 ${
                    isDanger
                      ? 'bg-red-50/90 border-red-200 text-red-900 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between text-[7px] xs:text-[8px] sm:text-[11px] mb-0.5 sm:mb-1 gap-1">
                    <span className={isDanger ? 'text-red-700/80 font-mono' : 'text-slate-400 font-mono'}>
                      {log.time}
                    </span>
                    <span
                      className={`px-1 sm:px-2 py-0.2 sm:py-0.5 rounded text-[6px] xs:text-[7px] sm:text-[10px] font-bold tracking-wider flex items-center gap-0.5 sm:gap-1 shrink-0 ${
                        isDanger
                          ? 'bg-red-100 text-red-700 border border-red-300 animate-pulse'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                      }`}
                    >
                      <i className={`fa-solid ${isDanger ? 'fa-triangle-exclamation' : 'fa-check-circle'} text-[5.5px] xs:text-[6.5px] sm:text-[9px]`}></i>
                      <span>{log.status}</span>
                    </span>
                  </div>
                  <h5
                    className={`font-bold text-[7.5px] xs:text-[8.5px] sm:text-[13px] tracking-tight mb-0.5 leading-tight truncate sm:whitespace-normal ${
                      isDanger ? 'text-red-950' : 'text-slate-900'
                    }`}
                  >
                    {log.step}
                  </h5>
                  <p
                    className={`text-[6.5px] xs:text-[7.5px] sm:text-[11px] leading-tight sm:leading-relaxed font-sans font-normal line-clamp-2 sm:line-clamp-none ${
                      isDanger ? 'text-red-800' : 'text-slate-600'
                    }`}
                  >
                    {log.details}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── RIGHT COLUMN: SIMULATION VECTOR ─── */}
        <div className="flex flex-col space-y-2 sm:space-y-4">
          
          {/* Controls Bar */}
          <div className="space-y-1.5 sm:space-y-3 pb-1 sm:pb-2 border-b border-slate-200">
            {/* Top row: Simulation Vector Label + Safe / Malicious Toggles + Auto Loop Toggle */}
            <div className="flex items-center justify-between gap-1 sm:gap-2.5">
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="hidden sm:inline text-xs sm:text-sm font-bold text-slate-800 shrink-0">
                  Simulation Vector:
                </span>
                
                {/* Mode Selector Pill Buttons */}
                <div className="inline-flex rounded-full bg-slate-100 p-0.5 border border-slate-200 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleSelectMode('safe')}
                    disabled={isSimulating}
                    className={`px-1.5 xs:px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[7px] xs:text-[8px] sm:text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      vectorMode === 'safe'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Safe<span className="hidden sm:inline"> Traffic</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectMode('malicious')}
                    disabled={isSimulating}
                    className={`px-1.5 xs:px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[7px] xs:text-[8px] sm:text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      vectorMode === 'malicious'
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span className="hidden sm:inline">Malicious </span>Intrusion
                  </button>
                </div>
              </div>

              {/* Auto Loop Toggle Pill */}
              <button
                type="button"
                onClick={handleToggleAutoLoop}
                className={`px-1.5 xs:px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[6.5px] xs:text-[7.5px] sm:text-xs font-mono font-bold border flex items-center gap-1 sm:gap-1.5 shadow-2xs transition-all cursor-pointer shrink-0 ${
                  autoLoop
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                    : 'bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200'
                }`}
                title={autoLoop ? 'Auto Loop Active (Click to Pause)' : 'Auto Loop Paused (Click to Enable)'}
              >
                <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${autoLoop ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
                <span><span className="hidden sm:inline">AUTO LOOP</span><span className="sm:hidden">AUTO</span>: {autoLoop ? 'ON' : 'OFF'}</span>
              </button>
            </div>

            {/* Action Buttons: Main Play Button + Reset */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={handleManualStart}
                disabled={isSimulating}
                className={`flex-1 py-1.5 xs:py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg sm:rounded-xl font-bold text-[7.5px] xs:text-[8.5px] sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 shadow-sm transition-all duration-200 cursor-pointer ${
                  isSimulating
                    ? 'bg-blue-500/70 text-white cursor-not-allowed'
                    : vectorMode === 'safe'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-500/20'
                    : 'bg-red-600 hover:bg-red-700 text-white hover:shadow-red-500/20'
                }`}
              >
                <i className={`fa-solid ${isSimulating ? 'fa-spinner fa-spin' : 'fa-play'} text-[6.5px] xs:text-[7.5px] sm:text-xs`}></i>
                <span className="truncate">
                  {isSimulating ? (
                    vectorMode === 'safe' ? (
                      <>
                        <span className="hidden sm:inline">Simulating Safe Traffic Flow...</span>
                        <span className="sm:hidden">Simulating Safe...</span>
                      </>
                    ) : (
                      <>
                        <span className="hidden sm:inline">Simulating Malicious Influx...</span>
                        <span className="sm:hidden">Simulating Threat...</span>
                      </>
                    )
                  ) : (
                    <>
                      <span className="hidden sm:inline">Traffic Flow Simulation</span>
                      <span className="sm:hidden">Simulate Flow</span>
                    </>
                  )}
                </span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="p-1.5 xs:p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[7.5px] sm:text-xs font-semibold transition-colors border border-slate-300 cursor-pointer shadow-2xs shrink-0"
                title="Reset simulation and counters"
              >
                <i className="fa-solid fa-rotate-left"></i>
              </button>
            </div>
          </div>

          {/* Visual Vector Stage: Clean White Stage with Generously Sized 3D Rhombus Boxes */}
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-white border border-slate-200 flex flex-col justify-between h-[280px] xs:h-[310px] sm:h-[400px] lg:h-[440px] p-1.5 xs:p-2 sm:p-4 shadow-sm">
            
            {/* Top Row inside canvas: Pipeline Status and Active Indicator */}
            <div className="flex items-center justify-between z-10 w-full mb-0.5 sm:mb-1 gap-1">
              <span className="text-[6.5px] xs:text-[7.5px] sm:text-[11px] font-mono text-slate-500 uppercase tracking-tight sm:tracking-wider font-semibold truncate">
                <span className="hidden sm:inline">{autoLoop ? 'Continuous Live Pipeline Mode' : 'Manual Trigger Mode'}</span>
                <span className="sm:hidden">{autoLoop ? 'Live Pipeline' : 'Manual'}</span>
              </span>

              <div
                className={`px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[6px] xs:text-[7px] sm:text-[11px] font-mono border flex items-center gap-1 sm:gap-1.5 shadow-2xs transition-colors duration-300 shrink-0 ${
                  isSimulating
                    ? vectorMode === 'safe'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-red-50 text-red-700 border-red-200'
                    : 'bg-slate-100/90 text-slate-600 border-slate-200'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                    isSimulating
                      ? vectorMode === 'safe'
                        ? 'bg-emerald-500 animate-ping'
                        : 'bg-red-500 animate-ping'
                      : 'bg-slate-400'
                  }`}
                />
                <span className="font-bold tracking-tight sm:tracking-wider">
                  {isSimulating
                    ? vectorMode === 'safe'
                      ? 'STREAMING SAFE TRAFFIC'
                      : 'INTRUSION THREAT DETECTED'
                    : 'ARCHITECTURE IDLE'}
                </span>
              </div>
            </div>

            {/* SVG Interactive Architecture Vector Canvas with Extra-Large Comfortable Boxes */}
            <div className="relative w-full flex-1 min-h-0 flex items-center justify-center select-none overflow-hidden">
              <svg
                viewBox="0 0 560 442"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {/* Subtle Grid Pattern on White Canvas */}
                  <pattern id="idsVectorGrid" width="36" height="36" patternUnits="userSpaceOnUse">
                    <path
                      d="M 36 0 L 0 0 0 36"
                      fill="none"
                      stroke="rgba(0, 0, 0, 0.04)"
                      strokeWidth="1"
                    />
                  </pattern>

                  {/* Soft Blur Filter for Photon Particle */}
                  <filter id="packetHaloGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3.0" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Grid Background */}
                <rect width="100%" height="100%" fill="url(#idsVectorGrid)" />

                {/* ─── BASE SHADOWS UNDER THE 3D RHOMBUS PLATES ─── */}
                <ellipse cx="280" cy="90" rx="100" ry="18" fill="rgba(0, 0, 0, 0.06)" filter="blur(4px)" />
                <ellipse cx="280" cy="206" rx="120" ry="20" fill="rgba(0, 0, 0, 0.07)" filter="blur(4px)" />
                <ellipse cx="280" cy="328" rx="125" ry="20" fill="rgba(0, 0, 0, 0.07)" filter="blur(4px)" />
                <ellipse cx="140" cy="432" rx="92" ry="18" fill="rgba(0, 0, 0, 0.06)" filter="blur(4px)" />
                <ellipse cx="420" cy="432" rx="92" ry="18" fill="rgba(0, 0, 0, 0.06)" filter="blur(4px)" />

                {/* ─── CONNECTING DATA TRACKS ─── */}
                {/* Track 1 -> 2 */}
                <line
                  x1="280"
                  y1="86"
                  x2="280"
                  y2="116"
                  stroke={activeStage >= 1 ? (vectorMode === 'safe' ? '#0284C7' : '#DC2626') : '#CBD5E1'}
                  strokeWidth={activeStage >= 1 ? '3' : '2'}
                  strokeDasharray={activeStage >= 1 ? 'none' : '4 3'}
                  className="transition-colors duration-300"
                />

                {/* Track 2 -> 3 */}
                <line
                  x1="280"
                  y1="202"
                  x2="280"
                  y2="234"
                  stroke={activeStage >= 2 ? (vectorMode === 'safe' ? '#0284C7' : '#DC2626') : '#CBD5E1'}
                  strokeWidth={activeStage >= 2 ? '3' : '2'}
                  strokeDasharray={activeStage >= 2 ? 'none' : '4 3'}
                  className="transition-colors duration-300"
                />

                {/* Branch Left: Track 3 -> Incident Alerts */}
                <path
                  d="M 280 324 C 280 344, 140 338, 140 354"
                  fill="none"
                  stroke={
                    activeStage >= 4 && vectorMode === 'malicious'
                      ? '#DC2626'
                      : '#CBD5E1'
                  }
                  strokeWidth={activeStage >= 4 && vectorMode === 'malicious' ? '3' : '2'}
                  strokeDasharray={activeStage >= 4 && vectorMode === 'malicious' ? 'none' : '4 3'}
                  className="transition-all duration-300"
                />

                {/* Branch Right: Track 3 -> Metrics DB */}
                <path
                  d="M 280 324 C 280 344, 420 338, 420 354"
                  fill="none"
                  stroke={
                    activeStage >= 4 && vectorMode === 'safe'
                      ? '#0284C7'
                      : '#CBD5E1'
                  }
                  strokeWidth={activeStage >= 4 && vectorMode === 'safe' ? '3' : '2'}
                  strokeDasharray={activeStage >= 4 && vectorMode === 'safe' ? 'none' : '4 3'}
                  className="transition-all duration-300"
                />

                {/* ─── 5 EXTRA-LARGE ISOMETRIC RHOMBUS NODES (PERFECT LETTER MARGINS & BALANCED SIZING) ─── */}
                
                {/* 1. TRAFFIC SOURCE (Width 260px, Height 68px) */}
                <g className="cursor-pointer" onClick={() => handleSelectMode(vectorMode)}>
                  {/* 3D Extrusion Side */}
                  <polygon
                    points="150,42 280,76 410,42 410,52 280,86 150,52"
                    fill={activeStage === 1 ? (vectorMode === 'safe' ? '#BAE6FD' : '#FECACA') : '#E2E8F0'}
                    stroke={activeStage === 1 ? (vectorMode === 'safe' ? '#0284C7' : '#DC2626') : '#94A3B8'}
                    strokeWidth="1.2"
                  />
                  {/* Top Face Plate */}
                  <polygon
                    points="280,8 410,42 280,76 150,42"
                    fill={activeStage === 1 ? (vectorMode === 'safe' ? '#E0F2FE' : '#FEE2E2') : '#FFFFFF'}
                    stroke={activeStage === 1 ? (vectorMode === 'safe' ? '#0284C7' : '#DC2626') : '#94A3B8'}
                    strokeWidth={activeStage === 1 ? '2.5' : '1.5'}
                    className="transition-all duration-300"
                  />
                  <text
                    x="280"
                    y="47"
                    textAnchor="middle"
                    fill={activeStage === 1 ? (vectorMode === 'safe' ? '#0369A1' : '#B91C1C') : '#0F172A'}
                    fontSize="13.5"
                    fontWeight="800"
                    letterSpacing="0.08em"
                    className="select-none pointer-events-none"
                  >
                    TRAFFIC SOURCE
                  </text>
                </g>

                {/* 2. DATA COLLECTION (Width 300px, Height 76px) */}
                <g className="cursor-pointer" onClick={() => handleSelectMode(vectorMode)}>
                  {/* 3D Extrusion Side */}
                  <polygon
                    points="130,154 280,192 430,154 430,164 280,202 130,164"
                    fill={activeStage === 2 ? (vectorMode === 'safe' ? '#BAE6FD' : '#FECACA') : '#E2E8F0'}
                    stroke={activeStage === 2 ? (vectorMode === 'safe' ? '#0284C7' : '#DC2626') : '#94A3B8'}
                    strokeWidth="1.2"
                  />
                  {/* Top Face Plate */}
                  <polygon
                    points="280,116 430,154 280,192 130,154"
                    fill={activeStage === 2 ? (vectorMode === 'safe' ? '#E0F2FE' : '#FEE2E2') : '#FFFFFF'}
                    stroke={activeStage === 2 ? (vectorMode === 'safe' ? '#0284C7' : '#DC2626') : '#94A3B8'}
                    strokeWidth={activeStage === 2 ? '2.5' : '1.5'}
                    className="transition-all duration-300"
                  />
                  <text
                    x="280"
                    y="149"
                    textAnchor="middle"
                    fill={activeStage === 2 ? (vectorMode === 'safe' ? '#0369A1' : '#B91C1C') : '#0F172A'}
                    fontSize="14"
                    fontWeight="800"
                    letterSpacing="0.06em"
                    className="select-none pointer-events-none"
                  >
                    DATA COLLECTION
                  </text>
                  <text
                    x="280"
                    y="169"
                    textAnchor="middle"
                    fill={activeStage === 2 ? (vectorMode === 'safe' ? '#0284C7' : '#DC2626') : '#64748B'}
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="600"
                    className="select-none pointer-events-none"
                  >
                    Zeek / Snort Matrix
                  </text>
                </g>

                {/* 3. ML INFERENCE MODEL (Width 310px, Height 80px) */}
                <g className="cursor-pointer" onClick={() => handleSelectMode(vectorMode)}>
                  {/* 3D Extrusion Side */}
                  <polygon
                    points="125,274 280,314 435,274 435,284 280,324 125,284"
                    fill={activeStage === 3 ? (vectorMode === 'safe' ? '#BAE6FD' : '#FECACA') : '#E2E8F0'}
                    stroke={activeStage === 3 ? (vectorMode === 'safe' ? '#0284C7' : '#DC2626') : '#94A3B8'}
                    strokeWidth="1.2"
                  />
                  {/* Top Face Plate */}
                  <polygon
                    points="280,234 435,274 280,314 125,274"
                    fill={activeStage === 3 ? (vectorMode === 'safe' ? '#E0F2FE' : '#FEE2E2') : '#FFFFFF'}
                    stroke={activeStage === 3 ? (vectorMode === 'safe' ? '#0284C7' : '#DC2626') : '#94A3B8'}
                    strokeWidth={activeStage === 2 ? '2.5' : '1.5'}
                    className="transition-all duration-300"
                  />
                  <text
                    x="280"
                    y="268"
                    textAnchor="middle"
                    fill={activeStage === 3 ? (vectorMode === 'safe' ? '#0369A1' : '#B91C1C') : '#0F172A'}
                    fontSize="14"
                    fontWeight="800"
                    letterSpacing="0.06em"
                    className="select-none pointer-events-none"
                  >
                    ML INFERENCE MODEL
                  </text>
                  <text
                    x="280"
                    y="288"
                    textAnchor="middle"
                    fill={activeStage === 3 ? (vectorMode === 'safe' ? '#0284C7' : '#DC2626') : '#64748B'}
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="600"
                    className="select-none pointer-events-none"
                  >
                    Random Forest / LSTM
                  </text>
                </g>

                {/* 4. INCIDENT ALERTS (Bottom Left, Width 220px, Height 64px) */}
                <g className="cursor-pointer" onClick={() => handleSelectMode('malicious')}>
                  {activeStage >= 4 && vectorMode === 'malicious' && (
                    <ellipse
                      cx="140"
                      cy="386"
                      rx="112"
                      ry="38"
                      fill="none"
                      stroke="#DC2626"
                      strokeWidth="2.5"
                      opacity="0.75"
                      className="animate-ping"
                    />
                  )}
                  {/* 3D Extrusion Side */}
                  <polygon
                    points="30,386 140,418 250,386 250,396 140,428 30,396"
                    fill={activeStage >= 4 && vectorMode === 'malicious' ? '#FECACA' : '#E2E8F0'}
                    stroke={activeStage >= 4 && vectorMode === 'malicious' ? '#DC2626' : '#94A3B8'}
                    strokeWidth="1.2"
                  />
                  {/* Top Face Plate */}
                  <polygon
                    points="140,354 250,386 140,418 30,386"
                    fill={activeStage >= 4 && vectorMode === 'malicious' ? '#FEE2E2' : '#FFFFFF'}
                    stroke={activeStage >= 4 && vectorMode === 'malicious' ? '#DC2626' : '#94A3B8'}
                    strokeWidth={activeStage >= 4 && vectorMode === 'malicious' ? '2.5' : '1.5'}
                    className="transition-all duration-300"
                  />
                  <text
                    x="140"
                    y="391"
                    textAnchor="middle"
                    fill={activeStage >= 4 && vectorMode === 'malicious' ? '#DC2626' : '#0F172A'}
                    fontSize="13"
                    fontWeight="800"
                    letterSpacing="0.05em"
                    className="select-none pointer-events-none"
                  >
                    INCIDENT ALERTS
                  </text>
                </g>

                {/* 5. METRICS DB (Bottom Right, Width 220px, Height 64px) */}
                <g className="cursor-pointer" onClick={() => handleSelectMode('safe')}>
                  {activeStage >= 4 && vectorMode === 'safe' && (
                    <ellipse
                      cx="420"
                      cy="386"
                      rx="112"
                      ry="38"
                      fill="none"
                      stroke="#0284C7"
                      strokeWidth="2.5"
                      opacity="0.75"
                      className="animate-ping"
                    />
                  )}
                  {/* 3D Extrusion Side */}
                  <polygon
                    points="310,386 420,418 530,386 530,396 420,428 310,396"
                    fill={activeStage >= 4 && vectorMode === 'safe' ? '#BAE6FD' : '#E2E8F0'}
                    stroke={activeStage >= 4 && vectorMode === 'safe' ? '#0284C7' : '#94A3B8'}
                    strokeWidth="1.2"
                  />
                  {/* Top Face Plate */}
                  <polygon
                    points="420,354 530,386 420,418 310,386"
                    fill={activeStage >= 4 && vectorMode === 'safe' ? '#E0F2FE' : '#FFFFFF'}
                    stroke={activeStage >= 4 && vectorMode === 'safe' ? '#0284C7' : '#94A3B8'}
                    strokeWidth={activeStage >= 4 && vectorMode === 'safe' ? '2.5' : '1.5'}
                    className="transition-all duration-300"
                  />
                  <text
                    x="420"
                    y="391"
                    textAnchor="middle"
                    fill={activeStage >= 4 && vectorMode === 'safe' ? '#0284C7' : '#0F172A'}
                    fontSize="13"
                    fontWeight="800"
                    letterSpacing="0.06em"
                    className="select-none pointer-events-none"
                  >
                    METRICS DB
                  </text>
                </g>

                {/* ─── TRAVELING DATA PACKET (VIBRANT GLOWING PHOTON SPHERE) ─── */}
                {(() => {
                  let px = 280;
                  let py = 154; // Default resting place at Data Collection
                  let pColor = '#0284C7';
                  let pGlow = '#38BDF8';
                  let pAura = 'rgba(2, 132, 199, 0.2)';

                  if (isSimulating) {
                    if (activeStage === 1) {
                      px = 280;
                      py = 42;
                      pColor = vectorMode === 'safe' ? '#0284C7' : '#DC2626';
                      pGlow = vectorMode === 'safe' ? '#38BDF8' : '#EF4444';
                      pAura = vectorMode === 'safe' ? 'rgba(2, 132, 199, 0.25)' : 'rgba(220, 38, 38, 0.25)';
                    } else if (activeStage === 2) {
                      px = 280;
                      py = 154;
                      pColor = vectorMode === 'safe' ? '#0284C7' : '#DC2626';
                      pGlow = vectorMode === 'safe' ? '#38BDF8' : '#EF4444';
                      pAura = vectorMode === 'safe' ? 'rgba(2, 132, 199, 0.25)' : 'rgba(220, 38, 38, 0.25)';
                    } else if (activeStage === 3) {
                      px = 280;
                      py = 274;
                      pColor = vectorMode === 'safe' ? '#0284C7' : '#DC2626';
                      pGlow = vectorMode === 'safe' ? '#38BDF8' : '#EF4444';
                      pAura = vectorMode === 'safe' ? 'rgba(2, 132, 199, 0.25)' : 'rgba(220, 38, 38, 0.25)';
                    } else if (activeStage >= 4) {
                      if (vectorMode === 'safe') {
                        px = 420;
                        py = 386;
                        pColor = '#0284C7';
                        pGlow = '#38BDF8';
                        pAura = 'rgba(2, 132, 199, 0.25)';
                      } else {
                        px = 140;
                        py = 386;
                        pColor = '#DC2626';
                        pGlow = '#EF4444';
                        pAura = 'rgba(220, 38, 38, 0.25)';
                      }
                    }
                  }

                  return (
                    <g
                      style={{
                        transform: `translate(${px}px, ${py}px)`,
                        transition: 'transform 0.85s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                      className="pointer-events-none"
                    >
                      {/* Outer Aura Ring */}
                      <circle
                        r="16"
                        fill={pAura}
                        className={isSimulating ? 'animate-ping' : ''}
                      />
                      {/* Mid Ring */}
                      <circle r="9.5" fill={pGlow} opacity="0.45" />
                      {/* Core Photon */}
                      <circle r="6" fill={pColor} filter="url(#packetHaloGlow)" />
                      {/* Center Bright Core */}
                      <circle r="2.5" fill="#FFFFFF" />
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
