export const QUOTE_TRANSITIONS={DRAFT:['SENT','CANCELLED'],SENT:['VIEWED','ACCEPTED','REJECTED','EXPIRED','CANCELLED'],VIEWED:['ACCEPTED','REJECTED','EXPIRED'],ACCEPTED:[],REJECTED:[],EXPIRED:[],CANCELLED:[]} as const;
export function canTransition(from:keyof typeof QUOTE_TRANSITIONS,to:string){return (QUOTE_TRANSITIONS[from] as readonly string[]).includes(to)}
