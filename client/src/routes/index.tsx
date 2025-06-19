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
import CustomerOrdersPage from "../pages/orderTableCustomer";
import FoodOrderComponent from "../pages/foodOrderPage";
import MenuPage from "../pages/restaurant/MenuPage";
import MealsPage from "../pages/restaurant/MealsPage";

export const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/items"} />,
  },
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/order/customer",
        element: (
          <PrivateRouter roles={[UserRole.CUSTOMER]}>
            <CustomerOrdersPage />
          </PrivateRouter>
        ),
      },
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
        element: <Unauthorized />,
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
      {
        path: "/items",
        element: <FoodOrderComponent />,
      },

      {
        path: "restaurant/:restaurantId/menus",
        element: (
          <PrivateRouter roles={[UserRole.RESTAURANT_OWNER]}>
            <MenuPage />
          </PrivateRouter>
        ),
      },
      {
        path: "restaurant/:restaurantId/meals",
        element: (
          <PrivateRouter roles={[UserRole.RESTAURANT_OWNER]}>
            <MealsPage />
          </PrivateRouter>
        ),
      },
    ],
  },
]);
