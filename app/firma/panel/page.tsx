import Link from 'next/link';
import { BarChart3, FileText, Heart, MessageCircle, Plus, Send, Settings, Star, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Kpi = [string, string, string, LucideIcon];
type Action = [string, LucideIcon];
type Summary = [string, string, string, LucideIcon];

export default function CompanyDashboard() {
  const kpis: Kpi[] = [
    ['Profil görüntülenme', '2.840', '+18%', Users],
    ['Teklif talepleri', '48', '+12%', FileText],
    ['Gönderilen teklifler', '31', '+9%', Send],
    ['Kazanılan', '11', '+22%', Star]
  ];
  const summaries: Summary[] = [
    ['Teklif Talepleri', '8 yeni talep', 'Yeni leadleri incele', FileText],
    ['Mesajlar', '3 okunmamış', 'Gelen kutusuna git', MessageCircle],
    ['Yorumlar', '4.8 puan', 'Yanıt bekleyen 2 yorum', Star]
  ];
  const actions: Action[] = [
    ['İlanlarım', FileText], ['Teklif Talepleri', Send], ['Mesajlar', MessageCircle], ['Yorumlar', Star],
    ['Favoriler', Heart], ['İstatistikler', BarChart3], ['Aboneliğim', Users], ['Ayarlar', Settings]
  ];

  return <main className="min-h-screen"><div className="container py-7"><div className="flex flex-col md:flex-row gap-5 md:items-center md:justify-between"><div><div className="eyebrow">Firma Paneli</div><h1 className="text-3xl font-bold mt-1">Hoş geldin, Lezzet Park 👋</h1><p className="muted mt-1">Bugün işletmeni büyütmek için iyi bir gün.</p></div><Link href="/firma/panel/ilan-yeni" className="btn btn-primary"><Plus size={18}/>Yeni İlan</Link></div><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">{kpis.map(([t,v,d,I])=><div className="card p-5" key={t}><I size={18} className="text-cf-primary"/><div className="text-sm muted mt-4">{t}</div><div className="text-2xl font-bold mt-1">{v}</div><div className="text-xs text-cf-primary font-bold mt-1">{d} bu ay</div></div>)}</div><div className="grid lg:grid-cols-[1fr_340px] gap-6 mt-6"><section className="card p-6"><div className="flex justify-between items-center"><div><h2 className="font-bold text-xl">Lead performansı</h2><p className="muted text-sm mt-1">Son 30 gün</p></div><BarChart3 className="text-cf-primary"/></div><div className="h-56 mt-6 flex items-end gap-2 border-b border-cf-border">{[32,44,38,55,48,67,52,72,61,78,70,88,81,93].map((h,i)=><div key={i} className="flex-1 bg-cf-primary/15 rounded-t-md relative" style={{height:`${h}%`}}><div className="absolute inset-x-0 bottom-0 h-1/2 bg-cf-primary rounded-t-md opacity-70"/></div>)}</div><div className="flex justify-between text-xs muted mt-2"><span>14 gün önce</span><span>Bugün</span></div></section><aside className="card p-6"><h2 className="font-bold text-xl">Profil tamamlanma</h2><div className="text-4xl font-bold mt-4">88%</div><div className="h-2 bg-cf-accent rounded-full mt-3"><div className="h-2 bg-cf-primary rounded-full w-[88%]"/></div><p className="text-sm muted mt-4">Google bağlantısı ve video ekleyerek profilini %100'e çıkar.</p><button className="btn btn-secondary w-full mt-5">Profili tamamla</button></aside></div><div className="grid md:grid-cols-3 gap-4 mt-6">{summaries.map(([a,b,c,I])=><div className="card p-5" key={a}><I className="text-cf-primary" size={20}/><h3 className="font-bold mt-4">{a}</h3><div className="text-lg font-bold mt-1">{b}</div><div className="text-sm muted mt-1">{c}</div></div>)}</div><nav className="card p-5 mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-sm">{actions.map(([x,I])=><Link href="#" key={x} className="p-3 rounded-xl hover:bg-cf-bg flex flex-col gap-2 font-medium"><I size={17}/>{x}</Link>)}</nav></div></main>;
}
