import React from "react";

import styles from "./style.module.scss";

export default function ContainerOut({ children }) {
  return (
    <div className={styles.containerOutBoard}>
      <div className={styles.containerBoard}>
        <div className={styles.header}>
          <div className={styles.iconOrganizer}></div>
        </div>
        {children}
      </div>
    </div>
  );
}
