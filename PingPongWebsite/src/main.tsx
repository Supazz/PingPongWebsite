import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import ReactDOM from "react-dom/client";
import { Rankings } from "./Rankings.tsx";
import { CreatePlayer } from "./CreatePlayer.tsx";
import { ManagePlayers } from "./ManagePlayers.tsx";
import { Admin } from "./admin.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/rankings", element: <Rankings /> },
  { path: "/manage-players", element: <ManagePlayers /> },
  {path:"admin", element: <Admin/>}
]);

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element with id 'root' was not found");
}

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
