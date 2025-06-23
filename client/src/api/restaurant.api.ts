import { httpGet, httpPost, httpDelete, httpPatch } from './http';

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

export const getRestaurantOrders = (restaurantId: string | number, page = 1, pageSize = 10) =>
  httpGet(`/restaurants/${restaurantId}/orders?page=${page}&pageSize=${pageSize}`);

export const updateOrderStatus = (restaurantId: string | number, orderId: string | number, status: string) =>
  httpPatch(`/restaurants/${restaurantId}/orders/${orderId}`, { status });

export const getRestaurantProfile = () => httpGet('/restaurants/profile/mine');

export const updateRestaurantProfile = (data: any) => httpPatch('/restaurants/profile/mine', data);

export const getOrderById = (restaurantId: string | number, orderId: string | number) =>
  httpGet(`/restaurants/${restaurantId}/orders/${orderId}`);

export const getRestaurantStatistics = (restaurantId: string | number, from?: string, to?: string) => {
  let url = `/restaurants/${restaurantId}/statistics`;
  const params = [];
  if (from) params.push(`from=${encodeURIComponent(from)}`);
  if (to) params.push(`to=${encodeURIComponent(to)}`);
  if (params.length) url += `?${params.join('&')}`;
  return httpGet(url);
}; 