import crypto from 'node:crypto';
import {cookies} from 'next/headers';
import {db} from './db';
const COOKIE='catefind_session';
const secret=()=>process.env.SESSION_SECRET||'dev-only-change-me';
export function hashPassword(password:string){return crypto.scryptSync(password,secret(),64).toString('hex')}
export function verifyPassword(password:string,hash:string){return crypto.timingSafeEqual(Buffer.from(hash,'hex'),Buffer.from(hashPassword(password),'hex'))}
export async function createSession(userId:string){const payload=Buffer.from(JSON.stringify({userId,exp:Date.now()+1000*60*60*24*7})).toString('base64url');const sig=crypto.createHmac('sha256',secret()).update(payload).digest('base64url');(await cookies()).set(COOKIE,`${payload}.${sig}`,{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',path:'/',maxAge:604800})}
export async function getSessionUser(){const raw=(await cookies()).get(COOKIE)?.value;if(!raw)return null;const [payload,sig]=raw.split('.');if(!payload||!sig)return null;const expected=crypto.createHmac('sha256',secret()).update(payload).digest('base64url');if(!crypto.timingSafeEqual(Buffer.from(sig),Buffer.from(expected)))return null;const parsed=JSON.parse(Buffer.from(payload,'base64url').toString()) as {userId:string,exp:number};if(parsed.exp<Date.now())return null;return db.user.findUnique({where:{id:parsed.userId},include:{companyUsers:true}})}
