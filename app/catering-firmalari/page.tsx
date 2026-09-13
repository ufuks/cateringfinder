import Link from 'next/link';
import { MapPin, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Header } from '@/components/header';
import { MarketplaceFilters, FirmCard, PageHeader } from '@/components/lumen-marketplace';
import { SearchField, Stat } from '@santi020k/lumen-react';
import '@santi020k/lumen-react/styles.css';

export default function Firms() {
  return <>
    <Header />
    <main className="container py-10">
      <PageHeader eyebrow="Marketplace" title="Catering Firmaları" description="Şehrine, hizmetine, etkinlik türüne ve bütçene göre doğrulanmış catering firmalarını keşfet." />
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <MarketplaceFilters />
        <section>
          <div className="card mb-5 flex flex-col gap-3 p-3 md:flex-row md:items-center">
            <SearchField placeholder="Firma, hizmet veya kategori ara" className="min-h-11 flex-1" />
            <div className="flex h-11 items-center gap-2 rounded-lg border border-cf-border px-3 text-sm"><MapPin size={16}/> İstanbul</div>
            <select className="h-11 rounded-lg border border-cf-border bg-white px-3 text-sm"><option>En Çok Tercih Edilen</option><option>En yüksek puan</option><option>En hızlı cevap</option><option>En yeni</option></select>
          </div>
          <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
            <Stat label="Catering Firması" value="245" />
            <Stat label="Doğrulanmış" value="198" />
            <Stat label="Ortalama Puan" value="4.8" />
            <Stat label="Hızlı Yanıt" value="< 30 dk" />
          </div>
          <div className="mb-4 flex items-center justify-between"><span className="text-sm muted">245 catering firması bulundu</span><span className="flex items-center gap-1 text-sm font-bold text-cf-primary"><Sparkles size={15}/> Önerilen</span></div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{[...Array(6)].map((_,i)=><FirmCard key={firms[i].slug} firm={firms[i]}/>)}</div>
        </section>
      </div>
    </main>
  </>;
}

const firms = [
  { name: 'Lezzet Durağı Catering', slug: 'lezzet-duragi-catering', city: 'İstanbul', rating: 4.8, reviews: 120, response: 18, price: 42500, tags: ['Düğün & Davet','Kurumsal'], image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=85' },
  { name: 'Evin Yemekleri', slug: 'evin-yemekleri', city: 'İstanbul', rating: 4.6, reviews: 98, response: 24, price: 38500, tags: ['Ev Yemekleri','Kurumsal'], image: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=1200&q=85' },
  { name: 'Şefin Sofrası', slug: 'sefin-sofrasi', city: 'İstanbul', rating: 4.9, reviews: 210, response: 20, price: 62000, tags: ['VIP Catering','Özel Etkinlik'], image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1200&q=85' },
  { name: 'Anadolu Catering', slug: 'anadolu-catering', city: 'İstanbul', rating: 4.8, reviews: 190, response: 16, price: 36000, tags: ['Toplu Yemek','Kurumsal'], image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=85' },
  { name: 'Marin Food', slug: 'marin-food', city: 'İstanbul', rating: 4.8, reviews: 76, response: 28, price: 51000, tags: ['Kokteyl','Düğün & Davet'], image: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=1200&q=85' },
  { name: 'Gurme Tabak', slug: 'gurme-tabak', city: 'İstanbul', rating: 4.7, reviews: 84, response: 22, price: 45000, tags: ['Özel Etkinlik','VIP Catering'], image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=85' },
];
