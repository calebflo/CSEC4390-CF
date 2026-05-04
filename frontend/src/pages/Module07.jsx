import { useState, useEffect, useRef } from "react"
import { useSimulation } from "../context/SimulationContext.jsx"

const MODULE = "07"

const DEFAULT_STEPS = [
  "[RECON]    FinsecCorp CISO identified on LinkedIn — home address via voter records OSINT",
  "[TARGET]   CISO home network: Nest thermostat, Ring doorbell, Eero mesh — all internet-exposed",
  "[EXPLOIT]  Eero firmware CVE-2023-3079 — unauthenticated LAN access via IPv6 link-local",
  "[PIVOT]    Home network compromised — FinsecCorp corporate VPN client on CISO MacBook found",
  "[CAPTURE]  VPN certificate extracted from Keychain — split tunnel config reveals corp subnets",
  "[CONNECT]  Attacker connects to FinsecCorp VPN using stolen cert + cloned device fingerprint",
  "[ACCESS]   Inside corporate network as CISO — Confluence, Jira, AWS console accessible",
  "[EXFIL]   IR playbooks, red team reports, AWS IAM keys extracted — 3.4 GB in 90 minutes",
  "[IMPACT]   FinsecCorp entire security posture exposed — $11M remediation cost estimated",
]

const DEFENDED_STEPS = [
  "[RECON]    OSINT monitoring service flagged CISO personal data in broker databases",
  "[HARDEN]   VPN requires certificate + FIDO2 hardware key — cert alone insufficient",
  "[CONTROL]  Device posture check — personal Mac fails MDM enrollment check, VPN denied",
  "[DETECT]   UEBA flagged VPN login from new device fingerprint at 2:47 AM — SOC alerted",
  "[BLOCK]    Conditional Access requires compliant device — session terminated immediately",
  "[CONTROL]  AWS IAM requires MFA + IP allowlist — console access denied from home IP",
  "[LOG]      Full telemetry in SIEM — impossible travel alert fired (home + office same hour)",
  "[OUTCOME]  Lateral movement blocked — CISO notified, VPN certificate revoked and reissued",
]

const STATS = [
  { label: "Home IoT Entry Points", value: "6", color: "text-red-400" },
  { label: "Lateral Move Time", value: "~22 min", color: "text-orange-400" },
  { label: "Data Exfiltrated", value: "3.4 GB", color: "text-red-400" },
  { label: "MITRE Technique", value: "T1133", color: "text-cyan-400" },
]

export default function Module07() {
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
          <span className="text-xs font-mono text-red-400 border border-red-500/50 px-2 py-0.5 rounded">MODULE 07</span>
          <span className="text-xs font-mono text-red-400">SEVERITY: CRITICAL</span>
          <span className="text-xs font-mono text-gray-500">MITRE T1133 · T1078.002</span>
        </div>
        <h1 className="text-2xl font-bold text-white font-mono">Smart Home Pivot</h1>
        <p className="text-sm text-gray-400 mt-1">Home IoT compromise of CISO's network pivoting through corporate VPN to FinsecCorp systems.</p>
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
          <div key={i} className={`mb-1 ${line.startsWith("[BLOCK]")||line.startsWith("[DETECT]")||line.startsWith("[HARDEN]")||line.startsWith("[CONTROL]")||line.startsWith("[LOG]")||line.startsWith("[OUTCOME]") ? "text-green-400" : line.startsWith("[IMPACT]")||line.startsWith("[EXFIL]")||line.startsWith("[ACCESS]") ? "text-red-400" : "text-green-300"}`}>{line}</div>
        ))}
        {running && <span className="text-yellow-400 animate-pulse">█</span>}
      </div>
      <div className="border border-green-500/40 rounded p-4 bg-green-500/5">
        <h3 className="text-sm font-bold font-mono text-green-400 mb-3">DEFENSE PLAYBOOK</h3>
        <div className="space-y-2 text-sm text-gray-300 font-mono">
          <div>✦ VPN requires cert + FIDO2 hardware key — stolen cert alone cannot authenticate</div>
          <div>✦ Device compliance enforcement — MDM enrollment required before VPN grant</div>
          <div>✦ UEBA impossible travel + new device fingerprint alerts for privileged accounts</div>
          <div>✦ Executive cyber hygiene program — home network audit + patching for C-suite</div>
          <div>✦ Zero-trust network access (ZTNA) replaces VPN — per-app access, not full tunnel</div>
        </div>
      </div>
    </div>
  )
}
