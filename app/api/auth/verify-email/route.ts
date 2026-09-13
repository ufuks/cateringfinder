import crypto from 'node:crypto';
import {NextResponse} from 'next/server';
import {db} from '@/lib/db';

const hash=(token:string)=>crypto.createHash('sha256').update(token).digest('hex');

export async function GET(req:Request){
  const token=new URL(req.url).searchParams.get('token');
  if(!token) return NextResponse.json({error:'Doğrulama tokenı eksik.'},{status:400});
  const rows=await db.systemSetting.findMany({where:{key:{startsWith:'email-verification:'}}});
  const record=rows.find((item)=>{const value=item.value as {tokenHash?:string;expiresAt?:string}; return value.tokenHash===hash(token) && !!value.expiresAt && new Date(value.expiresAt).getTime()>Date.now();});
  if(!record) return NextResponse.json({error:'Token geçersiz veya süresi dolmuş.'},{status:400});
  const userId=record.key.replace('email-verification:','');
  await db.$transaction([db.user.update({where:{id:userId},data:{emailVerifiedAt:new Date()}}),db.systemSetting.delete({where:{id:record.id}})]);
  return NextResponse.json({ok:true,message:'E-posta adresiniz doğrulandı. Artık giriş yapabilirsiniz.'});
}
