import Link from 'next/link';
import { Bell, FileText, Heart, MessageCircle, Scale, Star } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type QuickAction = [string, LucideIcon, string];

export default function CustomerDashboard() {
  const quickActions: QuickAction[] = [
    ['Yeni catering talebi', FileText, '/firma-ariyorum'],
    ['Karşılaştır', Scale, '/catering-firmalari'],
    ['Favorilerim', Heart, '/favorilerim'],
    ['Mesajlar', MessageCircle, '#'],
    ['Bildirimler', Bell, '#']
  ];

  return <main className="min-h-screen"><div className="container py-8"><div className="eyebrow">Müşteri Paneli</div><h1 className="text-3xl font-bold mt-2">Taleplerim</h1><div className="grid lg:grid-cols-[1fr_320px] gap-6 mt-7"><section className="grid gap-4"><div className="card p-5"><div className="flex justify-between"><div><span className="text-xs font-bold text-cf-primary">AÇIK TALEP</span><h2 className="font-bold text-xl mt-1">Kadıköy'de 300 kişilik düğün</h2><p className="muted text-sm mt-1">12 Ekim · İstanbul · 300 kişi</p></div><span className="bg-cf-accent rounded-full px-3 py-1 h-fit text-xs font-bold">4 firma eşleşti</span></div><div className="flex flex-wrap gap-2 mt-5"><Link href="/catering-firmalari" className="btn btn-primary">Teklifleri Gör</Link><Link href="#" className="btn btn-secondary">Mesajlar</Link></div></div><div className="card p-5"><div className="text-xs font-bold muted">SON TEKLİF</div><div className="flex items-center justify-between mt-2"><div><h2 className="font-bold">Premium Catering</h2><div className="flex gap-1 text-cf-primary mt-1"><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14}/></div></div><strong className="text-xl">₺68.500</strong></div><div className="mt-4 text-sm muted">Menü + servis + kurulum dahil · 30 Eylül'e kadar geçerli</div></div></section><aside className="card p-5"><h2 className="font-bold">Hızlı erişim</h2><div className="grid gap-2 mt-4">{quickActions.map(([x,I,href])=><Link href={href} key={x} className="p-3 rounded-xl hover:bg-cf-bg flex gap-3 items-center text-sm font-medium"><I size={17}/>{x}</Link>)}</div></aside></div></div></main>;
}
