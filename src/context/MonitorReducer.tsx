import { SAVE_SERVER_RESPONSE } from "./constants/constants";

interface State {
  servers: {
    link: string;
    status: string;
    statusCode: number;
    timeElapsed: number;
  }[];
}

interface Action {
  type: string;
  payload?: any;
}

const MonitorReducer = (state: State, action: Action) => {
  switch (action.type) {
    case SAVE_SERVER_RESPONSE:
      const serversCopy = [...state.servers];

      const indexOfServerToUpdate = serversCopy.findIndex(
        (server) => server.link === action.payload.link
      );

      let server = serversCopy[indexOfServerToUpdate];

      server = { ...server, ...action.payload };

      serversCopy[indexOfServerToUpdate] = server;

      return {
        ...state,
        servers: serversCopy,
      };
    default:
      return state;
  }
};

export default MonitorReducer;
