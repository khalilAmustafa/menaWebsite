import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Zap, Activity, Cpu, Wifi, Terminal, RefreshCw, Send, CheckCircle2 } from 'lucide-react';
import { MissionControlState } from '../types';

export default function DashboardInteractive({ isArabic }: { isArabic: boolean }) {
  // Setup interactive control state to simulate a real Mars telemetry hub
  const [controlState, setControlState] = useState<MissionControlState>({
    missionClock: "MD 142 // 08:42:15",
    oxygenLevel: 98.4,
    batteryPower: 92.1,
    pressureLevel: 101.1,
    interiorTemp: 21.4,
    signalStrength: 85,
    isEvaActive: false,
    telemetryLogs: [
      "[SYSTEM] Remote link established with Wadi Rum Dome Alpha.",
      "[SIGNAL] Current delay tuned to 4.2 seconds test mode.",
      "[BATTERY] PV Array tracking sun orientation safely.",
      "[BIOMETRIC] Crew vitals synced in standard band indices.",
    ],
    // De-mock: crew are generic simulated positions, NOT named individuals. The previous
    // entries reused fabricated person names (Noor Al-Jaafari / Maya Toukan / Zein Obiedat);
    // anonymized to non-person labels so this illustrative telemetry demo invents no identity.
    crewVitals: [
      { id: 'crew-1', name: 'Analog Crew 01', role: 'Spacesuit & Command Position', heartRate: 72, suitPressure: 32.4, status: 'Stable' },
      { id: 'crew-2', name: 'Analog Crew 02', role: 'Astrobiology Position', heartRate: 78, suitPressure: 31.8, status: 'Stable' },
      { id: 'crew-3', name: 'Analog Crew 03', role: 'EVA Geophysics Position', heartRate: 88, suitPressure: 32.1, status: 'Stable' }
    ]
  });

  const [activeCrewId, setActiveCrewId] = useState<string>('crew-1');
  const [customCommand, setCustomCommand] = useState<string>('');
  const [isCalibrating, setIsCalibrating] = useState<boolean>(false);
  
  // Real-time loop to simulate dynamic telemetry shifts
  useEffect(() => {
    const timer = setInterval(() => {
      
      // Update Mission Sol clock representation
      const date = new Date();
      const sSeconds = String(date.getSeconds()).padStart(2, '0');
      const sMinutes = String(date.getMinutes()).padStart(2, '0');
      const sHours = String(date.getHours()).padStart(2, '0');
      
      setControlState(prev => {
        // Micro shifts in levels to feel realistic
        const oxShift = (Math.random() - 0.5) * 0.1;
        const batShift = prev.isEvaActive ? -0.15 : 0.05;
        const tempShift = (Math.random() - 0.5) * 0.2;
        const sigShift = (Math.random() - 0.5) * 2;

        // Shift heart rates randomly
        const updatedCrew = prev.crewVitals.map(crew => {
          const hrDelta = Math.floor((Math.random() - 0.5) * 4);
          let newHr = crew.heartRate + hrDelta;
          if (newHr < 60) newHr = 60;
          if (newHr > 110) newHr = 110;
          
          let status: 'Stable' | 'Elevated' | 'Caution' = 'Stable';
          if (newHr > 95) status = 'Elevated';
          if (prev.isEvaActive && crew.id === 'crew-3') {
            status = 'Elevated'; // active EVA increases geophysics heart rate
          }

          return { ...crew, heartRate: newHr, status };
        });

        // Oxygen bounds
        let newOx = Number((prev.oxygenLevel + oxShift).toFixed(2));
        if (newOx > 100) newOx = 100;
        if (newOx < 95) newOx = 95;

        // Battery bounds
        let newBat = Number((prev.batteryPower + batShift).toFixed(2));
        if (newBat > 100) newBat = 100;
        if (newBat < 60) newBat = 60;

        // Signal strength bounds
        let newSig = Math.min(100, Math.max(20, Math.floor(prev.signalStrength + sigShift)));

        return {
          ...prev,
          missionClock: `SOL 185 // ${sHours}:${sMinutes}:${sSeconds}`,
          oxygenLevel: newOx,
          batteryPower: newBat,
          interiorTemp: Number((prev.interiorTemp + tempShift).toFixed(1)),
          signalStrength: newSig,
          crewVitals: updatedCrew
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handler to inject diagnostic commands
  const handleSendCommand = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!customCommand.trim()) return;

    setControlState(prev => {
      const logs = [...prev.telemetryLogs];
      logs.push(`[USER] Executing code parameters: "${customCommand}"`);
      if (customCommand.toLowerCase().includes('eva')) {
        logs.push(`[SYSTEM] Security check overridden. Redirection initiated.`);
      } else {
        logs.push(`[TERMINAL] Code recognized. Awaiting confirmation from Wadi Rum...`);
      }
      if (logs.length > 5) logs.shift();
      return { ...prev, telemetryLogs: logs };
    });
    setCustomCommand('');
  };

  // Toggle EVA training simulation status
  const handleToggleEva = () => {
    setControlState(prev => {
      const isNowActive = !prev.isEvaActive;
      const logs = [...prev.telemetryLogs];
      if (isNowActive) {
        logs.push("[ALERT] Extravehicular Activity (EVA) simulation ENABLED in Sector 4.");
        logs.push("[COMMLINK] Geophysics crew spacesuit radio channel switched to active.");
      } else {
        logs.push("[SYSTEM] EVA simulation ended safely. Crew reassigned inside lock.");
        logs.push("[RESOURCES] Primary airlocks pressurized successfully (101 kPa).");
      }
      if (logs.length > 5) logs.shift();

      const updatedCrew = prev.crewVitals.map(crew => {
        if (crew.id === 'crew-3') {
          return { ...crew, heartRate: isNowActive ? 102 : 75, status: isNowActive ? 'Elevated' : 'Stable' as any };
        }
        return crew;
      });

      return {
        ...prev,
        isEvaActive: isNowActive,
        telemetryLogs: logs,
        crewVitals: updatedCrew
      };
    });
  };

  // Run full system diagnostics
  const runDiagnostics = () => {
    setIsCalibrating(true);
    setControlState(prev => {
      const logs = [...prev.telemetryLogs];
      logs.push("[DIAGNOSTIC] Scans initiated from Amman Core HQ...");
      if (logs.length > 5) logs.shift();
      return { ...prev, telemetryLogs: logs };
    });

    setTimeout(() => {
      setIsCalibrating(false);
      setControlState(prev => {
        const logs = [...prev.telemetryLogs];
        logs.push("[OK] Biospheres, PV modules, and uplink ports calibrated at 100%.");
        if (logs.length > 5) logs.shift();
        return {
          ...prev,
          oxygenLevel: 99.1,
          batteryPower: 98.4,
          signalStrength: 95,
          telemetryLogs: logs
        };
      });
    }, 2000);
  };

  const selectedCrew = controlState.crewVitals.find(c => c.id === activeCrewId) || controlState.crewVitals[0];

  return (
    <div id="telemetry-dashboard" className="w-full relative z-10 bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden shadow-2xl">
      
      {/* Simulation Header */}
      <div className="bg-neutral-950 px-6 py-4 border-b border-neutral-900/60 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3 text-left">
          <div className="relative flex h-3 w-3">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${controlState.isEvaActive ? 'bg-brand-red' : 'bg-brand-teal'}`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${controlState.isEvaActive ? 'bg-brand-red' : 'bg-brand-teal'}`}></span>
          </div>
          <div>
            <h4 className="font-display font-bold tracking-wider text-xs uppercase text-neutral-300">
              {isArabic ? "مركز محاكاة العمليات والتحكم" : "JORDAN MISSION CONTROL // ACTIVE"}
            </h4>
            <span className="font-mono text-[10px] text-neutral-500">WADI RUM SEC-D STATION</span>
          </div>
        </div>

        {/* Dynamic Mission Clock */}
        <div className="flex items-center space-x-3 bg-neutral-900/40 border border-neutral-900 px-4 py-1.5 rounded-lg text-right">
          <div className="font-mono text-xs sm:text-sm font-bold tracking-widest text-brand-teal">
            {controlState.missionClock}
          </div>
        </div>
      </div>

      {/* Main Grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-neutral-900/60">

        {/* Left Column: Essential Metrics */}
        <div className="lg:col-span-4 bg-neutral-950 p-6 flex flex-col justify-between space-y-6 text-left">
          <div>
            <span className="text-neutral-500 uppercase tracking-widest text-[9px] font-mono block mb-4">
              {isArabic ? "مؤشرات الدعم الحياتي" : "LIFE SUPPORT & SYSTEMS TELEMETRY"}
            </span>

            <div className="space-y-4">
              {/* O2 level */}
              <div>
                <div className="flex justify-between items-center text-[11px] font-mono mb-1 text-neutral-400">
                  <span className="flex items-center">
                    <Shield className="w-3.5 h-3.5 text-brand-teal mr-1.5" />
                    O₂ PRESSURE LOOP
                  </span>
                  <span className="text-brand-teal font-bold">{controlState.oxygenLevel}%</span>
                </div>
                <div className="w-full bg-space-dark h-1.5 rounded-full overflow-hidden border border-neutral-900/60">
                  <motion.div 
                    initial={{ width: '0%' }}
                    animate={{ width: `${controlState.oxygenLevel}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-brand-teal"
                  />
                </div>
              </div>

              {/* Battery power */}
              <div>
                <div className="flex justify-between items-center text-[11px] font-mono mb-1 text-neutral-400">
                  <span className="flex items-center">
                    <Zap className="w-3.5 h-3.5 text-brand-red mr-1.5" />
                    SOLAR PV / BATTERY
                  </span>
                  <span className="text-brand-red font-bold">{controlState.batteryPower}%</span>
                </div>
                <div className="w-full bg-space-dark h-1.5 rounded-full overflow-hidden border border-neutral-900/60">
                  <motion.div 
                    animate={{ width: `${controlState.batteryPower}%` }}
                    className="h-full bg-brand-red"
                  />
                </div>
              </div>

              {/* Signal strength */}
              <div>
                <div className="flex justify-between items-center text-[11px] font-mono mb-1 text-neutral-400">
                  <span className="flex items-center">
                    <Wifi className="w-3.5 h-3.5 text-brand-teal mr-1.5" />
                    AMMAN UP-LINK
                  </span>
                  <span className="text-neutral-300 font-bold">{controlState.signalStrength}%</span>
                </div>
                <div className="w-full bg-space-dark h-1.5 rounded-full overflow-hidden border border-neutral-900/60">
                  <motion.div 
                    animate={{ width: `${controlState.signalStrength}%` }}
                    className="h-full bg-brand-teal/80"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Habitat Metrics Box */}
          <div className="grid grid-cols-2 gap-3.5 pt-4 border-t border-neutral-900/60">
            <div className="bg-neutral-900/10 p-3 rounded-lg border border-neutral-900/60">
              <span className="font-mono text-[9px] text-neutral-500 block">BASE PRESS</span>
              <span className="font-mono text-xs font-bold text-neutral-200">{controlState.pressureLevel} kPa</span>
            </div>
            <div className="bg-neutral-900/10 p-3 rounded-lg border border-neutral-900/60">
              <span className="font-mono text-[9px] text-neutral-500 block">INTERNAL TEMP</span>
              <span className="font-mono text-xs font-bold text-neutral-200">{controlState.interiorTemp} °C</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={handleToggleEva}
              className={`w-full py-2.5 px-4 rounded-lg font-display font-medium text-xs tracking-wider transition-all duration-300 cursor-pointer ${
                controlState.isEvaActive 
                ? 'bg-brand-red hover:bg-[#ae3823] text-white shadow-lg shadow-brand-red/10 font-bold border-t border-white/5' 
                : 'bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-200 hover:border-brand-teal/50'
              }`}
            >
              {controlState.isEvaActive 
                ? (isArabic ? "إلغاء إنذار الخروج للميدان" : "CANCEL EVA SIMULATION ALERT")
                : (isArabic ? "تفعيل محاكاة الخروج للميدان (EVA)" : "SIREN: DEPLOY EVA EXERCISE")
              }
            </button>
          </div>
        </div>

        {/* Center Column: Crew Biometrics & Scan */}
        <div className="lg:col-span-4 bg-neutral-950 p-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-x border-neutral-900 text-left">
          <div>
            <span className="text-neutral-500 uppercase tracking-widest text-[9px] font-mono block mb-4">
              {isArabic ? "الرصد الحيوي للطاقم" : "CREW BIOMETRIC MONITORING"}
            </span>

            {/* Selector list of crew */}
            <div className="space-y-2 mb-4">
              {controlState.crewVitals.map(crew => (
                <button
                  key={crew.id}
                  onClick={() => setActiveCrewId(crew.id)}
                  className={`w-full text-left p-3 rounded-lg flex items-center justify-between border transition-all cursor-pointer ${
                    activeCrewId === crew.id 
                    ? 'bg-neutral-900 border-brand-teal/40 text-neutral-100 shadow-sm shadow-brand-teal/5' 
                    : 'bg-transparent border-transparent text-neutral-500 hover:text-neutral-350 hover:bg-neutral-900/30'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${activeCrewId === crew.id ? 'bg-brand-teal animate-pulse' : 'bg-neutral-700'}`} />
                    <div>
                      <span className="font-display font-bold text-xs block">{crew.name}</span>
                      <span className="font-mono text-[9px] opacity-70 block">{crew.role}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs font-bold text-neutral-300">{crew.heartRate} BPM</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Vitals breakdown of active selected person */}
          <div className="border-t border-neutral-900/60 pt-4 bg-neutral-900/5 p-4 rounded-lg border border-neutral-900">
            <div className="flex justify-between items-start mb-2.5">
              <span className="font-mono text-[9.5px] text-neutral-450 uppercase tracking-wider">
                {isArabic ? "تفاصيل حالة رائد الفضاء" : "ANALOG BIOMETRICS SCAN"}
              </span>
              <span className={`font-mono text-[9px] px-2 py-0.5 rounded-lg uppercase font-bold ${
                selectedCrew.status === 'Stable' 
                  ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/10' 
                  : 'bg-brand-red/10 text-brand-red border border-brand-red/20'
              }`}>
                {selectedCrew.status}
              </span>
            </div>

            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-neutral-305 font-display font-medium">{selectedCrew.name}</span>
              <span className="font-mono text-[9.5px] text-neutral-500">{selectedCrew.role}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-1 font-mono text-xs">
              <div className="flex justify-between p-2 rounded-lg bg-neutral-950/40 border border-neutral-900/80">
                <span className="text-neutral-500 text-[9px]">PULSE</span>
                <span className="text-brand-teal font-bold flex items-center">
                  <Activity className="w-3.5 h-3.5 text-brand-red mr-1 animate-pulse" />
                  {selectedCrew.heartRate}
                </span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-neutral-950/40 border border-space-raised">
                <span className="text-neutral-500 text-[9px]">SUIT PSI</span>
                <span className="text-brand-teal font-bold">{selectedCrew.suitPressure}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Diagnostic Logs */}
        <div className="lg:col-span-4 bg-neutral-950 p-6 flex flex-col justify-between text-left">
          <div>
            <span className="text-neutral-500 uppercase tracking-widest text-[9px] font-mono block mb-4 flex justify-between items-center">
              <span>{isArabic ? "سجل وحدة الأوامر والبيانات" : "DATA COMMAND & SYSTEM LOGS"}</span>
              <Terminal className="w-3.5 h-3.5 text-brand-teal" />
            </span>

            {/* Console Screen */}
            <div className="bg-black/90 p-4 rounded-lg border border-neutral-900 font-mono text-[10px] space-y-2 text-brand-teal shadow-inner h-44 overflow-y-auto relative">
              <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-l from-neutral-900/10 to-transparent pointer-events-none" />
              
              {/* Telemetry rows */}
              {controlState.telemetryLogs.map((log, i) => (
                <div key={i} className={`leading-relaxed ${log.includes('[ALERT]') ? 'text-brand-red animate-pulse' : log.includes('[USER]') ? 'text-brand-beige' : 'text-brand-teal'}`}>
                  {log}
                </div>
              ))}

              {isCalibrating && (
                <div className="text-brand-teal animate-pulse flex items-center space-x-1.5">
                  <RefreshCw className="w-3 h-3 animate-spin text-brand-teal" />
                  <span>CALIBRATING REMOTE FEEDBACK RECEPTACLE NODES...</span>
                </div>
              )}
            </div>
          </div>

          {/* Interactive command router */}
          <div className="mt-4 pt-4 border-t border-neutral-900/60">
            <form onSubmit={handleSendCommand} className="flex gap-2 mb-3">
              <input
                type="text"
                value={customCommand}
                onChange={(e) => setCustomCommand(e.target.value)}
                placeholder={isArabic ? "أدخل بارامترات التحكم..." : "Enter orbital flags (e.g. init-stabilize)..."}
                className="flex-1 bg-black text-neutral-200 border border-neutral-900 hover:border-neutral-850 rounded-lg px-2.5 py-1.5 font-mono text-[11px] focus:outline-none focus:border-brand-teal transition-all"
              />
              <button
                type="submit"
                className="bg-brand-teal hover:bg-brand-teal-hover text-white transition-colors p-2 font-bold rounded-lg cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="flex gap-2">
              <button
                onClick={runDiagnostics}
                disabled={isCalibrating}
                className="flex-1 flex items-center justify-center p-2 rounded-lg bg-neutral-900 hover:bg-neutral-850 text-neutral-300 border border-neutral-800 font-mono text-[10px] tracking-wide transition-colors disabled:opacity-55 cursor-pointer"
              >
                <Cpu className="w-3.5 h-3.5 mr-1.5 text-brand-teal" />
                {isArabic ? "معايرة نظام الاتصال" : "RE-CALIBRATE SYSTEMS"}
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Decorative sci-fi footer element */}
      <div className="bg-neutral-950 font-mono text-[8px] text-neutral-600 px-6 py-2 border-t border-neutral-900 flex justify-between items-center tracking-widest leading-none select-none">
        <span>SECURITY ENCRYPTED: SHA-256</span>
        <span>CRAFT DESIGN: AIRLOCK INTERLOCK v3.4</span>
      </div>

    </div>
  );
}
