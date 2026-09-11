import { Header } from '@/components/header';
import { Heart, Search } from 'lucide-react';
import Link from 'next/link';

export default function FavoritesPage() {
  return <><Header/><main className="container py-12"><div className="max-w-2xl"><div className="eyebrow">Favorilerim</div><h1 className="text-4xl font-bold mt-2">Kaydettiğin firmalar</h1><p className="muted mt-3">Beğendiğin catering firmalarını daha sonra kolayca karşılaştır.</p></div><section className="card p-10 mt-10 text-center"><div className="mx-auto w-14 h-14 rounded-2xl bg-cf-accent grid place-items-center text-cf-primary"><Heart size={24}/></div><h2 className="font-bold text-xl mt-5">Henüz favorin yok</h2><p className="muted mt-2 max-w-md mx-auto">Catering firmalarını keşfetmeye başla; ilgini çeken firmaları favorilerine ekleyebilirsin.</p><Link href="/catering-firmalari" className="btn btn-primary mt-6"><Search size={17}/>Firmaları keşfet</Link></section></main></>;
}
