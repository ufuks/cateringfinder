export const SUBSCRIPTION_STATES=['TRIALING','ACTIVE','PAST_DUE','GRACE_PERIOD','CANCELLED','EXPIRED','SUSPENDED'] as const;
export function premiumAllowed(status:string){return status==='TRIALING'||status==='ACTIVE'}
export function withinLimit(current:number,limit:number){return limit>=999999||current<limit}
