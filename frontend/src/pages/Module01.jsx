import { useState } from "react"
import ModuleHeader from "../components/ModuleHeader.jsx"
import StatCard     from "../components/StatCard.jsx"
import Terminal     from "../components/Terminal.jsx"
import DefenseBox   from "../components/DefenseBox.jsx"

export default function Module01() {
  const [lines, setLines]     = useState([])
  const [running, setRunning] = useState(false)
  const [defended, setDefended] = useState(false)

  const attackSteps = [
    "[RECON] Scanning FinsecCorp email infrastructure...",
    "[GENERATE] AI model crafting spear-phishing payload...",
    "[DELIVER] Phishing email sent — awaiting click...",
    "[EXPLOIT] ⚠ Credential harvested via fake login page",
    "[IMPACT] ⚠ Session token captured — MFA bypassed",
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
        num="01"
        title="AI Phishing Lab"
        subtitle="AI-generated spear-phishing simulation"
        badges={["CRITICAL","T1566","T1598"]}
      />
      <div style={{padding:"20px 24px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",
                     gap:12,marginBottom:16}}>
          <StatCard label="Detection Rate" value="3%" color="#ef4444"/>
          <StatCard label="Click Rate" value="34%" color="#f97316"/>
          <StatCard label="Sophistication" value="9.1" color="#eab308"/>
          <StatCard label="Time to Gen" value="1.4s" color="#06b6d4"/>
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