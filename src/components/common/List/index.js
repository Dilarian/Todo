import React, { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  CreateNewBoard,
  StateTask,
  DeleteTask,
  DeleteList,
  handleOnDragEnd,
} from "../../../redux/mainReducer";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Modal } from "../index";
import { ReactComponent as DeleteSvg } from "../../../img/cross-2_90852.svg";

import styles from "./style.module.scss";

export default function List({ text, array, idList }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const [data, setData] = useState("");
  const [open, setOpen] = useState(false);

  const idBoard = location.pathname.split("/")[1];

  const onClickCreateTask = () => {
    dispatch(
      CreateNewBoard({
        idBoard,
        idList,
        newTaskText: {
          id: uuidv4(),
          nameTask: data,
        },
      })
    );
    closedModal(!open);
  };
  const taskState = (idTask) => {
    dispatch(
      StateTask({
        idBoard,
        idList,
        idTask,
      })
    );
  };
  const onClickDeleteTask = (idTask) => {
    dispatch(
      DeleteTask({
        idBoard,
        idList,
        idTask,
      })
    );
  };
  const onClickDeleteList = () => {
    dispatch(
      DeleteList({
        idBoard,
        idList,
      })
    );
  };
  const onClickOpen = () => {
    setOpen(true);
  };
  const closedModal = () => {
    setOpen(false);
  };
  const onClickModal = (ev) => {
    ev.stopPropagation();
  };
  return (
    <div>
      {open ? (
        <Modal
          closed={closedModal}
          click={onClickModal}
          newBoard={onClickCreateTask}
          value={data}
          onChange={(e) => setData(e.target.value)}
          disabled={!data}
        />
      ) : null}
      <div className={styles.boardList}>
        <div onClick={onClickDeleteList} className={styles.imgDelete}>
          <DeleteSvg />
        </div>
        <div className={styles.textBoard}>{text}</div>
        <DragDropContext
          onDragEnd={(result) =>
            dispatch(handleOnDragEnd({ idBoard, idList, result }))
          }
        >
          <Droppable droppableId={styles.containerInside}>
            {(provided) => (
              <div
                className={styles.containerInside}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {array?.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        className={styles.textList}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div
                          className={classNames(styles.text, {
                            "text-shower": item.isActive,
                          })}
                        >
                          {item.nameTask}
                        </div>
                        <div className={styles.iconContainer}>
                          <div
                            onClick={() => taskState(item.id)}
                            className={styles.galaPng}
                          ></div>
                          <div
                            onClick={() => onClickDeleteTask(item.id)}
                            className={styles.kissPng}
                          ></div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <button onClick={onClickOpen} className={styles.buttonBoard}>
          Создать
        </button>
      </div>
    </div>
  );
}
