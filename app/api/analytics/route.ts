import {NextResponse} from 'next/server';
import {db} from '@/lib/db';
import {getSessionUser} from '@/lib/auth';
import {analyticsEventSchema} from '@/lib/validation';
const WINDOW_MS=60000; const MAX_EVENTS_PER_WINDOW=60; const buckets=new Map<string,{startedAt:number;count:number}>();
function rateLimitKey(req:Request,sessionId:string){const forwarded=req.headers.get('x-forwarded-for');const ip=forwarded?.split(',')[0]?.trim()||req.headers.get('x-real-ip')||'unknown';return `${ip}:${sessionId}`;}
function allowedEvent(name:string){return /^(page_view|search|listing_view|lead_submit|quote_view|quote_accept|favorite|message_send|review_submit)(\.[a-z0-9_-]+)?$/.test(name);}
function consumeRateLimit(key:string){const now=Date.now();for(const [k,v] of buckets){if(now-v.startedAt>=WINDOW_MS)buckets.delete(k);}const bucket=buckets.get(key);if(!bucket){buckets.set(key,{startedAt:now,count:1});return true;}if(bucket.count>=MAX_EVENTS_PER_WINDOW)return false;bucket.count++;return true;}
export async function POST(req:Request){try{const body=analyticsEventSchema.parse(await req.json());if(!allowedEvent(body.name))return NextResponse.json({error:'Desteklenmeyen event.'},{status:400});if(!consumeRateLimit(rateLimitKey(req,body.sessionId)))return NextResponse.json({error:'Çok fazla analytics isteği.'},{status:429});const user=await getSessionUser();const event=await db.analyticsEvent.create({data:{name:body.name,sessionId:body.sessionId,userId:user?.id,entityType:body.entityType,entityId:body.entityId,properties:body.properties}});return NextResponse.json({ok:true,id:event.id});}catch{return NextResponse.json({error:'Invalid event'},{status:400});}}
