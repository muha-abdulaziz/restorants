import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/login";
import RegisterPage from "../pages/auth/register";
import { Home } from "../pages/home/Home";

import { PublicRouter } from "./public";
import RestaurantRequestForm from "../pages/restaurantRequestForm";
import DeliveryRequestForm from "../pages/deliveryRequestForm";
import AdminRequestsPage from "../pages/adminRequestsPage";
import OrdersQueueDeliveryPerson from "../pages/orderDeliveryPerson";
import ShipmentsTable from "../pages/shipmentTable";
import { PrivateRouter } from "./private";

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
        path: "requests",
        element: (
          <PrivateRouter>
            <AdminRequestsPage />
          </PrivateRouter>
        ),
      },
      {
        path: "shipment",
        element: (
          <PrivateRouter>
            <ShipmentsTable />
          </PrivateRouter>
        ),
      },
      {
        path: "order-queue",
        element: (
          <PrivateRouter>
            <OrdersQueueDeliveryPerson />
          </PrivateRouter>
        ),
      },
      // Public routes
      {
        path: "restaurant-contract",
        element: (
          <PublicRouter>
            <RestaurantRequestForm />
          </PublicRouter>
        ),
      },
      {
        path: "delivery-contract",
        element: (
          <PublicRouter>
            <DeliveryRequestForm />
          </PublicRouter>
        ),
      },
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
