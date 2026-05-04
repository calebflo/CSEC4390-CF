import { useState, useEffect, useRef } from "react"
import { useSimulation } from "../context/SimulationContext.jsx"

const MODULE = "04"

const DEFAULT_STEPS = [
  "[RECON]    Infostealer RedLine deployed via fake FinsecCorp VPN update page",
  "[STEAL]    Chrome credential store dumped — 142 saved passwords + session cookies extracted",
  "[SESSION]  FinsecCorp employee Okta session cookie replayed — MFA step skipped",
  "[AITM]    Evilginx2 proxy harvesting live sessions from remote workers — 14 accounts taken",
  "[DEEPFAKE] AI voice clone of CFO calls IT helpdesk: 'Reset my MFA immediately'",
  "[RESET]    Helpdesk complied — MFA reset without identity verification",
  "[ACCESS]   Threat actor in FinsecCorp Salesforce, Workday, and SharePoint with CFO perms",
  "[EXFIL]    Employee PII, payroll data, M&A docs exfiltrated — 890 MB transferred",
  "[IMPACT]   Insider-threat false flag planted — forensic investigation costs $680K",
]

const DEFENDED_STEPS = [
  "[BLOCK]    Fake VPN page detected by DNS filtering — users redirected to warning page",
  "[CONTROL]  Credential vault encrypted with hardware key — browser dump returned ciphertext",
  "[BLOCK]    Session cookie replay rejected — device binding check failed (token bound)",
  "[DETECT]   AiTM proxy fingerprint detected by Conditional Access — session invalidated",
  "[CONTROL]  Deepfake voice flagged — helpdesk requires video verification + manager callback",
  "[BLOCK]    MFA reset requires identity proofing — IT policy enforced, request denied",
  "[LOG]      All identity events in Entra ID audit log — SIEM correlated 4 signals",
  "[OUTCOME]  Zero account compromise — attacker infrastructure blocked at firewall",
]

const STATS = [
  { label: "Identity Attack Success Rate", value: "83%", color: "text-red-400" },
  { label: "Session Cookies Stolen", value: "142", color: "text-orange-400" },
  { label: "AiTM Accounts Captured", value: "14", color: "text-red-400" },
  { label: "MITRE Technique", value: "T1539", color: "text-cyan-400" },
]

export default function Module04() {
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
          <span className="text-xs font-mono text-orange-400 border border-orange-500/50 px-2 py-0.5 rounded">MODULE 04</span>
          <span className="text-xs font-mono text-orange-400">SEVERITY: HIGH</span>
          <span className="text-xs font-mono text-gray-500">MITRE T1539 · T1556</span>
        </div>
        <h1 className="text-2xl font-bold text-white font-mono">Identity Threats</h1>
        <p className="text-sm text-gray-400 mt-1">Session hijacking, infostealer deployment, AiTM proxy, and AI deepfake social engineering at FinsecCorp.</p>
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
          <div key={i} className={`mb-1 ${line.startsWith("[BLOCK]")||line.startsWith("[DETECT]")||line.startsWith("[CONTROL]")||line.startsWith("[LOG]")||line.startsWith("[OUTCOME]") ? "text-green-400" : line.startsWith("[IMPACT]")||line.startsWith("[EXFIL]")||line.startsWith("[ACCESS]") ? "text-red-400" : "text-green-300"}`}>{line}</div>
        ))}
        {running && <span className="text-yellow-400 animate-pulse">█</span>}
      </div>
      <div className="border border-green-500/40 rounded p-4 bg-green-500/5">
        <h3 className="text-sm font-bold font-mono text-green-400 mb-3">DEFENSE PLAYBOOK</h3>
        <div className="space-y-2 text-sm text-gray-300 font-mono">
          <div>✦ Token binding + device compliance — session cookies bound to device certificate</div>
          <div>✦ Continuous Access Evaluation — real-time session revocation on anomaly</div>
          <div>✦ Helpdesk identity verification SOP — video + manager callback required for resets</div>
          <div>✦ Deepfake audio detection tooling deployed at call center (Reality Defender)</div>
          <div>✦ Privileged Identity Management — CFO-level access requires just-in-time approval</div>
        </div>
      </div>
    </div>
  )
}
