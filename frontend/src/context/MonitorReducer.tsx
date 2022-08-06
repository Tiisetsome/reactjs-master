import {
  LOADING,
  SAVE_SERVER_RESPONSE,
  STORE_LAST_SERVER_PAYLOAD,
  UPDATE_UPTIME,
} from "./constants/constants";
import { Server } from "../constants/constants";

interface State {
  servers: Server[];
  lastServerPayload: any;
  loading: boolean;
}

interface Action {
  type: string;
  payload?: any;
}

const updateServers = (state: Server[], currentServer: Server[]) => {
  const serversCopy = [...state];

  serversCopy.forEach((server, index) => {
    if (
      server.statusCode === currentServer[index].statusCode &&
      currentServer[index].statusCode === 200
    ) {
      currentServer[index].upTime = ++server.upTime;
    } else if (
      currentServer[index].statusCode === 200 &&
      server.statusCode === null
    ) {
      server.statusCode = currentServer[index].statusCode;
    } else {
      server.statusCode = currentServer[index].statusCode;
      server.upTime = currentServer[index].upTime;
      server.status = currentServer[index].status;
    }
  });

  return serversCopy[0].hasOwnProperty("upTime") ? serversCopy : currentServer;
};

const MonitorReducer = (state: State, action: Action) => {
  switch (action.type) {
    case SAVE_SERVER_RESPONSE:
      return {
        ...state,
        servers: updateServers(state.servers, action.payload),
      };
    case STORE_LAST_SERVER_PAYLOAD:
      return {
        ...state,
        lastServerPayload: action.payload,
      };
    case UPDATE_UPTIME:
      return {
        ...state,
        servers: updateServers(state.servers, action.payload),
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default MonitorReducer;
