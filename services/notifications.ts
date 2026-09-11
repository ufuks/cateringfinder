import {db} from '@/lib/db';
export async function notify(userId:string,type:'NEW_LEAD'|'NEW_QUOTE'|'QUOTE_ACCEPTED'|'NEW_MESSAGE'|'NEW_REVIEW',title:string,body:string){return db.notification.create({data:{userId,type,title,body}})}
