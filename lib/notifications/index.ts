export type NotificationChannel='IN_APP'|'EMAIL'|'PUSH'|'SMS';
export interface NotificationDispatcher{dispatch(input:{userId:string;type:string;title:string;body:string;channels:NotificationChannel[]}):Promise<void>}
