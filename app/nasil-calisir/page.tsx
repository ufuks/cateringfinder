import { Header } from '@/components/header';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, MessageSquareQuote, Search, Send } from 'lucide-react';

const steps = [
  ['01', 'İhtiyacını anlat', 'Etkinlik türü, tarih, kişi sayısı, şehir ve bütçe gibi temel bilgileri paylaş.', Search],
  ['02', 'Uygun firmaları bul', 'CateFind talebine uygun firmaları eşleştirerek seçenekleri karşılaştırmanı kolaylaştırır.', CheckCircle2],
  ['03', 'Teklifleri karşılaştır', 'Gelen fiyat, menü, hizmet ve koşulları tek ekranda incele.', Send],
  ['04', 'Mesajlaş ve karar ver', 'Firma ile iletişim kur, detayları netleştir ve sana en uygun seçimi yap.', MessageSquareQuote]
] as const;

export default function HowItWorksPage() {
  return <><Header/><main className="container py-12"><div className="max-w-3xl"><div className="eyebrow">Nasıl Çalışır?</div><h1 className="text-4xl font-bold mt-2">Catering bulmak dört basit adım</h1><p className="muted mt-4 text-lg leading-7">Karmaşık telefon trafiği yerine ihtiyacını tek seferde paylaş, teklifleri düzenli biçimde değerlendir.</p></div><div className="grid md:grid-cols-2 gap-5 mt-10">{steps.map(([n,title,description,Icon])=><article className="card p-7" key={n}><div className="flex items-center justify-between"><span className="text-cf-primary font-bold">{n}</span><Icon className="text-cf-primary" size={22}/></div><h2 className="text-2xl font-bold mt-6">{title}</h2><p className="muted mt-2 leading-7">{description}</p></article>)}</div><div className="card bg-cf-dark text-white p-8 mt-8"><h2 className="text-2xl font-bold">Hazırsan başlayalım.</h2><p className="text-white/70 mt-2">Etkinliğini anlat, uygun firmaları bul ve teklif almaya başla.</p><Link href="/firma-ariyorum" className="btn bg-white text-cf-dark mt-6">Catering Talebi Oluştur <ArrowRight size={17}/></Link></div></main></>;
}
