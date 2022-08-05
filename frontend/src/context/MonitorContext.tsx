import { createContext } from "react";
import { Server } from "../constants/constants";

interface AppContext {
  servers: Server[];
  checkServerStatus: (servers: Server[]) => void;
  loading: boolean;
  lastServerPayload: any;
}

const MonitorContext = createContext<AppContext>({} as AppContext);

export default MonitorContext;
