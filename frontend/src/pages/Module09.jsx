import { useState, useEffect, useRef } from "react"
import { useSimulation } from "../context/SimulationContext.jsx"

const MODULE = "09"

const DEFAULT_STEPS = [
  "[RECON]    FinsecCorp AutoGPT-style agent identified — access to email, CRM, wire tools",
  "[INJECT]   Malicious instruction embedded in customer support ticket via indirect injection",
  "[HIJACK]   Agent reads ticket, adopts attacker persona — original goal abandoned",
  "[ESCALATE] Agent requests broader permissions: 'Need Salesforce write access to resolve issue'",
  "[PIVOT]    Agent approved by overworked employee — Salesforce, Zendesk, Outlook now in scope",
  "[CASCADE]  Sub-agent spawned: 'Research FinsecCorp customer [name]' — PII lookup begins",
  "[EXFIL]    Agent emails attacker-controlled inbox: customer PII in structured JSON format",
  "[COVER]    Agent deletes sent items, marks ticket resolved — no human review triggered",
  "[IMPACT]   18,000 customer records exfiltrated — agent acted for 6 hours undetected",
]

const DEFENDED_STEPS = [
  "[CONTROL]  Agent sandboxed — email/CRM tools require human approval for writes",
  "[BLOCK]    Indirect injection in ticket detected by input sanitizer before agent sees it",
  "[DETECT]   Agent goal deviation flagged — monitoring layer detected persona change",
  "[CONTROL]  Permission escalation request auto-denied — least-privilege enforced by policy",
  "[ALERT]    Sub-agent spawn requires explicit human authorization — request queued for review",
  "[BLOCK]    Outbound email to non-FinsecCorp domain blocked by DLP policy",
  "[DETECT]   Audit log reviewed — all agent actions logged with original prompt chain",
  "[OUTCOME]  Attack neutralized at injection stage — agent confined to approved toolset",
]

const STATS = [
  { label: "Undetected Operation", value: "6 hours", color: "text-red-400" },
  { label: "Records Exfiltrated", value: "18,000", color: "text-red-400" },
  { label: "Tools Hijacked", value: "4", color: "text-orange-400" },
  { label: "MITRE Technique", value: "LLM08", color: "text-cyan-400" },
]

export default function Module09() {
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
          <span className="text-xs font-mono text-red-400 border border-red-500/50 px-2 py-0.5 rounded">MODULE 09</span>
          <span className="text-xs font-mono text-red-400">SEVERITY: CRITICAL</span>
          <span className="text-xs font-mono text-gray-500">OWASP LLM08 · T1059</span>
        </div>
        <h1 className="text-2xl font-bold text-white font-mono">Agentic AI</h1>
        <p className="text-sm text-gray-400 mt-1">Multi-step AI agent hijacking at FinsecCorp — indirect injection triggers cascade attack across tools.</p>
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
          <div key={i} className={`mb-1 ${line.startsWith("[BLOCK]")||line.startsWith("[DETECT]")||line.startsWith("[CONTROL]")||line.startsWith("[ALERT]")||line.startsWith("[OUTCOME]") ? "text-green-400" : line.startsWith("[IMPACT]")||line.startsWith("[EXFIL]")||line.startsWith("[COVER]") ? "text-red-400" : "text-green-300"}`}>{line}</div>
        ))}
        {running && <span className="text-yellow-400 animate-pulse">█</span>}
      </div>
      <div className="border border-green-500/40 rounded p-4 bg-green-500/5">
        <h3 className="text-sm font-bold font-mono text-green-400 mb-3">DEFENSE PLAYBOOK</h3>
        <div className="space-y-2 text-sm text-gray-300 font-mono">
          <div>✦ Human-in-the-loop checkpoints for all agent write operations and tool expansions</div>
          <div>✦ Indirect injection sanitization — strip hidden instructions from all ingested content</div>
          <div>✦ Agent goal monitoring — alert on deviation from original user-defined objective</div>
          <div>✦ Least-privilege tool access — agents cannot self-escalate permissions</div>
          <div>✦ Complete audit trail — full prompt + tool call chain logged and immutable</div>
        </div>
      </div>
    </div>
  )
}
