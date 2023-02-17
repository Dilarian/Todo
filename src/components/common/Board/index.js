import React from "react";

import { DeleteBoard } from "../../../redux/mainReducer";
import { useDispatch } from "react-redux";
import styles from "./style.module.scss";

export default function Board({ text, onClick, idBoard }) {
  const dispatch = useDispatch();
  const onClickDeleteBoard = (ev) => {
    ev.stopPropagation();
    dispatch(
      DeleteBoard({
        idBoard,
      })
    );
  };

  return (
    <div className={styles.board} onClick={onClick}>
      <div className={styles.textBoard}>
        {text}
        <button
          onClick={(ev) => onClickDeleteBoard(ev)}
          className={styles.buttonBoard}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}
