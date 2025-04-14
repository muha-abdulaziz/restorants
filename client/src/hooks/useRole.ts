import { useEffect, useState } from "react";
import { getRole } from "../helpers/auth";
import { ROLES_USERS as ROLE } from "../common/types";



export const useUserRole = () => {
  const [role, setRole] = useState<string>(ROLE.CLIENT);

  useEffect(() => {
    const role = getRole();
    if (role) {
      setRole(role);
    }
  }, []);

  const isAdmin = () => {
    return role === ROLE.ADMIN;
  };
  const isClient = () => {
    return role === ROLE.CLIENT;
  };
  const isDelivery = () => {
    return role === ROLE.DELIVERY;
  };

  return { isAdmin, isClient, isDelivery };
};
