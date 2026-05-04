import { createContext, useContext, useState } from "react"

const SimCtx = createContext(null)

export function SimulationProvider({ children }) {
  const [pending, setPending] = useState(null)
  // pending = { module: "02", steps: [...], title: "..." }

  return (
    <SimCtx.Provider value={{ pending, setPending }}>
      {children}
    </SimCtx.Provider>
  )
}

export function useSimulation() {
  return useContext(SimCtx)
}