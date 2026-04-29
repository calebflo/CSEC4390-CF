import StatCard from "../components/StatCard.jsx"

const mods = [
  {num:"01",name:"AI Phishing Lab",sev:"CRIT"},
  {num:"02",name:"Prompt Injection",sev:"CRIT"},
  {num:"03",name:"Ransomware Chain",sev:"CRIT"},
  {num:"04",name:"Identity Threats",sev:"HIGH"},
  {num:"05",name:"Supply Chain",sev:"HIGH"},
  {num:"06",name:"IoT Attack Mapper",sev:"HIGH"},
  {num:"07",name:"Smart Home Pivot",sev:"CRIT"},
  {num:"08",name:"Wearable Biometrics",sev:"HIGH"},
  {num:"09",name:"Agentic AI",sev:"CRIT"},
]

export default function Dashboard() {
  return (
    <div>
      <div style={{padding:"20px 24px 16px",borderBottom:"1px solid #374151",
                   background:"linear-gradient(135deg,#0f1624,#0a0e17)"}}>
        <div style={{fontSize:10,color:"#6b7280",letterSpacing:1,marginBottom:6}}>
          THREAT LANDSCAPE EXPLORER · FINSERVCORP
        </div>
        <div style={{fontSize:20,fontWeight:700}}>Threat Command Dashboard</div>
        <div style={{fontSize:12,color:"#9ca3af",marginTop:4}}>
          UIW · CIS 4390 Capstone · Spring 2026
        </div>
      </div>
      <div style={{padding:"20px 24px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
          <StatCard label="Threat Vectors"   value="9"  sub="Modules"        color="#06b6d4"/>
          <StatCard label="MITRE Techniques" value="47" sub="ATT&CK v15"     color="#ef4444"/>
          <StatCard label="Attack Sims"      value="23" sub="Live & animated" color="#f97316"/>
          <StatCard label="Defense Controls" value="38" sub="NIST CSF 2.0"   color="#22c55e"/>
        </div>
        <div style={{background:"#111827",border:"1px solid #374151",borderRadius:6,padding:16}}>
          <div style={{fontSize:11,fontWeight:700,marginBottom:12,letterSpacing:1}}>
            MODULE STATUS
          </div>
          {mods.map(m => (
            <div key={m.num} style={{display:"flex",alignItems:"center",
                                     gap:8,marginBottom:6,fontSize:10}}>
              <span style={{color:"#6b7280",minWidth:24}}>{m.num}</span>
              <span style={{flex:1,color:"#9ca3af"}}>{m.name}</span>
              <span style={{fontSize:8,fontWeight:700,
                color:m.sev==="CRIT"?"#ef4444":"#f97316"}}>{m.sev}</span>
              <span style={{fontSize:9,color:"#22c55e"}}>✓ ACTIVE</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}