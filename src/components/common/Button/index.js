import React from "react";

import styles from "./style.module.scss";

export default function Button(onClick, disabled) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={styles.buttonPush}
    />
  );
}
