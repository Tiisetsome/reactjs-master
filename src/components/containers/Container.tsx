import React from "react";
import styles from "./Container.module.css";

interface ContainerProps {
  header: string;
  description: string;
  numberOfServers: number;
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  header,
  description,
  numberOfServers,
  children,
}) => {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>{header}</h1>
        <p className={styles.description}>{description}</p>
        <p>Servers : {numberOfServers}</p>
      </header>
      {children}
    </main>
  );
};

export default Container;
