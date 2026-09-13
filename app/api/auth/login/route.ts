import {NextResponse} from 'next/server';
import {db} from '@/lib/db';
import {createSession,verifyPassword} from '@/lib/auth';
import {loginSchema} from '@/lib/validation';

export async function POST(req:Request){
  try {
    const body=loginSchema.parse(await req.json());
    const user=await db.user.findUnique({where:{email:body.email}});
    if(!user?.passwordHash||!verifyPassword(body.password,user.passwordHash)) return NextResponse.json({error:'E-posta veya şifre hatalı.'},{status:401});
    if(!user.emailVerifiedAt) return NextResponse.json({error:'E-posta adresinizi doğrulamanız gerekiyor.'},{status:403});
    await createSession(user.id);
    return NextResponse.json({ok:true,redirect:user.role==='COMPANY'?'/firma/panel':user.role==='ADMIN'||user.role==='SUPER_ADMIN'?'/admin':'/musteri/panel'});
  } catch {
    return NextResponse.json({error:'Geçersiz giriş bilgileri.'},{status:400});
  }
}
