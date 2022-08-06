import { createContext } from "react";
import { Server } from "../constants/constants";

interface AppContext {
  servers: Server[];
  lastServerPayload: any;
  loading: boolean;
  checkServerStatus: (servers: Server[]) => void;
  updateServerUptime: () => void;
}

const MonitorContext = createContext<AppContext>({} as AppContext);

export default MonitorContext;
