import { redirect } from 'next/navigation';
import { BarChart3, ShieldCheck, Search } from 'lucide-react';
import { getSessionUser } from '@/lib/auth';
import { DashboardShell, PageHeader, StatsRow } from '@/components/lumen-marketplace';
import { Stat } from '@santi020k/lumen-react';
import '@santi020k/lumen-react/styles.css';

export const dynamic = 'force-dynamic';
const searchRows = [
  ['istanbul catering', '12.450', '4.8'], ['kadıköy catering', '8.500', '11.4'], ['düğün catering fiyatları', '6.210', '7.2'], ['vegan catering', '4.880', '5.9'],
];

export default async function Admin() {
  const user = await getSessionUser();
  if (!user || !['ADMIN', 'SUPER_ADMIN'].includes(user.role)) redirect('/giris');
  return <DashboardShell role="Admin" active="Dashboard">
    <PageHeader eyebrow="Operations" title="Dashboard" description="CateFind platformunun operasyon, kullanıcı, firma ve talep performansını tek ekrandan izleyin." />
    <StatsRow items={[{label:'Toplam Firma',value:'245'},{label:'Toplam Kullanıcı',value:'1.234'},{label:'Toplam Talep',value:'567'},{label:'Toplam Teklif',value:'890'}]} />
    <div className="mt-8 grid gap-6 xl:grid-cols-2">
      <section className="card bg-white p-6"><div className="flex items-center justify-between"><div><h2 className="text-xl font-bold">Son 6 Ay Talep Grafiği</h2><p className="muted mt-1 text-sm">Marketplace hareketliliği</p></div><BarChart3 className="text-cf-primary"/></div><div className="mt-8 flex h-56 items-end gap-3">{[42,55,48,68,61,84,92].map((h,i)=><div key={i} className="flex-1 rounded-t-lg bg-cf-primary" style={{height:`${h}%`}}/>)}</div><div className="mt-3 flex justify-between text-xs muted"><span>Mar</span><span>Nis</span><span>May</span><span>Haz</span><span>Tem</span><span>Ağu</span><span>Eyl</span></div></section>
      <section className="card bg-white p-6"><div className="flex items-center gap-2"><Search className="text-cf-primary"/><div><h2 className="text-xl font-bold">Son Kayıt Olan Firmalar</h2><p className="muted mt-1 text-sm">Son 7 gün</p></div></div><div className="mt-6 space-y-4">{['Evin Yemekleri','Şefin Sofrası','Anadolu Catering','Marin Food'].map((name,i)=><div key={name} className="flex items-center justify-between border-b border-cf-border pb-4"><div><b>{name}</b><div className="mt-1 text-xs muted">{i+1} gün önce · İstanbul</div></div><span className="rounded-full bg-cf-accent px-2.5 py-1 text-xs font-bold text-cf-primary">Onay bekliyor</span></div>)}</div></section>
    </div>
    <section className="mt-6 card bg-white p-6"><h2 className="text-xl font-bold">SEO & Search Intelligence</h2><div className="mt-5 grid gap-3">{searchRows.map(([q,imp,pos])=><div key={q} className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-cf-border pb-3 text-sm"><b>{q}</b><span className="muted">{imp} gösterim</span><span className="font-bold text-cf-primary">{pos}</span></div>)}</div><div className="mt-5 rounded-xl bg-cf-accent p-4 text-sm"><ShieldCheck size={17} className="mr-2 inline text-cf-primary"/><b>Fırsat:</b> “kadıköy catering” landing page optimizasyonu için önceliklendirilebilir.</div></section>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Stat label="Yeni Firma Başvuruları" value="18"/><Stat label="Bekleyen Yorumlar" value="24"/><Stat label="Açık Talepler" value="67"/><Stat label="Platform Dönüşümü" value="8.4%"/></div>
  </DashboardShell>;
}
