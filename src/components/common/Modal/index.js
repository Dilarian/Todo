import React from "react";

import { Input } from "../index";

import styles from "./style.module.scss";

export default function Modal({
  closed,
  click,
  newBoard,
  value,
  onChange,
  disabled,
}) {
  return (
    <div onClick={closed} className={styles.modal}>
      <div className={styles.addTaskContainer} onClick={click}>
        <Input
          placeholder={"Введите название"}
          onChange={onChange}
          name={"text"}
          value={value}
          className={styles.input}
        />
        <button
          onClick={newBoard}
          disabled={disabled}
          className={styles.buttonPush}
        >
          Кнопка
        </button>
      </div>
    </div>
  );
}
