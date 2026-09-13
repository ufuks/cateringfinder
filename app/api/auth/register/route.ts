import crypto from 'node:crypto';
import {NextResponse} from 'next/server';
import {db} from '@/lib/db';
import {hashPassword} from '@/lib/auth';
import {registerSchema} from '@/lib/validation';

const VERIFICATION_TTL_MS = 1000 * 60 * 60 * 24;
const tokenHash = (token:string) => crypto.createHash('sha256').update(token).digest('hex');

export async function POST(req:Request){
  try {
    const body=registerSchema.parse(await req.json());
    const email=body.email.toLowerCase();
    const exists=await db.user.findUnique({where:{email}});
    if(exists)return NextResponse.json({error:'Bu e-posta zaten kayıtlı.'},{status:409});
    const user=await db.user.create({data:{name:body.name,email,passwordHash:hashPassword(body.password),role:body.role}});
    if(body.role==='COMPANY'){
      const company=await db.company.create({data:{name:body.name,slug:`${body.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')}-${user.id.slice(-5)}`,status:'PENDING'}});
      await db.companyUser.create({data:{companyId:company.id,userId:user.id}});
      await db.companyProfile.create({data:{companyId:company.id}});
    }else await db.customerProfile.create({data:{userId:user.id}});
    const token=crypto.randomBytes(32).toString('hex');
    await db.systemSetting.create({data:{key:`email-verification:${user.id}`,value:{tokenHash:tokenHash(token),expiresAt:new Date(Date.now()+VERIFICATION_TTL_MS).toISOString()}}});
    const verificationUrl=`${process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000'}/api/auth/verify-email?token=${token}`;
    console.info('[email-verification]',{to:email,verificationUrl});
    return NextResponse.json({ok:true,verificationRequired:true,verificationUrl:process.env.NODE_ENV==='production'?undefined:verificationUrl});
  } catch {
    return NextResponse.json({error:'Kayıt bilgileri geçersiz.'},{status:400});
  }
}
