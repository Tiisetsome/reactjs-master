import axios from "axios";
import React, { useReducer } from "react";
import { endpoints } from "../data/data";
import {
  DOWN,
  LOADING,
  OTHER,
  SAVE_SERVER_RESPONSE,
  STORE_LAST_SERVER_PAYLOAD,
  UP,
  UPDATE_UPTIME,
} from "./constants/constants";
import { Server } from "../constants/constants";
import MonitorContext from "./MonitorContext";
import MonitorReducer from "./MonitorReducer";

interface MonitorPros {
  children?: React.ReactNode;
}

type State = {
  servers: Server[] | any;
  lastServerPayload: any;
  loading: boolean;
};

const MonitorState: React.FC<MonitorPros> = ({ children }) => {
  const initialState: State = {
    servers: endpoints,
    lastServerPayload: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(MonitorReducer, initialState);

  const checkServerStatus = async (servers: Server[]) => {
    setLoading(true);

    const serverCallPromisesArray = servers.map((server) =>
      serverCall(server.link)
    );

    const responses = await Promise.all(serverCallPromisesArray);

    if (responses) {
      let serverHealth: Server[] = [];
      responses.forEach((response) => {
        if (response.data.data?.status === "success") {
          response.status = 200;
          response.config.url = response.data.targeturl;
          serverHealth.push(formatResult(response, UP));
        } else if (
          typeof response.data.data === "string" &&
          response.status === 200
        ) {
          response.config.url = response.data.targeturl;
          serverHealth.push(formatResult(response, UP));
        } else if (
          response.data.status === 500 ||
          response.data.status === 503
        ) {
          serverHealth.push(formatResult(response, DOWN));
        } else {
          serverHealth.push(formatResult(response.data, OTHER));
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

      setLoading(false);
    }
  };

  const updateServerUptime = () => {
    dispatch({
      type: UPDATE_UPTIME,
      payload: state.servers,
    });
  };

  const serverCall = (url: string) => {
    return axios({
      method: "get",
      url: "/proxy",
      withCredentials: false,
      headers: {
        targetUrl: url,
      },
    });
  };

  const formatResult = (results: any, status: string) => {
    return {
      link: results.config ? results.config.url : results.targeturl,
      status,
      statusCode: results.status,
      upTime: 0,
    };
  };

  const setLoading = (status: boolean) => {
    dispatch({
      type: LOADING,
      payload: status,
    });
  };

  return (
    <MonitorContext.Provider
      value={{
        servers: state.servers,
        lastServerPayload: state.lastServerPayload,
        loading: state.loading,
        checkServerStatus,
        updateServerUptime,
      }}
    >
      {children}
    </MonitorContext.Provider>
  );
};

export default MonitorState;
