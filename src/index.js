import React from "react";
import ReactDOM from "react-dom/client";
import { AppContextProvider } from "./context/appContext";
import App from "./App";

const Application = AppContextProvider(App);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Application />
);
