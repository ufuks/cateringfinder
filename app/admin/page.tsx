import { redirect } from 'next/navigation';
import { Building2, FileText, TrendingUp, Users } from 'lucide-react';
import { getSessionUser } from '@/lib/auth';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function Admin() {
  const user = await getSessionUser();
  if (!user || !['ADMIN', 'SUPER_ADMIN'].includes(user.role)) redirect('/giris');
  const [companies, customers, leads, payments] = await Promise.all([
    db.company.count({where:{deletedAt:null}}),
    db.user.count({where:{role:'CUSTOMER'}}),
    db.lead.count(),
    db.subscriptionPayment.aggregate({where:{status:'SUCCESS'},_sum:{amount:true}}),
  ]);
  const kpis = [
    ['Toplam firma', companies, Building2],
    ['Aktif müşteri', customers, Users],
    ['Toplam lead', leads, FileText],
    ['Başarılı ödeme toplamı', `₺${Number(payments._sum.amount ?? 0).toLocaleString('tr-TR')}`, TrendingUp],
  ] as const;
  return <main className="min-h-screen bg-cf-dark text-white"><div className="container py-8"><header><div className="text-cf-accent text-xs font-bold uppercase tracking-widest">Operations</div><h1 className="text-3xl font-bold mt-2">CateFind Admin</h1><p className="text-white/60 text-sm mt-2">Canlı veritabanı özeti</p></header><section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8" aria-label="KPI özeti">{kpis.map(([title,value,Icon])=><div className="rounded-2xl bg-white/5 border border-white/10 p-5" key={title}><Icon className="text-cf-accent" size={19}/><div className="text-white/60 text-sm mt-4">{title}</div><div className="text-2xl font-bold mt-1">{typeof value==='number'?value.toLocaleString('tr-TR'):value}</div></div>)}</section></div></main>;
}
