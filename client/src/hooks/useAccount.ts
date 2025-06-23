import { useNavigate } from "react-router-dom";
import { addAuthHeader } from "../api/http";
import {
  getToken,
  removeToken,
  storeToken,
  storeUserData,
  storeRestauranData,
} from "../helpers/auth";
import { useEffect, useState } from "react";

export const useUserAccount = () => {
  const navigate = useNavigate();

  const handleOnLogin = (authResponse: any) => {
    const { access_token, username, role, restaurantId, userId } = authResponse;
    if (access_token) {
      addAuthHeader(access_token);
      storeToken(access_token);
      storeUserData(username, userId, role);
      if (role === 'RESTAURANT_OWNER') {
        storeRestauranData(restaurantId);
        navigate(`/restaurant/${restaurantId || userId}/menus`, { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  };

  const handleOnLogout = () => {
    removeToken();
    navigate("/login", { replace: true });
  };

  const isAuthenticated = (): boolean => {
    return !!getToken();
  };

  return { handleOnLogin, handleOnLogout, isAuthenticated };
};
