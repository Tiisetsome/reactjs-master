import React, { useReducer } from "react";
import MonitorContext from "./MonitorContext";
import MonitorReducer from "./MonitorReducer";

interface MonitorPros {
  children?: React.ReactNode;
}

const MonitorState: React.FC<MonitorPros> = ({ children }) => {
  const initialState = {
    servers: [
      {
        link: "https://www.starworks.io",
        status: "running",
        timeElapsed: 5,
      },
      {
        link: "https://dev.vantage.run/health",
        status: "running",
        timeElapsed: 5,
      },
      {
        link: "https://status.gitlab.com/",
        status: "running",
        timeElapsed: 5,
      },
      {
        link: "https://www.starworks.io",
        status: "running",
        timeElapsed: 5,
      },
      {
        link: "https://www.starworks.io",
        status: "running",
        timeElapsed: 5,
      },
      {
        link: "https://www.starworks.io",
        status: "running",
        timeElapsed: 5,
      },
      {
        link: "https://www.starworks.io",
        status: "running",
        timeElapsed: 5,
      },
    ],
  };

  const [state, dispatch] = useReducer(MonitorReducer, initialState);
  return (
    <MonitorContext.Provider
      value={{
        servers: state.servers,
      }}
    >
      {children}
    </MonitorContext.Provider>
  );
};

export default MonitorState;
