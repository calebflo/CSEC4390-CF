import { useState, useEffect, useRef } from "react"
import { useSimulation } from "../context/SimulationContext.jsx"

const MODULE = "06"

const DEFAULT_STEPS = [
  "[SCAN]     Shodan query: org:'FinsecCorp' — 8 internet-exposed IoT devices found",
  "[TARGET]   Hikvision IP camera at lobby (CVE-2021-36260) — unauthenticated RCE",
  "[EXPLOIT]  Command injection via ISAPI endpoint — root shell on camera firmware",
  "[PIVOT]    Camera on VLAN 10 — ARP spoofing bridges to corporate VLAN 20",
  "[CREDS]    Axis printer default credentials (admin/admin) — print job history accessed",
  "[LATERAL]  HVAC controller Modbus port 502 exposed — building automation network reached",
  "[PERSIST]  Malicious firmware flashed to camera — survives factory reset, C2 maintained",
  "[EXFIL]    Lobby camera live feed exfiltrated — badge reader logs show employee schedules",
  "[IMPACT]   Physical security intelligence sold — targeted office break-in planned",
]

const DEFENDED_STEPS = [
  "[SCAN]     Shodan exposure alert — ASM platform detected internet-facing camera in 2 hours",
  "[PATCH]    CVE-2021-36260 patched via firmware update pushed by MDM for IoT",
  "[SEGMENT]  IoT VLAN fully isolated — no routing to corporate VLAN (ACL enforced)",
  "[HARDEN]   Default credentials rotated — printer admin access requires AD authentication",
  "[CONTROL]  Modbus port 502 blocked at industrial firewall — OT/IT boundary enforced",
  "[DETECT]   Firmware integrity check failed — tampered device quarantined automatically",
  "[MONITOR]  Network traffic analysis (Claroty) flagged anomalous camera egress",
  "[OUTCOME]  Attack contained to IoT VLAN — zero corporate network access achieved",
]

const STATS = [
  { label: "Exposed IoT Devices", value: "8", color: "text-red-400" },
  { label: "Devices with Default Creds", value: "3", color: "text-red-400" },
  { label: "CVEs Exploitable", value: "5", color: "text-orange-400" },
  { label: "MITRE Technique", value: "T1078", color: "text-cyan-400" },
]

export default function Module06() {
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
          <span className="text-xs font-mono text-orange-400 border border-orange-500/50 px-2 py-0.5 rounded">MODULE 06</span>
          <span className="text-xs font-mono text-orange-400">SEVERITY: HIGH</span>
          <span className="text-xs font-mono text-gray-500">MITRE T1078 · CVE-2021-36260</span>
        </div>
        <h1 className="text-2xl font-bold text-white font-mono">IoT Attack Mapper</h1>
        <p className="text-sm text-gray-400 mt-1">8-branch IoT device compromise at FinsecCorp HQ — camera to corporate LAN pivot.</p>
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
          <div key={i} className={`mb-1 ${line.startsWith("[BLOCK]")||line.startsWith("[DETECT]")||line.startsWith("[SEGMENT]")||line.startsWith("[HARDEN]")||line.startsWith("[CONTROL]")||line.startsWith("[MONITOR]")||line.startsWith("[PATCH]")||line.startsWith("[OUTCOME]") ? "text-green-400" : line.startsWith("[IMPACT]")||line.startsWith("[EXFIL]")||line.startsWith("[PERSIST]") ? "text-red-400" : "text-green-300"}`}>{line}</div>
        ))}
        {running && <span className="text-yellow-400 animate-pulse">█</span>}
      </div>
      <div className="border border-green-500/40 rounded p-4 bg-green-500/5">
        <h3 className="text-sm font-bold font-mono text-green-400 mb-3">DEFENSE PLAYBOOK</h3>
        <div className="space-y-2 text-sm text-gray-300 font-mono">
          <div>✦ IoT VLAN isolation — dedicated segment with no routing to corporate network</div>
          <div>✦ Attack Surface Management (ASM) — continuous Shodan-equivalent scanning</div>
          <div>✦ Firmware integrity verification — signed updates, tamper detection at boot</div>
          <div>✦ Default credential policy — automated scan + enforcement before deployment</div>
          <div>✦ OT/ICS firewall — Modbus, BACnet, and Profinet blocked at IT/OT boundary</div>
        </div>
      </div>
    </div>
  )
}
