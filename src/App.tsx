import React, { useContext, useEffect, useState, useRef } from "react";

import Cards from "./components/Cards/Cards";
import Container from "./components/containers/Container";
import MonitorContext from "./context/MonitorContext";

const App: React.FC = () => {
  const monitorContext = useContext(MonitorContext);

  const { servers, loading, lastServerPayload, checkServerStatus } =
    monitorContext;

  const [count, setCount] = useState(5);

  const [timeUntilNextCheck] = useState(1);

  const intervalId = useRef<any>(null);

  useEffect(() => {
    checkServerStatus(servers);

    intervalId.current = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, timeUntilNextCheck * 60 * 1000);
  }, [intervalId]);

  useEffect(() => {
    if (count <= 0) {
      setCount((prevCount) => prevCount + 5);
      checkServerStatus(servers);
    }
  });

  return (
    <div className="wrapper">
      <Container
        header="Build Monitor"
        description="A tool to visibly check the health status of a server or an environment."
        numberOfServers={5}
      >
        <Cards
          servers={servers.map((server) => {
            return {
              ...server,
              timeElapsed: count,
            };
          })}
          lastCheckPayload={JSON.stringify(lastServerPayload)}
          loading={loading}
        />
      </Container>
    </div>
  );
};

export default App;
