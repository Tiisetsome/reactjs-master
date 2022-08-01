interface State {
  servers: { link: string; status: string; timeElapsed: number }[];
}

interface Action {
  type: string;
  payload?: any;
}

const MonitorReducer = (state: State, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default MonitorReducer;
