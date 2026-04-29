export default function Terminal({ lines=[], minHeight=140 }) {
return (
<div style={{
background:"#020408", border:"1px solid #1e3a2a", borderRadius:6,
padding:14, fontFamily:"Courier New", fontSize:11, lineHeight:1.7,
minHeight, maxHeight:260, overflowY:"auto"
}}>
{lines.length === 0
? <span style={{color:"#4b5563"}}>// Awaiting simulation...</span>
: lines.map((l,i) => (
<div key={i} style={{color:
l.startsWith("[BLOCKED]") || l.startsWith("✓") ? "#22c55e" :
l.startsWith("■") || l.startsWith("[HIJACKED]") ? "#ef4444" :
l.startsWith("[EXPLOIT]") || l.startsWith("[EXFIL]") ? "#f97316" :
l.startsWith("[") ? "#06b6d4" : "#9ca3af"
}}>{l}</div>
))
}
</div>
)
}
