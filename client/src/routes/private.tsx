import { Navigate } from "react-router-dom";
import { useUserAccount } from "../hooks/useAccount";
import MenuPage from '../pages/restaurant/MenuPage';
import MealsPage from '../pages/restaurant/MealsPage';

interface PrivateRouterWithProps {
  children?: React.ReactNode;
  roles?: string[];
}

export const PrivateRouter = ({ children, roles }: PrivateRouterWithProps) => {
  const { isAuthenticated } = useUserAccount();

  if (!isAuthenticated()) {
    return <Navigate to={"/login"}></Navigate>;
  }

  const role = sessionStorage.getItem("role");

  if (role && !roles?.includes(role)) {
    return <Navigate to={"/error"}></Navigate>;
  }

  return <>{children}</>;
};
