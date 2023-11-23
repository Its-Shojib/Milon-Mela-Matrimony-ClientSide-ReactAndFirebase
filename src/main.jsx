import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import "./index.css";
import router from "./AllRoutes/Routes";




ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);