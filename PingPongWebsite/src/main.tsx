import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import ReactDOM from "react-dom/client";
import { Rankings } from "./Rankings.tsx";
import { CreatePlayer } from "./CreatePlayer.tsx";
import { ManagePlayers } from "./ManagePlayers.tsx";
import { Admin } from "./Admin.tsx";
import { ManageMatches } from "./ManageMatches.tsx";
import { ScheduleMatch } from "./ScheduleMatch.tsx";
import { RefMatch } from "./RefMatch.tsx";

const router = createBrowserRouter([
  { path: "/", element: <Rankings /> },
  { path: "/manage-players", element: <ManagePlayers /> },
  { path: "admin", element: <Admin /> },
  { path: "/manage-matches", element: <ManageMatches /> },
  { path: "schedule-match,", element: <ScheduleMatch /> },
  { path: "ref-match", element: <RefMatch /> },
]);

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element with id 'root' was not found");
}

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
