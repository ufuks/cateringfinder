import {Header} from '@/components/header';
import {CompanyCard} from '@/components/company-card';
import {db} from '@/lib/db';
import {SlidersHorizontal,Search,MapPin} from 'lucide-react';

export const dynamic='force-dynamic';

export default async function Firms(){
  const companies=await db.company.findMany({where:{status:'ACTIVE',verified:true,deletedAt:null},orderBy:[{rating:'desc'},{reviewCount:'desc'}],take:50,include:{profile:{select:{coverUrl:true}}}});
  return <><Header/><main className="container py-10"><div className="max-w-3xl"><div className="eyebrow">Marketplace</div><h1 className="text-4xl font-bold mt-2">Catering Firmaları</h1><p className="muted mt-3">Şehrine, hizmetine ve etkinlik türüne göre doğrulanmış catering firmalarını keşfet.</p></div><div className="mt-8 flex flex-col lg:flex-row gap-6"><aside className="lg:w-64 card p-5 h-fit"><div className="font-bold flex gap-2 items-center"><SlidersHorizontal size={18}/> Filtrele</div><p className="muted text-sm mt-4">Filtreleme arayüzü bir sonraki adımda API sorgularına bağlanabilir.</p></aside><section className="flex-1"><div className="card p-3 flex flex-col sm:flex-row gap-3 mb-5"><div className="flex-1 flex items-center gap-2 px-2"><Search size={18}/><input placeholder="Firma, hizmet veya kategori ara" className="outline-none w-full h-10"/></div><div className="flex items-center gap-2 border rounded-lg px-3"><MapPin size={16}/><span className="text-sm">Tüm şehirler</span></div></div><div className="text-sm muted mb-4">{companies.length} aktif ve doğrulanmış firma bulundu · Önerilen sıralama</div><div className="grid md:grid-cols-2 gap-5">{companies.map((company)=><CompanyCard key={company.slug} company={{name:company.name,slug:company.slug,rating:company.rating,reviewCount:company.reviewCount,responseMinutes:company.responseMinutes,priceFrom:0,city:'',verified:company.verified,cover:company.profile?.coverUrl||'https://images.unsplash.com/photo-1555244162-803834f70033?w=900&q=80'}}/>)}</div></section></div></main></>;
}
