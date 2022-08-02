import axios from "axios";
import React, { useReducer } from "react";
import { servers } from "../data/data";
import { SAVE_SERVER_RESPONSE } from "./constants/constants";
import MonitorContext from "./MonitorContext";
import MonitorReducer from "./MonitorReducer";

interface MonitorPros {
  children?: React.ReactNode;
}

interface Server {
  link: string;
  status: string;
  statusCode: number;
  timeElapsed: number;
}

const MonitorState: React.FC<MonitorPros> = ({ children }) => {
  const initialState = {
    servers: servers,
  };

  const [state, dispatch] = useReducer(MonitorReducer, initialState);

  const checkServerStatus = async (servers: Server[]) => {
    const serverCallPromisesArray = servers.map((server) =>
      serverCall(server.link)
    );

    const responses = await Promise.all(serverCallPromisesArray);

    if (responses) {
      responses.forEach((response) => {
        if (response.status === 200) {
          dispatchResults(response, "UP");
        } else if (
          response.response.status === 500 ||
          response.response.status === 503
        ) {
          dispatchResults(response, "DOWN");
        } else {
          dispatchResults(response, "OTHER");
        }
      });
    }
  };

  const serverCall = (url: string) => {
    return axios({
      method: "get",
      url: url,
      withCredentials: false,
    }).catch((e) => e);
  };

  const dispatchResults = (results: any, status: string) => {
    dispatch({
      type: SAVE_SERVER_RESPONSE,
      payload: {
        link: results.request.responseURL,
        status,
        statusCode: results.status || results.response.status,
        timeElapsed: 5,
      },
    });
  };

  return (
    <MonitorContext.Provider
      value={{
        servers: state.servers,
        checkServerStatus,
      }}
    >
      {children}
    </MonitorContext.Provider>
  );
};

export default MonitorState;
