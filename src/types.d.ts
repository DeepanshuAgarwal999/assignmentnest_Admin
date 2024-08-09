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

  declare interface AppNotification {
    notification_id: string;
    message: string;
    description: string;
    notification_type: NotificationType;
    action: string;
    dataId: string;
    referer: string;
    created_at: number;
  }
  
  declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
  };