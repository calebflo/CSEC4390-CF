import { Routes, Route, NavLink } from "react-router-dom"
import Dashboard from "./pages/Dashboard.jsx"
import Module01  from "./pages/Module01.jsx"
import Module02  from "./pages/Module02.jsx"
import Module03  from "./pages/Module03.jsx"
import Module04  from "./pages/Module04.jsx"
import Module05  from "./pages/Module05.jsx"
import Module06  from "./pages/Module06.jsx"
import Module07  from "./pages/Module07.jsx"
import Module08  from "./pages/Module08.jsx"
import Module09  from "./pages/Module09.jsx"
import MoltbookFeed from "./pages/MoltbookFeed.jsx"

const nav = [
  { to: "/",    label: "Dashboard",          num: "◉" },
  { to: "/m01", label: "AI Phishing Lab",     num: "01", sev: "CRIT" },
  { to: "/m02", label: "Prompt Injection",    num: "02", sev: "CRIT" },
  { to: "/m03", label: "Ransomware Chain",    num: "03", sev: "CRIT" },
  { to: "/m04", label: "Identity Threats",    num: "04", sev: "HIGH" },
  { to: "/m05", label: "Supply Chain",        num: "05", sev: "HIGH" },
  { to: "/m06", label: "IoT Attack Mapper",   num: "06", sev: "HIGH" },
  { to: "/m07", label: "Smart Home Pivot",    num: "07", sev: "CRIT" },
  { to: "/m08", label: "Wearable Biometrics", num: "08", sev: "HIGH" },
  { to: "/m09", label: "Agentic AI",          num: "09", sev: "CRIT" },
  { to: "/moltbook", label: "Moltbook Feed", num: "⚡", sev: "LIVE" },
]

export default function App() {
  return (
    <div style={{display:"flex", height:"100vh", overflow:"hidden"}}>

      {/* SIDEBAR */}
      <nav style={{width:220, background:"#070b12",
                   borderRight:"1px solid #374151", overflowY:"auto", flexShrink:0}}>
        <div style={{padding:"16px 12px", borderBottom:"1px solid #374151"}}>
          <div style={{fontSize:11, fontWeight:700, color:"#06b6d4", letterSpacing:2}}>
            THREAT LANDSCAPE
          </div>
          <div style={{fontSize:9, color:"#6b7280", marginTop:2}}>
            CIS 4390 · FinsecCorp
          </div>
        </div>
        {nav.map(item => (
          <NavLink key={item.to} to={item.to} end={item.to==="/"} style={({isActive}) => ({
            display:"flex", alignItems:"center", gap:8, padding:"7px 12px",
            fontSize:11, textDecoration:"none", transition:"all 0.15s",
            color: isActive ? "#06b6d4" : "#9ca3af",
            borderLeft: isActive ? "2px solid #06b6d4" : "2px solid transparent",
            background: isActive ? "#111827" : "transparent",
          })}>
            <span style={{fontSize:9, color:"#6b7280", minWidth:16}}>{item.num}</span>
            <span style={{flex:1}}>{item.label}</span>
            {item.sev && (
              <span style={{fontSize:8, fontWeight:700,
                color: item.sev==="CRIT" ? "#ef4444" : "#f97316"}}>
                {item.sev}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* MAIN CONTENT */}
      <main style={{flex:1, overflowY:"auto"}}>
        <Routes>
          <Route path="/moltbook" element={<MoltbookFeed />} />
          <Route path="/"    element={<Dashboard />} />
          <Route path="/m01" element={<Module01 />} />
          <Route path="/m02" element={<Module02 />} />
          <Route path="/m03" element={<Module03 />} />
          <Route path="/m04" element={<Module04 />} />
          <Route path="/m05" element={<Module05 />} />
          <Route path="/m06" element={<Module06 />} />
          <Route path="/m07" element={<Module07 />} />
          <Route path="/m08" element={<Module08 />} />
          <Route path="/m09" element={<Module09 />} />
        </Routes>
      </main>

    </div>
  )
}