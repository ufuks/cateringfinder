import Link from 'next/link';
import { DashboardShell, MiniTable, PageHeader, ProgressBar, StatsRow } from '@/components/lumen-marketplace';
import { ArrowRight, Plus } from 'lucide-react';

export default function CompanyDashboard() {
  return <DashboardShell role="Firma" active="Ana Sayfa">
    <PageHeader eyebrow="Firma Paneli" title="Hoş geldiniz, Lezzet Durağı Catering!" description="Taleplerinizi yönetin, teklif gönderin ve performansınızı tek panelden takip edin." />
    <StatsRow items={[{label:'Yeni Talep',value:'12'},{label:'Gönderilen Teklif',value:'8'},{label:'Profil Görüntülenme',value:'25'},{label:'Yeni Yorum',value:'4'}]} />
    <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
      <section><div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-bold">Son 30 Gün</h2><button className="text-sm font-bold text-cf-primary">Detaylı Analiz <ArrowRight size={14} className="inline"/></button></div><div className="card bg-white p-6"><div className="mb-5 flex items-end gap-2"><span className="text-3xl font-bold">+24%</span><span className="text-sm font-bold text-cf-primary">dönüşüm</span></div><div className="flex h-44 items-end gap-3">{[28,35,31,46,42,65,58,82,73,94].map((h,i)=><div key={i} className="flex-1 rounded-t-lg bg-cf-primary/80" style={{height:`${h}%`}}/>)}</div><div className="mt-3 flex justify-between text-xs muted"><span>Mar</span><span>Nis</span><span>May</span><span>Haz</span><span>Tem</span><span>Ağu</span></div></div></section>
      <section><div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-bold">Son Talepler</h2><Link href="#" className="text-sm font-bold text-cf-primary">Tümünü Gör</Link></div><MiniTable rows={[{title:'Şirket Yemeği',meta:'250 kişi · 10 Temmuz',status:'Yeni'},{title:'Düğün',meta:'180 kişi · 15 Temmuz',status:'Yeni'},{title:'Okul Yemeği',meta:'300 kişi · 1 Eylül',status:'Görüntüle'}]} /></section>
    </div>
    <div className="mt-6 card bg-white p-6"><h2 className="text-xl font-bold">Profil Kalitesi</h2><div className="mt-5 max-w-2xl"><ProgressBar label="Profil tamamlanma" value={86}/></div></div>
  </DashboardShell>;
}
