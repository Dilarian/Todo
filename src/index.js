import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import MainRoute from "./router";
import { store } from "./store/store";

import "./style/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <MainRoute />
    </BrowserRouter>
  </Provider>
);
