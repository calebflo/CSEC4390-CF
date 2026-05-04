import { useState, useEffect, useRef } from "react"
import { useSimulation } from "../context/SimulationContext.jsx"

const MODULE = "03"

const DEFAULT_STEPS = [
  "[INITIAL]  Malicious macro in 'FinsecCorp_Q4_Projections.xlsm' executed by analyst",
  "[DROPPER]  Cobalt Strike beacon dropped to %APPDATA%\\WindowsUpdate.exe — persistence via Run key",
  "[C2]       Beacon checks in to 185.220.101[.]47 over HTTPS — mimics legitimate traffic",
  "[LATERAL]  Pass-the-hash using lsass dump — domain admin hash extracted in 8 minutes",
  "[RECON]    ADRecon mapping shares: \\\\FINSEC-FS01\\Finance — 2.1TB sensitive data located",
  "[SHADOW]   VSS delete: vssadmin delete shadows /all /quiet — backups wiped",
  "[ENCRYPT]  BlackCat/ALPHV encrypting with ChaCha20 — 847 workstations, 12 servers",
  "[RANSOM]   Wallpaper changed — ransom note: $4.8M in Monero within 72 hours",
  "[IMPACT]   FinsecCorp operations halted — wire transfers, trading systems offline 19 hours",
]

const DEFENDED_STEPS = [
  "[INITIAL]  Macro execution blocked by ASR rule: Block Office macros from Win32 API calls",
  "[BLOCK]    EDR behavioral engine flagged process injection within 3 seconds — killed",
  "[DETECT]   Beacon DNS query matched threat intel IOC — DNS sinkholed by resolver",
  "[BLOCK]    Credential access blocked — lsass protection (PPL) active, hash extraction failed",
  "[CONTROL]  Network segmentation — finance file server unreachable from analyst subnet",
  "[PROTECT]  VSS deletion attempt blocked — shadow copies preserved via tamper protection",
  "[BLOCK]    Ransomware encryption halted by canary file trigger — EDR quarantined process",
  "[LOG]      Full attack chain in SIEM — IR team engaged within 4 minutes of initial alert",
  "[OUTCOME]  Contained to 1 workstation — RTO: 45 minutes — $0 ransom paid",
]

const STATS = [
  { label: "Avg Dwell Time (No EDR)", value: "21 days", color: "text-red-400" },
  { label: "Ransom Demand", value: "$4.8M", color: "text-red-400" },
  { label: "Systems Encrypted", value: "859", color: "text-orange-400" },
  { label: "MITRE Technique", value: "T1486", color: "text-cyan-400" },
]

export default function Module03() {
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
      <div className="border border-red-500/40 rounded p-4 bg-red-500/5">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-xs font-mono text-red-400 border border-red-500/50 px-2 py-0.5 rounded">MODULE 03</span>
          <span className="text-xs font-mono text-red-400">SEVERITY: CRITICAL</span>
          <span className="text-xs font-mono text-gray-500">MITRE T1486 · T1059.001</span>
        </div>
        <h1 className="text-2xl font-bold text-white font-mono">Ransomware Chain</h1>
        <p className="text-sm text-gray-400 mt-1">8-step BlackCat/ALPHV ransomware kill chain from initial macro to full FinsecCorp encryption.</p>
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
        <button onClick={runSim} disabled={running} className="px-5 py-2 bg-red-600 hover:bg-red-500 disabled:bg-gray-700 disabled:text-gray-500 text-white text-sm font-mono rounded transition-colors">
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
          <div key={i} className={`mb-1 ${line.startsWith("[BLOCK]")||line.startsWith("[DETECT]")||line.startsWith("[CONTROL]")||line.startsWith("[PROTECT]")||line.startsWith("[LOG]")||line.startsWith("[OUTCOME]") ? "text-green-400" : line.startsWith("[IMPACT]")||line.startsWith("[ENCRYPT]")||line.startsWith("[RANSOM]") ? "text-red-400" : "text-green-300"}`}>{line}</div>
        ))}
        {running && <span className="text-yellow-400 animate-pulse">█</span>}
      </div>
      <div className="border border-green-500/40 rounded p-4 bg-green-500/5">
        <h3 className="text-sm font-bold font-mono text-green-400 mb-3">DEFENSE PLAYBOOK</h3>
        <div className="space-y-2 text-sm text-gray-300 font-mono">
          <div>✦ ASR rules — block macro execution, process injection, credential dumping</div>
          <div>✦ EDR with behavioral AI — detect C2 beacon patterns within seconds</div>
          <div>✦ Local Administrator Password Solution (LAPS) — prevents lateral hash reuse</div>
          <div>✦ Immutable backups — 3-2-1 with air-gapped copy; VSS tamper protection</div>
          <div>✦ Network microsegmentation — finance servers isolated from user workstations</div>
        </div>
      </div>
    </div>
  )
}
