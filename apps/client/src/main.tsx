import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import Header from "./components/Headers";
import ErrorPage from "./utils/Notfound";
import AuthGuard from "./utils/AuthGuard";
import "./styles/App.css";
import { SingleData } from "./pages/private/SingleData";
import Dashboard from "./pages/private/Dashboard";
import UnAuthGuard from "./utils/UnAuthGuard";
import FormData from "./components/FormData";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UnAuthGuard>
        <Home />
      </UnAuthGuard>
    ),
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
    errorElement: <ErrorPage />,
  },

  {
    path: "dashboard",
    element: (
      <AuthGuard>
        <Header />

        <Dashboard />
      </AuthGuard>
    ),

    children: [
      {
        path: "createData",
        element: <FormData />,
      },
      {
        path: ":id",
        element: <SingleData />,
      },
    ],
  },
  {
    path: "profile",
    element: (
      <AuthGuard>
        <div>Mon profile</div>,
      </AuthGuard>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <main>
      <RouterProvider router={router} />
    </main>
  </React.StrictMode>
);
