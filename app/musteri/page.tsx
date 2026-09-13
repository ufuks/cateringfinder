import Link from 'next/link';
import { DashboardShell, MiniTable, PageHeader, ProgressBar, StatsRow } from '@/components/lumen-marketplace';
import { ArrowRight, Plus } from 'lucide-react';

export default function CustomerDashboard() {
  return <DashboardShell role="Müşteri" active="Ana Sayfa">
    <PageHeader eyebrow="Müşteri Paneli" title="Hoş geldin, Ahmet!" description="Etkinliklerin için en uygun catering firmalarını keşfet, taleplerini ve tekliflerini tek yerden yönet." />
    <div className="mb-6 flex justify-end"><Link href="/firma-ariyorum" className="btn btn-primary"><Plus size={17}/> Yeni Talep Oluştur</Link></div>
    <StatsRow items={[{label:'Aktif Talep',value:'3'},{label:'Gelen Teklif',value:'12'},{label:'Favori',value:'12'},{label:'Tamamlanan',value:'2'}]} />
    <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_.8fr]">
      <section><div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-bold">Son Taleplerim</h2><Link href="#" className="text-sm font-bold text-cf-primary">Tümünü Gör <ArrowRight size={14} className="inline"/></Link></div><MiniTable rows={[{title:'Şirket Yemeği',meta:'10 Temmuz 2026 · 250 kişi',status:'Teklif Bekleniyor'},{title:'Düğün Organizasyonu',meta:'15 Temmuz 2026 · 180 kişi',status:'3 Teklif'},{title:'Doğum Günü',meta:'5 Ağustos 2026 · 80 kişi',status:'2 Teklif'}]} /></section>
      <section className="card bg-white p-6"><h2 className="text-xl font-bold">Teklif Durumu</h2><p className="muted mt-1 text-sm">Aktif taleplerinin ilerlemesi</p><div className="mt-7 space-y-6"><ProgressBar label="Teklif toplanıyor" value={72}/><ProgressBar label="Karşılaştırma" value={45}/><ProgressBar label="Anlaşma" value={28}/></div></section>
    </div>
  </DashboardShell>;
}
