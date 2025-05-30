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
import { Unauthorized } from "../pages/unauthorizedPage";
import { UserRole } from "../common/types/enum";
import { UsersPage } from "../pages/userMPage";

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
          <PrivateRouter roles={[UserRole.ADMIN]}>
            <AdminRequestsPage />
          </PrivateRouter>
        ),
      },
      {
        path: "users",
        element: (
          <PrivateRouter roles={[UserRole.ADMIN]}>
            <UsersPage />
          </PrivateRouter>
        ),
      },
      {
        path: "shipment",
        element: (
          <PrivateRouter roles={[UserRole.DELIVERY]}>
            <ShipmentsTable />
          </PrivateRouter>
        ),
      },
      {
        path: "order-queue",
        element: (
          <PrivateRouter roles={[UserRole.DELIVERY]}>
            <OrdersQueueDeliveryPerson />
          </PrivateRouter>
        ),
      },
      // Public routes
      {
        path: "error",
        element: (<Unauthorized/>),
      },
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
