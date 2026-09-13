import {NextResponse} from 'next/server';
import {db} from '@/lib/db';
import {getSessionUser} from '@/lib/auth';
import {notify} from '@/services/notifications';
import {quoteSchema} from '@/lib/validation';

export async function POST(req:Request,{params}:{params:Promise<{leadId:string}>}){
 const user=await getSessionUser();
 if(!user||user.role!=='COMPANY')return NextResponse.json({error:'Yetkisiz.'},{status:403});
 const {leadId}=await params;
 const body=quoteSchema.parse(await req.json());
 const membership=user.companyUsers.find((item)=>item.companyId===body.companyId);
 if(!membership)return NextResponse.json({error:'Bu firmada yetkiniz yok.'},{status:403});
 const match=await db.leadCompanyMatch.findUnique({where:{leadId_companyId:{leadId,companyId:body.companyId}},include:{lead:true}});
 if(!match)return NextResponse.json({error:'Bu lead size ait değil.'},{status:403});
 const quote=await db.quote.create({data:{leadId,companyId:body.companyId,customerId:match.lead.customerId,total:body.total,perPerson:match.lead.people?body.total/match.lead.people:undefined,description:body.description||'',validUntil:body.validUntil?new Date(body.validUntil):undefined,status:'SENT',history:{create:{toStatus:'SENT',actorId:user.id}}}});
 await notify(match.lead.customerId,'NEW_QUOTE','Yeni teklifiniz var',`${body.total.toLocaleString('tr-TR')} TL tutarında yeni teklif aldınız.`);
 return NextResponse.json({ok:true,quoteId:quote.id});
}
