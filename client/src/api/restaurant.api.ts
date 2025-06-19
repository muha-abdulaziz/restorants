import { httpGet, httpPost, httpDelete } from './http';

// Menu APIs
export const getMenus = (restaurantId: string | number) =>
  httpGet(`/restaurants/${restaurantId}/menus`);

export const createMenu = (restaurantId: string | number, data: any) =>
  httpPost(`/restaurants/${restaurantId}/menus`, data);

export const deleteMenu = (restaurantId: string | number, menuId: string | number) =>
  httpDelete(`/restaurants/${restaurantId}/menus/${menuId}`);

// Meal APIs
export const getMeals = (restaurantId: string | number) =>
  httpGet(`/restaurants/${restaurantId}/meals`);

export const createMeal = (restaurantId: string | number, data: any) =>
  httpPost(`/restaurants/${restaurantId}/meals`, data);

export const deleteMeal = (restaurantId: string | number, mealId: string | number) =>
  httpDelete(`/restaurants/${restaurantId}/meals/${mealId}`); 