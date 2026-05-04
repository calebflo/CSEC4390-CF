import { useState, useEffect, useRef } from "react"
import { useSimulation } from "../context/SimulationContext.jsx"

const MODULE = "01"

const DEFAULT_STEPS = [
  "[RECON]    Scraping FinsecCorp LinkedIn — harvesting employee names, titles, managers",
  "[OSINT]    Cross-referencing with public breach data — 847 credential pairs found",
  "[CRAFT]    LLM generating spear-phish: subject 'Urgent: DocuSign — Q4 Wire Authorization'",
  "[SPOOF]    Domain registered: finsec-corp-docs[.]com — visual clone of portal deployed",
  "[DELIVER]  Email delivered to vp.finance@finseccorp.com — bypassed SEG via HTML smuggling",
  "[CLICK]    Target opened attachment 14 min after delivery — EvilProxy AiTM intercept active",
  "[SESSION]  OAuth token harvested — MFA bypassed — mailbox access granted to threat actor",
  "[EXFIL]    2,400 emails exported — wire transfer templates, vendor ACH details extracted",
  "[IMPACT]   $1.2M fraudulent wire initiated — SWIFT GPI alert suppressed via mailbox rule",
]

const DEFENDED_STEPS = [
  "[RECON]    LinkedIn scrape attempted — OSINT monitoring alert fired to SOC",
  "[BLOCK]    SEG quarantined email — HTML smuggling pattern matched (CVE-2024-0137)",
  "[BLOCK]    Domain finsec-corp-docs[.]com flagged by DNS RPZ — 0 employees reached",
  "[DETECT]   Phishing simulation reported by 3 employees within 4 minutes",
  "[CONTROL]  FIDO2 hardware key required — AiTM token replay rejected",
  "[ALERT]    UEBA flagged anomalous OAuth grant attempt — auto-revoked",
  "[LOG]      Full attack chain recorded in SIEM — TTP mapped to T1566.001",
  "[OUTCOME]  Zero credential compromise — $0 financial loss — IOCs shared to ISAC",
]

const STATS = [
  { label: "Bypass Rate (No Controls)", value: "91%", color: "text-red-400" },
  { label: "Avg Time to Click", value: "14 min", color: "text-orange-400" },
  { label: "FinsecCorp Exposed Users", value: "847", color: "text-red-400" },
  { label: "MITRE Technique", value: "T1566", color: "text-cyan-400" },
]

export default function Module01() {
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
          <span className="text-xs font-mono text-red-400 border border-red-500/50 px-2 py-0.5 rounded">MODULE 01</span>
          <span className="text-xs font-mono text-red-400">SEVERITY: CRITICAL</span>
          <span className="text-xs font-mono text-gray-500">MITRE T1566 · OWASP LLM02</span>
        </div>
        <h1 className="text-2xl font-bold text-white font-mono">AI Phishing Lab</h1>
        <p className="text-sm text-gray-400 mt-1">LLM-generated spear-phishing campaign targeting FinsecCorp employees using harvested OSINT.</p>
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
          <div key={i} className={`mb-1 ${line.startsWith("[BLOCK]")||line.startsWith("[DETECT]")||line.startsWith("[CONTROL]")||line.startsWith("[ALERT]")||line.startsWith("[LOG]")||line.startsWith("[OUTCOME]") ? "text-green-400" : line.startsWith("[IMPACT]")||line.startsWith("[EXFIL]") ? "text-red-400" : "text-green-300"}`}>{line}</div>
        ))}
        {running && <span className="text-yellow-400 animate-pulse">█</span>}
      </div>
      <div className="border border-green-500/40 rounded p-4 bg-green-500/5">
        <h3 className="text-sm font-bold font-mono text-green-400 mb-3">DEFENSE PLAYBOOK</h3>
        <div className="space-y-2 text-sm text-gray-300 font-mono">
          <div>✦ Deploy FIDO2/WebAuthn hardware keys — eliminates AiTM token replay</div>
          <div>✦ Email security gateway with HTML smuggling detection (Defender + Proofpoint)</div>
          <div>✦ DNS Response Policy Zone blocking lookalike domains pre-delivery</div>
          <div>✦ UEBA anomaly detection on OAuth grants and mailbox delegation changes</div>
          <div>✦ Monthly phishing simulation via KnowBe4 targeting finance/C-suite personas</div>
        </div>
      </div>
    </div>
  )
}
