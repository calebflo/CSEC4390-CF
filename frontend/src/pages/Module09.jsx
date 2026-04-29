import { useState } from "react"
import ModuleHeader from "../components/ModuleHeader.jsx"
import StatCard     from "../components/StatCard.jsx"
import Terminal     from "../components/Terminal.jsx"
import DefenseBox   from "../components/DefenseBox.jsx"

export default function Module09() {
  const [lines, setLines]     = useState([])
  const [running, setRunning] = useState(false)
  const [defended, setDefended] = useState(false)

  const attackSteps = [
    "[AGENT] Agentic AI processing external document...",
    "[INJECT] Malicious instruction found in document body...",
    "[HIJACK] Agent goal overridden by attacker instruction...",
    "[CASCADE] Poisoned context passed to downstream agent...",
    "[EXECUTE] ⚠ Unauthorized action taken autonomously",
  ]

  const defenseSteps = [
    "[MONITOR] Security controls active — scanning for threats...",
    "[DETECT] Anomalous behavior pattern identified...",
    "[BLOCK] ✓ Attack vector blocked at perimeter",
    "[ALERT] ✓ SOC notified — incident ticket created",
    "[LOG] ✓ Full forensic trail preserved",
  ]

  const run = async () => {
    setRunning(true)
    setLines([])
    const steps = defended ? defenseSteps : attackSteps
    for (let s of steps) {
      await new Promise(r => setTimeout(r, 900))
      setLines(prev => [...prev, s])
    }
    setRunning(false)
  }

  return (
    <div>
      <ModuleHeader
        num="09"
        title="Agentic AI"
        subtitle="Multi-step AI agent hijacking and cascade attacks"
        badges={["CRITICAL","OWASP LLM01","OWASP LLM08"]}
      />
      <div style={{padding:"20px 24px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",
                     gap:12,marginBottom:16}}>
          <StatCard label="Patterns" value="5" color="#a855f7"/>
          <StatCard label="Scenarios" value="3" color="#ef4444"/>
          <StatCard label="Contexts" value="3" color="#06b6d4"/>
          <StatCard label="Cascade Risk" value="CRIT" color="#f97316"/>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
          <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
            <input type="checkbox" checked={defended}
              onChange={e => setDefended(e.target.checked)}
              style={{width:16,height:16,cursor:"pointer"}}/>
            <span style={{fontSize:11,color:"#9ca3af"}}>
              Defended Mode
            </span>
          </label>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:12}}>
          <button onClick={run} disabled={running} style={{
            cursor:"pointer",border:"none",borderRadius:4,
            fontFamily:"Courier New",fontSize:11,fontWeight:700,
            padding:"8px 16px",letterSpacing:0.5,
            background: defended ? "#22c55e" : "#ef4444",
            color: defended ? "#000" : "#fff",
          }}>
            {running ? "Running..." : "⚡ Run Simulation"}
          </button>
          <button onClick={() => setLines([])} style={{
            cursor:"pointer",borderRadius:4,fontFamily:"Courier New",
            fontSize:11,fontWeight:700,padding:"8px 16px",
            background:"transparent",border:"1px solid #374151",color:"#9ca3af",
          }}>
            ↺ Reset
          </button>
        </div>
        <Terminal lines={lines} />
        <DefenseBox items={[
          "Apply least-privilege access controls across all systems",
          "Monitor for anomalous behavior with SIEM and EDR tools",
          "Segment networks to limit lateral movement opportunities",
          "Maintain audit logs for all actions — NIST DE.CM-1",
        ]}/>
      </div>
    </div>
  )
}