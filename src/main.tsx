import React from "react";
import ReactDOM from "react-dom/client";
//components
import App from "./App.tsx";
//Redux
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
//router
import { BrowserRouter } from "react-router-dom";
//style
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="95%" appearance="dark">
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </Theme>
  </React.StrictMode>
);
