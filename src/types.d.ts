declare interface UserTokenType {
  iss: string;
  sub: string;
  accountId: string;
  exp: number;
  iat: number;
  scope: "ADMIN" | "MANAGER";
  account_name?: string;
}
declare interface UserLoginType {
  email: string;
  password: string;
}
declare interface APIResponse<T> {
  message: string;
  data: T;
  creation_time: string;
}
declare type OrderStatusType =
  | "UNQUOTED"
  | "QUOTED"
  | "CREATED"
  | "PROCESSING"
  | "ASSIGNED"
  | "COMPLETED"
  | "REWORK"
  | "CANCELLED"
  | "REFUNDED"
  | "UPLOADED";
