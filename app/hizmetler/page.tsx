import { Header } from '@/components/header';
import Link from 'next/link';
import { ArrowRight, BriefcaseBusiness, CakeSlice, Coffee, GlassWater, HeartHandshake, Utensils } from 'lucide-react';

const services = [
  ['Kurumsal Yemek', 'Ofis, fabrika ve çalışan yemekleri için düzenli catering çözümleri.', BriefcaseBusiness],
  ['Düğün & Davet', 'Düğün, nişan, davet ve özel günler için uçtan uca organizasyon.', HeartHandshake],
  ['Toplantı & Seminer', 'Toplantı, eğitim ve seminerler için zamanında teslimat ve servis.', Coffee],
  ['Kokteyl & Davet', 'Kokteyl, lansman ve networking etkinlikleri için pratik menüler.', GlassWater],
  ['Tatlı & Pastane', 'Kutlama ve etkinliklere uygun pasta, tatlı ve ikram seçenekleri.', CakeSlice],
  ['Özel Menü', 'Vegan, vejetaryen, helal ve özel beslenme ihtiyaçlarına uygun seçenekler.', Utensils]
] as const;

export default function ServicesPage() {
  return <><Header/><main className="container py-12"><div className="max-w-3xl"><div className="eyebrow">Hizmetler</div><h1 className="text-4xl font-bold mt-2">Etkinliğine uygun catering hizmetini bul</h1><p className="muted mt-4 text-lg leading-7">İhtiyacını paylaş, uygun catering firmalarını keşfet ve teklifleri tek yerde karşılaştır.</p></div><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">{services.map(([title,description,Icon])=><article className="card p-6" key={title}><div className="w-11 h-11 rounded-xl bg-cf-accent grid place-items-center text-cf-primary"><Icon size={21}/></div><h2 className="font-bold text-xl mt-5">{title}</h2><p className="muted mt-2 leading-6">{description}</p><Link href={`/catering-firmalari?category=${encodeURIComponent(title)}`} className="inline-flex items-center gap-1 text-cf-primary font-bold text-sm mt-5">Firmaları gör <ArrowRight size={16}/></Link></article>)}</div></main></>;
}
