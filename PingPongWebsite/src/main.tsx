import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import ReactDOM from "react-dom/client";
import { Rankings } from "./Rankings.tsx";
import { ManagePlayers } from "./ManagePlayers.tsx";
import { Admin } from "./Admin.tsx";
import { ManageMatches } from "./ManageMatches.tsx";
import { RefMatch } from "./RefMatch.tsx";
import { CreateMatch } from "./CreateMatch.tsx";
;

const router = createBrowserRouter([
  { path: "/", element: <Rankings /> },
  { path: "/manage-players", element: <ManagePlayers /> },
  { path: "admin", element: <Admin /> },
  { path: "/manage-matches", element: <ManageMatches /> },
  { path: "create-match", element: <CreateMatch /> },
  { path: "ref-match", element: <RefMatch /> },
]);

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element with id 'root' was not found");
}

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
