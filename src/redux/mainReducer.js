import { createSlice, createSelector } from "@reduxjs/toolkit";

const mainReducer = createSlice({
  name: "mainReducer",
  initialState: {
    isActiveMenu: false,
    arrayBoards: [
      {
        nameBoard: "Board 1",
        id: "1",
        arrayList: [
          {
            id: "2",
            nameList: "BoardPage 1",
            arrayTasks: [
              {
                id: "3",
                nameTask: "Task 1",
                isActive: true,
              },
            ],
          },
          {
            id: "4",
            nameList: "BoardPage 2",
            arrayTasks: [
              {
                id: "5",
                nameTask: "Task",
                isActive: false,
              },
              {
                id: "6",
                nameTask: "Task 2",
                isActive: true,
              },
            ],
          },
          {
            id: "7",
            nameList: "BoardPage 3",
            arrayTasks: [],
          },
        ],
      },
    ],
  },
  reducers: {
    addNewItemBoard(state, data) {
      state.arrayBoards = [...state.arrayBoards, data.payload];
    },
    addNewArrayList(state, data) {
      const { idBoard, itemList } = data.payload;

      state.arrayBoards = state.arrayBoards.map((itemBoard) => {
        if (itemBoard.id === idBoard) {
          return {
            ...itemBoard,
            arrayList: [...itemBoard.arrayList, itemList],
          };
        }

        return itemBoard;
      });
    },
    CreateNewBoard(state, data) {
      const { idBoard, idList, newTaskText } = data.payload;
      state.arrayBoards = state.arrayBoards.map((itemBoard) => {
        if (itemBoard.id === idBoard) {
          return {
            ...itemBoard,
            arrayList: itemBoard.arrayList.map((itemList) => {
              if (itemList.id === idList) {
                return {
                  ...itemList,
                  arrayTasks: [...itemList.arrayTasks, newTaskText],
                };
              }
              return itemList;
            }),
          };
        }
        return itemBoard;
      });
    },
    StateTask(state, data) {
      const { idBoard, idList, idTask } = data.payload;
      state.arrayBoards = state.arrayBoards.map((itemBoard) => {
        if (itemBoard.id === idBoard) {
          return {
            ...itemBoard,
            arrayList: itemBoard.arrayList.map((itemList) => {
              if (itemList.id === idList) {
                return {
                  ...itemList,
                  arrayTasks: itemList.arrayTasks.map((itemTask) => {
                    if (itemTask.id === idTask) {
                      return {
                        ...itemTask,
                        isActive: !itemTask.isActive,
                      };
                    }
                    return itemTask;
                  }),
                };
              }
              return itemList;
            }),
          };
        }
        return itemBoard;
      });
    },
    DeleteTask(state, data) {
      const { idBoard, idList, idTask } = data.payload;
      state.arrayBoards = state.arrayBoards.map((itemBoard) => {
        if (itemBoard.id === idBoard) {
          return {
            ...itemBoard,
            arrayList: itemBoard.arrayList.map((itemList) => {
              if (itemList.id === idList) {
                return {
                  ...itemList,
                  arrayTasks: itemList.arrayTasks.filter(
                    (itemTask) => itemTask.id !== idTask
                  ),
                };
              }
              return itemList;
            }),
          };
        }
        return itemBoard;
      });
    },
    DeleteList(state, data) {
      const { idBoard, idList } = data.payload;
      state.arrayBoards = state.arrayBoards.map((itemBoard) => {
        if (itemBoard.id === idBoard) {
          return {
            ...itemBoard,
            arrayList: itemBoard.arrayList.filter(
              (itemList) => itemList.id !== idList
            ),
          };
        }
        return itemBoard;
      });
    },
    DeleteBoard(state, data) {
      const { idBoard } = data.payload;
      state.arrayBoards = state.arrayBoards.filter(
        (itemBoard) => itemBoard.id !== idBoard
      );
    },
    handleOnDragEnd(state, data) {
      const { idBoard, idList, result } = data.payload;
      state.arrayBoards = state.arrayBoards.map((itemBoard) => {
        if (itemBoard.id === idBoard) {
          return {
            ...itemBoard,
            arrayList: itemBoard.arrayList.map((itemList) => {
              if (itemList.id === idList) {
                const items = Array.from(itemList.arrayTasks);
                const [reorderedItem] = items.splice(result.source.index, 1);
                items.splice(result.destination.index, 0, reorderedItem);

                return {
                  ...itemList,
                  arrayTasks: items,
                };
              }
              return itemList;
            }),
          };
        }
        return itemBoard;
      });
    },
    handleOnDragList(state, data) {
      const { idBoard, result } = data.payload;
      state.arrayBoards = state.arrayBoards.map((itemBoard) => {
        if (itemBoard.id === idBoard) {
          const items = Array.from(itemBoard.arrayList);
          const [reorderedItem] = items.splice(result.source.index, 1);
          items.splice(result.destination.index, 0, reorderedItem);
          return {
            ...itemBoard,
            arrayList: items,
          };
        }
        return itemBoard;
      });
    },
    handleOnDragBoard(state, data) {
      const { result } = data.payload;
      const items = Array.from(state.arrayBoards);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      return {
        ...state.arrayBoards,
        arrayBoards: items,
      };
    },
  },
});

const baseUrl = (state) => state.mainReducer;

export const getArrayBoards = createSelector(
  [baseUrl],
  (state) => state.arrayBoards
);

export default mainReducer.reducer;
export const {
  addNewItemBoard,
  addNewArrayList,
  removeItem,
  CreateNewBoard,
  StateTask,
  DeleteTask,
  DeleteList,
  DeleteBoard,
  handleOnDragEnd,
  handleOnDragBoard,
  handleOnDragList,
} = mainReducer.actions;
