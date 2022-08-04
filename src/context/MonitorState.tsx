import axios from "axios";
import React, { useReducer } from "react";
import { endpoints } from "../data/data";
import {
  LOADING,
  SAVE_SERVER_RESPONSE,
  STORE_LAST_SERVER_PAYLOAD,
} from "./constants/constants";
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
    servers: endpoints,
    lastServerPayload: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(MonitorReducer, initialState);

  const checkServerStatus = async (servers: Server[]) => {
    dispatch({
      type: LOADING,
      payload: true,
    });

    const serverCallPromisesArray = servers.map((server) =>
      serverCall(server.link)
    );

    const responses = await Promise.all(serverCallPromisesArray);

    if (responses) {
      let serverHealth: Server[] = [];

      responses.forEach((response) => {
        if (response.status === 200) {
          serverHealth.push(formatResult(response, "UP"));
        } else if (
          response.response.status === 500 ||
          response.response.status === 503
        ) {
          serverHealth.push(formatResult(response, "DOWN"));
        } else {
          serverHealth.push(formatResult(response, "OTHER"));
        }
      });

      dispatch({
        type: SAVE_SERVER_RESPONSE,
        payload: serverHealth,
      });

      dispatch({
        type: STORE_LAST_SERVER_PAYLOAD,
        payload: responses[responses.length - 1],
      });

      dispatch({
        type: LOADING,
        payload: false,
      });
    }
  };

  const serverCall = (url: string) => {
    return axios({
      method: "get",
      url: url,
      withCredentials: false,
    }).catch((error) => error);
  };

  const formatResult = (results: any, status: string) => {
    return {
      link: results.config.url,
      status,
      statusCode: results.status ? results.status : results.response.status,
      timeElapsed: 5,
    };
  };

  return (
    <MonitorContext.Provider
      value={{
        servers: state.servers,
        lastServerPayload: state.lastServerPayload,
        loading: state.loading,
        checkServerStatus,
      }}
    >
      {children}
    </MonitorContext.Provider>
  );
};

export default MonitorState;
