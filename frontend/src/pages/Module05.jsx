import { useState, useEffect, useRef } from "react"
import { useSimulation } from "../context/SimulationContext.jsx"

const MODULE = "05"

const DEFAULT_STEPS = [
  "[RECON]    FinsecCorp SBOM analyzed — 1,847 npm/PyPI dependencies mapped",
  "[TARGET]   Maintainer of 'finsec-utils' package social-engineered — credentials phished",
  "[INJECT]   Malicious version 3.2.1 published — postinstall script added to package.json",
  "[SPREAD]   CI/CD pipeline pulled poisoned package — 14 FinsecCorp microservices infected",
  "[LOG4J]    Legacy loan processing server running Log4j 2.14 — CVE-2022-44228 exploited",
  "[JNDI]    JNDI LDAP callback executes — reverse shell to attacker C2 established",
  "[PIVOT]    From loan server, attacker reaches core banking API — auth token harvested",
  "[EXFIL]   Transaction logs, 92,000 customer account records extracted over 6 days",
  "[IMPACT]   Supply chain breach affects 3 downstream fintech partners — systemic risk",
]

const DEFENDED_STEPS = [
  "[SCAN]     Dependabot flagged 23 HIGH CVEs in current lockfile — PRs auto-generated",
  "[BLOCK]    Package signing verified — finsec-utils 3.2.1 signature mismatch, rejected",
  "[CONTROL]  CI/CD pipeline runs in ephemeral sandbox — postinstall scripts disallowed",
  "[DETECT]   SBOM diff alert — unexpected new dependency flagged before deploy",
  "[BLOCK]    Log4j patched to 2.17.1 via automated patch management — JNDI disabled",
  "[DETECT]   Outbound LDAP/RMI connection blocked by egress filtering — alert fired",
  "[CONTROL]  Zero-trust API gateway — core banking requires mTLS + SPIFFE identity",
  "[OUTCOME]  Supply chain attack neutralized at build stage — 0 customer records exposed",
]

const STATS = [
  { label: "Dependencies Mapped", value: "1,847", color: "text-orange-400" },
  { label: "High/Critical CVEs Found", value: "23", color: "text-red-400" },
  { label: "Partners at Risk", value: "3", color: "text-orange-400" },
  { label: "MITRE Technique", value: "T1195", color: "text-cyan-400" },
]

export default function Module05() {
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
          <span className="text-xs font-mono text-orange-400 border border-orange-500/50 px-2 py-0.5 rounded">MODULE 05</span>
          <span className="text-xs font-mono text-orange-400">SEVERITY: HIGH</span>
          <span className="text-xs font-mono text-gray-500">MITRE T1195 · CVE-2022-44228</span>
        </div>
        <h1 className="text-2xl font-bold text-white font-mono">Supply Chain</h1>
        <p className="text-sm text-gray-400 mt-1">Dependency poisoning and Log4Shell exploitation through FinsecCorp's software supply chain.</p>
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
          <div key={i} className={`mb-1 ${line.startsWith("[BLOCK]")||line.startsWith("[DETECT]")||line.startsWith("[SCAN]")||line.startsWith("[CONTROL]")||line.startsWith("[OUTCOME]") ? "text-green-400" : line.startsWith("[IMPACT]")||line.startsWith("[EXFIL]")||line.startsWith("[JNDI]") ? "text-red-400" : "text-green-300"}`}>{line}</div>
        ))}
        {running && <span className="text-yellow-400 animate-pulse">█</span>}
      </div>
      <div className="border border-green-500/40 rounded p-4 bg-green-500/5">
        <h3 className="text-sm font-bold font-mono text-green-400 mb-3">DEFENSE PLAYBOOK</h3>
        <div className="space-y-2 text-sm text-gray-300 font-mono">
          <div>✦ SBOM generation at build time — track all transitive dependencies</div>
          <div>✦ Package signing enforcement — Sigstore/cosign for npm and PyPI artifacts</div>
          <div>✦ Automated vulnerability scanning in CI — Snyk, Dependabot, OWASP Dependency-Check</div>
          <div>✦ Egress filtering blocks JNDI LDAP callbacks — Log4Shell class of attacks</div>
          <div>✦ mTLS + SPIFFE workload identity — service-to-service zero-trust auth</div>
        </div>
      </div>
    </div>
  )
}
