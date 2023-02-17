import React from "react";

import styles from "./style.module.scss";

export default function Input({ type, placeholder, onChange, name }) {
  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      name={name}
    />
  );
}
