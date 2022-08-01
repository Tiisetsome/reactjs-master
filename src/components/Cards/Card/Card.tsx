import React from "react";
import { AiFillChrome, AiFillClockCircle } from "react-icons/ai";
import { FaHeartbeat } from "react-icons/fa";

import styles from "./Card.module.css";

interface CardProps {
  server: string;
  status: string;
  timeElapsed: number;
}

const Card: React.FC<CardProps> = ({ server, status, timeElapsed }) => {
  return (
    <article className={styles.card}>
      <div className={styles.cardInfo}>
        <AiFillChrome />
        <span>{server}</span>
      </div>
      <div className={styles.cardInfo}>
        <FaHeartbeat />
        <span>{status}</span>
      </div>
      <div className={styles.cardInfo}>
        <AiFillClockCircle />
        <span>Last Checked : {timeElapsed}</span>
      </div>
    </article>
  );
};

export default Card;
