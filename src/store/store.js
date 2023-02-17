import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";

import mainReducer from "../redux/mainReducer";

const rootReducer = combineReducers({
  mainReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: true,
});
