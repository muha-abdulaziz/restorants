export enum ROLES_USERS {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
  DELIVERY = "DELIVERY",
}

export type User = {
  email: string;
  username: string;
  role: ROLES_USERS;
};