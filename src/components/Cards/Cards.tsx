import React from "react";

import styles from "./Cards.module.css";
import Card from "./Card/Card";

interface CardsProps {
  servers: {
    link: string;
    status: string;
    statusCode: number;
    timeElapsed: number;
  }[];
}

const Cards: React.FC<CardsProps> = ({ servers }) => {
  return (
    <section className={styles.cards}>
      {servers.map((server, index) => {
        return (
          <Card
            key={index}
            server={server.link}
            status={server.status}
            statusCode={server.statusCode}
            timeElapsed={server.timeElapsed}
          />
        );
      })}
    </section>
  );
};

export default Cards;
