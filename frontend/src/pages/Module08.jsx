import { useState, useEffect, useRef } from "react"
import { useSimulation } from "../context/SimulationContext.jsx"

const MODULE = "08"

const DEFAULT_STEPS = [
  "[RECON]    FinsecCorp employees using Fitbit, Apple Watch, and WHOOP tracked via BLE",
  "[CAPTURE]  Passive BLE sniffer (Ubertooth One) deployed in lobby — beacon data collected",
  "[EXTRACT]  Garmin device BLE pairing sniffed — heart rate, GPS coordinates, sleep data",
  "[CLOUD]    Garmin Connect API credential stuffing — 847 FinsecCorp employee accounts hit",
  "[ACCESS]   Garmin health vault breach: 1.2M biometric records exposed including executives",
  "[CORRELATE] Sleep disruption + stress metrics predict financial announcement timing",
  "[DARKWEB]  Biometric dataset listed on BreachForums: $0.87/record — 1.2M records",
  "[RANSOM]   Attacker contacts CEO: pay $500K or biometrics + location history published",
  "[IMPACT]   HIPAA-adjacent privacy breach — $3.2M regulatory fine exposure for FinsecCorp",
]

const DEFENDED_STEPS = [
  "[POLICY]   FinsecCorp BYOD policy prohibits syncing wearables on corporate Wi-Fi",
  "[DETECT]   BLE scanning alert — Kismet sensor in lobby flagged Ubertooth signature",
  "[CONTROL]  Employee awareness: wearables on personal hotspot only in sensitive areas",
  "[HARDEN]   API credential stuffing blocked — rate limiting + anomaly detection on logins",
  "[ALERT]    BreachForums monitoring — data broker alert fired within 48 hours of listing",
  "[CONTAIN]  Exposed accounts invalidated — forced re-enrollment with breach notification",
  "[LOG]      DLP policy flags biometric-adjacent data in email/Slack — no exfil occurred",
  "[OUTCOME]  No FinsecCorp system breach — employee education + vendor hardening sufficient",
]

const STATS = [
  { label: "Employees Tracked via BLE", value: "847", color: "text-orange-400" },
  { label: "Biometric Records Leaked", value: "1.2M", color: "text-red-400" },
  { label: "Dark Web Price/Record", value: "$0.87", color: "text-orange-400" },
  { label: "MITRE Technique", value: "T1040", color: "text-cyan-400" },
]

export default function Module08() {
  const { pending, setPending } = useSimulation()
  const [output, setOutput] = useState([])
  const [running, setRunning] = useState(false)
  const [defended, setDefended] = useState(false)
  const [simData, setSimData] = useState(null)
  const termRef = useRef(null)

  useEffect(() => {
    if (pending?.module === MODULE) {
      setSimData({ title: pending.title, steps: pending.steps })
      setPending(null)
      setOutput([])
      setRunning(false)
      setDefended(false)
    }
  }, [pending, setPending])

  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight
  }, [output])

  function runSim() {
    const steps = simData?.steps ?? (defended ? DEFENDED_STEPS : DEFAULT_STEPS)
    setOutput([])
    setRunning(true)
    steps.forEach((line, i) => {
      setTimeout(() => {
        setOutput(prev => [...prev, line])
        if (i === steps.length - 1) setRunning(false)
      }, i * 700)
    })
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="border border-orange-500/40 rounded p-4 bg-orange-500/5">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-xs font-mono text-orange-400 border border-orange-500/50 px-2 py-0.5 rounded">MODULE 08</span>
          <span className="text-xs font-mono text-orange-400">SEVERITY: HIGH</span>
          <span className="text-xs font-mono text-gray-500">MITRE T1040 · T1596</span>
        </div>
        <h1 className="text-2xl font-bold text-white font-mono">Wearable Biometrics</h1>
        <p className="text-sm text-gray-400 mt-1">BLE interception, cloud breach, and dark web sale of FinsecCorp employee biometric data.</p>
        {simData && (
          <div className="mt-2 text-xs font-mono text-yellow-400 border border-yellow-500/30 bg-yellow-500/5 px-3 py-1.5 rounded">
            ⚡ Moltbook threat loaded: "{simData.title}"
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {STATS.map(s => (
          <div key={s.label} className="border border-gray-700 rounded p-3 bg-gray-900/50">
            <div className={`text-xl font-bold font-mono ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <button onClick={runSim} disabled={running} className="px-5 py-2 bg-orange-600 hover:bg-orange-500 disabled:bg-gray-700 disabled:text-gray-500 text-white text-sm font-mono rounded transition-colors">
          {running ? "▶ RUNNING..." : "▶ RUN SIMULATION"}
        </button>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <div onClick={() => { setDefended(d => !d); setOutput([]); setSimData(null) }} className={`w-10 h-5 rounded-full transition-colors ${defended ? "bg-green-600" : "bg-gray-600"}`}>
            <div className={`w-4 h-4 mt-0.5 rounded-full bg-white transition-transform ${defended ? "translate-x-5 ml-0.5" : "translate-x-0.5"}`} />
          </div>
          <span className="text-sm font-mono text-gray-300">Defended Mode</span>
        </label>
      </div>
      <div ref={termRef} className="bg-black border border-gray-700 rounded p-4 h-64 overflow-y-auto font-mono text-sm">
        {output.length === 0 && !running && <span className="text-gray-600">$ awaiting simulation run...</span>}
        {output.map((line, i) => (
          <div key={i} className={`mb-1 ${line.startsWith("[BLOCK]")||line.startsWith("[DETECT]")||line.startsWith("[POLICY]")||line.startsWith("[HARDEN]")||line.startsWith("[CONTROL]")||line.startsWith("[CONTAIN]")||line.startsWith("[ALERT]")||line.startsWith("[LOG]")||line.startsWith("[OUTCOME]") ? "text-green-400" : line.startsWith("[IMPACT]")||line.startsWith("[RANSOM]")||line.startsWith("[DARKWEB]") ? "text-red-400" : "text-green-300"}`}>{line}</div>
        ))}
        {running && <span className="text-yellow-400 animate-pulse">█</span>}
      </div>
      <div className="border border-green-500/40 rounded p-4 bg-green-500/5">
        <h3 className="text-sm font-bold font-mono text-green-400 mb-3">DEFENSE PLAYBOOK</h3>
        <div className="space-y-2 text-sm text-gray-300 font-mono">
          <div>✦ BYOD policy — wearables prohibited on corporate network; personal hotspot required</div>
          <div>✦ BLE scanning detection — Kismet/Kismon sensors in sensitive areas</div>
          <div>✦ Third-party vendor risk — wearable cloud providers assessed in annual audit</div>
          <div>✦ Dark web monitoring — BreachForums and Telegram channel alerting (Recorded Future)</div>
          <div>✦ Employee awareness training on biometric data risks — quarterly for executives</div>
        </div>
      </div>
    </div>
  )
}
