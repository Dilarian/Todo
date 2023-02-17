import React from "react";
import { ROUTE } from "../utils/const";
import { Route, Routes } from "react-router-dom";
import TasksComponents from "../pages/tasks";
import BoardPage from "../pages/boardPage";

export default function MainRoute() {
  return (
    <Routes>
      <Route exact path={ROUTE.tasks} element={<TasksComponents />} />
      <Route exact path={ROUTE.list} element={<BoardPage />} />
    </Routes>
  );
}
