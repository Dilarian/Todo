import React, { useState } from "react";
import { List, Body, ContainerOut, Modal } from "../../../common";
import { useSelector, useDispatch } from "react-redux";
import {
  addNewArrayList,
  getArrayBoards,
  handleOnDragList,
  removeItem,
} from "../../../../redux/mainReducer";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import styles from "./style.module.scss";

export default function ListComponents() {
  const [data, setData] = useState("");
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();

  const arrayBoards = useSelector(getArrayBoards);

  const currentBoard = arrayBoards.filter(
    (item) => item.id === location.pathname.split("/")[1]
  )[0];

  const idBoard = location.pathname.split("/")[1];

  const onClickOpen = () => {
    setOpen(true);
  };
  const closedModal = () => {
    setOpen(false);
  };
  const onClickModal = (ev) => {
    ev.stopPropagation();
  };
  const onClickNewBoard = () => {
    dispatch(
      addNewArrayList({
        idBoard,
        itemList: {
          id: uuidv4(),
          nameList: data,
          arrayTasks: [],
        },
      })
    );
    closedModal(!open);
  };

  return (
    <Body>
      {open ? (
        <Modal
          closed={closedModal}
          click={onClickModal}
          newBoard={onClickNewBoard}
          value={data}
          onChange={(e) => setData(e.target.value)}
          disabled={!data}
        />
      ) : null}
      <ContainerOut>
        <div className={styles.containerNavigation}>
          <button onClick={onClickOpen} className={styles.buttonNewBoard}>
            Добавить задачу
          </button>
          <button className={styles.back}>Вернуться</button>
        </div>
        <DragDropContext
          onDragEnd={(result) =>
            dispatch(
              handleOnDragList({
                result,
                idBoard,
              })
            )
          }
        >
          <Droppable droppableId="list" direction="horizontal">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={styles.boardContainer}
              >
                {currentBoard?.arrayList?.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <List
                          text={item?.nameList}
                          array={item?.arrayTasks}
                          idList={item.id}
                          onClick={() => {
                            dispatch(removeItem(item.id));
                          }}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ContainerOut>
    </Body>
  );
}
