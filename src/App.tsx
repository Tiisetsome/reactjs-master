import React, { useContext } from "react";

import Cards from "./components/Cards/Cards";
import Container from "./components/containers/Container";
import MonitorContext from "./context/MonitorContext";
import { servers } from "./data/data";

const App: React.FC = () => {
  const monitorContext = useContext(MonitorContext);

  const { servers } = monitorContext;

  return (
    <div className="wrapper">
      <Container
        header="Build Monitor"
        description="A tool to visibly check the health status of a server or an environment."
        numberOfServers={5}
      >
        <Cards servers={servers} />
      </Container>
    </div>
  );
};

export default App;
