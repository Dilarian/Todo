import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { Board, Body, ContainerOut, Modal } from "../../../common";
import {
  addNewItemBoard,
  getArrayBoards,
  handleOnDragBoard,
} from "../../../../redux/mainReducer";

import styles from "./style.module.scss";

function TasksComponents() {
  const [data, setData] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const arrayBoards = useSelector(getArrayBoards);

  const onClickBoard = (id) => {
    navigate(`/${id}`);
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
  const onClickNewBoard = () => {
    dispatch(
      addNewItemBoard({
        id: uuidv4(),
        nameBoard: data,
        arrayList: [],
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
        </div>
        <DragDropContext
          onDragEnd={(result) => dispatch(handleOnDragBoard({ result }))}
        >
          <Droppable droppableId="board" direction="horizontal">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={styles.boardContainer}
              >
                {arrayBoards?.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Board
                          text={item.nameBoard}
                          idBoard={item.id}
                          onClick={() => onClickBoard(item.id)}
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

export default TasksComponents;
