import React, { useContext, useEffect, useState, useRef } from "react";

import Cards from "./components/Cards/Cards";
import Container from "./components/containers/Container";
import MonitorContext from "./context/MonitorContext";

const App: React.FC = () => {
  const monitorContext = useContext(MonitorContext);

  const minutesBeforeNextCheck = 5;

  const {
    servers,
    loading,
    lastServerPayload,
    checkServerStatus,
    updateServerUptime,
  } = monitorContext;

  const [count, setCount] = useState({
    countDown: minutesBeforeNextCheck,
  });

  const [timeUntilNextCheck] = useState(1);

  const intervalId = useRef<any>(null);

  useEffect(() => {
    checkServerStatus(servers);

    intervalId.current = setInterval(() => {
      setCount((prevCount) => {
        return {
          ...prevCount,
          countDown: prevCount.countDown - 1,
        };
      });
    }, timeUntilNextCheck * 60 * 1000);
  }, [intervalId]);

  useEffect(() => {
    if (count.countDown <= 0) {
      setCount((prevCount) => {
        return {
          ...prevCount,
          countDown: prevCount.countDown + minutesBeforeNextCheck,
        };
      });
      checkServerStatus(servers);
    } else if (count.countDown < minutesBeforeNextCheck) {
      updateServerUptime();
    }
  }, [count.countDown]);

  return (
    <div className="wrapper">
      <Container
        header="Build Monitor"
        description="A tool to visibly check the health status of a server or an environment."
        numberOfServers={servers.length}
      >
        <Cards
          servers={servers}
          lastCheckPayload={JSON.stringify(lastServerPayload)}
          loading={loading}
        />
      </Container>
    </div>
  );
};

export default App;
