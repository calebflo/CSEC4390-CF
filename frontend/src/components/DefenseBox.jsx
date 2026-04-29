export default function DefenseBox({ items=[] }) {
return (
<div style={{background:"#14532d18", border:"1px solid #14532d",
borderRadius:6, padding:14, marginTop:14}}>
<div style={{fontSize:10, fontWeight:700, color:"#22c55e",
letterSpacing:1, marginBottom:8}}>■ DEFENSE PLAYBOOK</div>
{items.map((item, i) => (
<div key={i} style={{display:"flex", gap:8, fontSize:10,
color:"#9ca3af", marginBottom:5, lineHeight:1.4}}>
<span style={{color:"#22c55e", flexShrink:0}}>■</span>
<span>{item}</span>
</div>
))}
</div>
)
}