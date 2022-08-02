import { createContext } from "react";

interface AppContext {
  servers: {
    link: string;
    status: string;
    statusCode: number;
    timeElapsed: number;
  }[];
  checkServerStatus: (
    servers: {
      link: string;
      status: string;
      statusCode: number;
      timeElapsed: number;
    }[]
  ) => void;
}

const MonitorContext = createContext<AppContext>({} as AppContext);

export default MonitorContext;
