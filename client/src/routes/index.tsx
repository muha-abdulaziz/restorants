import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/login";
import RegisterPage from "../pages/auth/register";
import { Home } from "../pages/home/Home";

import { PublicRouter } from "./public";

export const appRoutes = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Navigate to={"/meals"} />,
  // },
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "login",
        element: (
          <PublicRouter>
            <LoginPage />
          </PublicRouter>
        ),
      },
      {
        path: "register",
        element: (
          <PublicRouter>
            <RegisterPage />
          </PublicRouter>
        ),
      },
    ],
  },
]);
