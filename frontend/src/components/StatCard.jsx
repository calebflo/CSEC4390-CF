export default function StatCard({ label, value, sub, color="#06b6d4" }) {
return (
<div style={{background:"#111827", border:"1px solid #374151",
borderRadius:6, padding:"12px 14px"}}>
<div style={{fontSize:9, color:"#6b7280", letterSpacing:1,
textTransform:"uppercase", marginBottom:4}}>{label}</div>
<div style={{fontSize:20, fontWeight:700, color}}>{value}</div>
{sub && <div style={{fontSize:9, color:"#6b7280", marginTop:2}}>{sub}</div>}
</div>
)
}