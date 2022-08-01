import { createContext } from "react";

interface AppContext {
  servers: { link: string; status: string; timeElapsed: number }[];
}

const MonitorContext = createContext<AppContext>({} as AppContext);

export default MonitorContext;
