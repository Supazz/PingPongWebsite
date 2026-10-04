import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import ReactDOM from "react-dom/client";
import { Rankings } from "./components/Rankings.tsx";
import { ManagePlayers } from "./components/ManagePlayers.tsx";
import { Admin } from "./components/Admin.tsx";
import { ManageMatches } from "./components/ManageMatches.tsx";
import { PastMatches } from "./components/PastMatches.tsx";
import { Login } from "./components/Login.tsx";
import { AuthProvider } from "./auth/AuthProvider.tsx";
import { RequireAdmin } from "./auth/RequireAdmin.tsx";
const router = createBrowserRouter([
  { path: "/", element: <Rankings /> },
  { path: "/login", element: <Login /> },

  {
    element: <RequireAdmin />,
    children: [
      { path: "/admin", element: <Admin /> },
      { path: "/manage-players", element: <ManagePlayers /> },
      { path: "/manage-matches", element: <ManageMatches /> },
      { path: "/past-matches", element: <PastMatches /> },
    ],
  },
]);

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element with id 'root' was not found");
}

ReactDOM.createRoot(root).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
);
