export default function ModuleHeader({ num, title, subtitle, badges=[] }) {
const sevColor = { CRITICAL:"#ef4444", HIGH:"#f97316",
"MITRE ATT&CK":"#3b82f6", OWASP:"#a855f7" }
return (
<div style={{padding:"20px 24px 16px", borderBottom:"1px solid #374151",
background:"linear-gradient(135deg,#0f1624 0%,#0a0e17 100%)"}}>
<div style={{fontSize:10, color:"#6b7280", letterSpacing:1, marginBottom:6}}>
MODULE {num} · FINSERVCORP SIMULATION
</div>
<div style={{fontSize:20, fontWeight:700}}>{title}</div>
<div style={{fontSize:12, color:"#9ca3af", marginTop:4}}>{subtitle}</div>
<div style={{display:"flex", gap:6, marginTop:10, flexWrap:"wrap"}}>
{badges.map((b,i) => (
<span key={i} style={{
fontSize:9, padding:"2px 8px", borderRadius:3, fontWeight:700,
border:"1px solid", letterSpacing:0.5,
color: sevColor[b] || "#06b6d4",
borderColor: (sevColor[b] || "#06b6d4") + "66",
background: (sevColor[b] || "#06b6d4") + "11",
}}>{b}</span>
))}
</div>
</div>
)
}
