import { Header } from '@/components/header';
import { ArrowRight, BookOpen } from 'lucide-react';

const posts = [
  ['Catering seçerken dikkat edilmesi gereken 7 nokta', 'Menüden servis kalitesine kadar doğru catering firmasını seçmek için pratik bir kontrol listesi.', 'Rehber'],
  ['Kişi sayısına göre catering bütçesi nasıl planlanır?', 'Etkinlik bütçesini gerçekçi kurmak ve teklifleri adil biçimde karşılaştırmak için temel yaklaşım.', 'Bütçe'],
  ['Kurumsal yemek hizmetinde doğru firmayı bulma', 'Düzenli çalışan yemekleri için kapasite, teslimat ve operasyon kriterlerini birlikte değerlendirin.', 'Kurumsal']
] as const;

export default function BlogPage() {
  return <><Header/><main className="container py-12"><div className="max-w-3xl"><div className="eyebrow">CateFind Blog</div><h1 className="text-4xl font-bold mt-2">Catering hakkında faydalı bilgiler</h1><p className="muted mt-4 text-lg">Etkinlik planlama, catering seçimi ve bütçe yönetimi üzerine rehberler.</p></div><div className="grid lg:grid-cols-3 gap-5 mt-10">{posts.map(([title,excerpt,tag])=><article className="card p-6" key={title}><div className="w-11 h-11 rounded-xl bg-cf-accent grid place-items-center text-cf-primary"><BookOpen size={20}/></div><span className="inline-block text-xs font-bold text-cf-primary mt-5">{tag}</span><h2 className="font-bold text-xl mt-2 leading-7">{title}</h2><p className="muted mt-3 leading-6">{excerpt}</p><button className="inline-flex items-center gap-1 text-cf-primary font-bold text-sm mt-5">Yakında okuyun <ArrowRight size={16}/></button></article>)}</div></main></>;
}
