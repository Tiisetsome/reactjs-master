import {
  LOADING,
  SAVE_SERVER_RESPONSE,
  STORE_LAST_SERVER_PAYLOAD,
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

const MonitorReducer = (state: State, action: Action) => {
  switch (action.type) {
    case SAVE_SERVER_RESPONSE:
      return {
        ...state,
        servers: action.payload,
      };
    case STORE_LAST_SERVER_PAYLOAD:
      return {
        ...state,
        lastServerPayload: action.payload,
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
