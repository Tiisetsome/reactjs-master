import React from "react";
import { AiFillChrome, AiFillClockCircle } from "react-icons/ai";
import { MdSettings } from "react-icons/md";
import { FaHeartbeat } from "react-icons/fa";

import styles from "./Card.module.css";

interface CardProps {
  server: string;
  status: string;
  statusCode: number;
  timeElapsed: number;
  showCards: boolean;
  setShowCards: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}

const Card: React.FC<CardProps> = ({
  server,
  status,
  statusCode,
  timeElapsed,
  showCards,
  setShowCards,
  loading,
}) => {
  const colors: [string, string, string] = ["green", "gray", "red"];
  const serverStatusColor = (code: number) => {
    return code === 200
      ? colors[0]
      : code === 500 || code === 503
      ? colors[2]
      : colors[1];
  };

  const formatWording = (time: number) => {
    return time <= 1 ? `${time} minute ago` : `${time} minutes ago`;
  };

  return (
    <article
      className={styles.card}
      style={
        loading
          ? { backgroundColor: "#fff" }
          : { backgroundColor: serverStatusColor(statusCode) }
      }
      onClick={() => setShowCards(!showCards)}
    >
      <div className={styles.cardInfo}>
        <AiFillChrome />
        <span>{server}</span>
      </div>
      {loading ? (
        <div className={`${styles.cardInfo} ${styles.loading}`}>
          <MdSettings style={{ fontSize: "1.3rem" }} />
          <span>Checking...</span>
        </div>
      ) : (
        <div className={styles.cardInfo}>
          <FaHeartbeat />
          <span>Status : {status}</span>
        </div>
      )}
      {statusCode === 200 && (
        <div className={styles.cardInfo}>
          <AiFillClockCircle />
          <span>Up Time : {formatWording(timeElapsed)}</span>
        </div>
      )}
    </article>
  );
};

export default Card;
