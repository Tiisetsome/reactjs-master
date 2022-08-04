import React, { useState, useEffect } from "react";

import styles from "./Cards.module.css";
import Card from "./Card/Card";
import Filter from "../Filter/Filter";

interface CardsProps {
  servers: {
    link: string;
    status: string;
    statusCode: number;
    timeElapsed: number;
  }[];
  lastCheckPayload: string;
  loading: boolean;
}

interface Server {
  link: string;
  status: string;
  statusCode: number;
  timeElapsed: number;
}

const Cards: React.FC<CardsProps> = ({
  servers,
  lastCheckPayload,
  loading,
}) => {
  const [showCards, setShowCards] = useState(false);
  const [filters, setFilters] = useState({
    environment: "all",
  });
  const [filteredServers, setFilteredServers] = useState<Server[]>(
    JSON.parse(JSON.stringify(servers))
  );

  useEffect(() => {
    let serversFiltered: Server[] = [...JSON.parse(JSON.stringify(servers))];

    if (filters.environment === "production") {
      serversFiltered = serversFiltered.filter(
        (server) => server.statusCode === 200
      );
    } else if (filters.environment === "testing") {
      serversFiltered = serversFiltered.filter(
        (server) => server.statusCode !== 200
      );
    }

    setFilteredServers(serversFiltered);
  }, [filters, servers]);

  return (
    <section>
      {!showCards && <Filter filters={filters} setFilters={setFilters} />}
      <div className={styles.cards}>
        {!showCards &&
          filteredServers.map((server: Server, index: number) => {
            return (
              <Card
                key={index}
                server={server.link}
                status={server.status}
                statusCode={server.statusCode}
                timeElapsed={server.timeElapsed}
                showCards={showCards}
                setShowCards={setShowCards}
                loading={loading}
              />
            );
          })}
        {showCards && (
          <div className={styles.payload}>
            <p>
              <b>last endpoint payload</b> : {lastCheckPayload}
            </p>
            <button
              onClick={() => {
                setShowCards(false);
              }}
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cards;
