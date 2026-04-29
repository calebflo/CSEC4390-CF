import { useState } from "react"
import ModuleHeader from "../components/ModuleHeader.jsx"
import StatCard     from "../components/StatCard.jsx"
import Terminal     from "../components/Terminal.jsx"
import DefenseBox   from "../components/DefenseBox.jsx"

export default function Module08() {
  const [lines, setLines]     = useState([])
  const [running, setRunning] = useState(false)
  const [defended, setDefended] = useState(false)

  const attackSteps = [
    "[SCAN] BLE scan — Vitality Watch detected at -67dBm...",
    "[EXPLOIT] CVE-2023-28441 — no pairing required...",
    "[CAPTURE] Heart rate, SpO2, GPS waypoints captured...",
    "[CLOUD] IDOR in Vitality Health API — user_id=1..94000",
    "[EXFIL] ⚠ 94,000 health records downloaded",
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
        num="08"
        title="Wearable Biometrics"
        subtitle="BLE interception and biometric data theft"
        badges={["HIGH","T1040","T1530"]}
      />
      <div style={{padding:"20px 24px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",
                     gap:12,marginBottom:16}}>
          <StatCard label="Health Record" value="$250" color="#ef4444"/>
          <StatCard label="BLE Range" value="100m" color="#f97316"/>
          <StatCard label="Data/Day" value="2.8M" color="#eab308"/>
          <StatCard label="3rd Parties" value="14+" color="#a855f7"/>
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