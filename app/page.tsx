import Link from 'next/link';
import { ArrowRight, BadgeCheck, BarChart3, ChevronRight, ShieldCheck, Star, Utensils, Users } from 'lucide-react';
import { Header } from '@/components/header';

const images = [
  'https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=80',
  'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=900&q=80',
  'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=900&q=80',
];
const categories = ['Kurumsal Yemek','Düğün & Davet','Toplantı & Seminer','Okul Yemekleri','VIP Catering','Kokteyl','Kahvaltı','Food Truck'];
const companies = [['Lezzet Park Catering','4.8','İstanbul','lezzet-park-catering'],['Gurme Catering','4.7','Ankara','gurme-catering'],['Premium Catering','4.6','İzmir','premium-catering']];

export default function Home(){
  return <><Header/><main>
    <section className="hero"><div className="container hero-grid"><div>
      <div className="eyebrow">Catering keşfinin yeni adresi</div>
      <h1>En iyi catering firmaları <span>tek yerde!</span></h1>
      <p>İhtiyacını belirt, catering firmalarından teklif al, karşılaştır ve en doğru seçimi yap.</p>
      <div className="hero-actions"><Link href="/firma-ariyorum" className="btn btn-light">Catering Talebi Oluştur <ArrowRight size={18}/></Link><Link href="/catering-firmalari" className="btn" style={{border:'1px solid rgba(255,255,255,.25)',color:'#fff'}}>Firmaları Keşfet</Link></div>
      <div className="hero-points"><span>✓ Doğrulanmış Firmalar</span><span>✓ Güvenli Teklif Sistemi</span><span>★ Gerçek Müşteri Yorumları</span></div>
    </div><div className="hero-img"><img src={images[0]} alt="Catering etkinlik sunumu"/></div></div></section>

    <section className="container quote"><div className="quote-card">
      <div className="field"><label>NEYE İHTİYACIN VAR?</label><select defaultValue=""><option value="" disabled>Etkinlik türü seçin</option><option>Düğün & Davet</option><option>Kurumsal Yemek</option><option>Özel Etkinlik</option></select></div>
      <div className="field"><label>NERESİ?</label><input placeholder="Şehir veya ilçe"/></div><div className="field"><label>KAÇ KİŞİ?</label><input type="number" min="1" placeholder="Örn. 150"/></div><Link href="/firma-ariyorum" className="btn btn-green">Teklif Al <ArrowRight size={17}/></Link>
    </div></section>

    <section className="container section"><div className="section-head"><div><div className="eyebrow">Keşfet</div><h2>İhtiyacına göre catering</h2></div><Link href="/catering-firmalari" className="btn btn-soft">Tüm kategoriler <ChevronRight size={17}/></Link></div>
      <div className="grid-4">{categories.map(x=><Link key={x} href={`/catering-firmalari?category=${encodeURIComponent(x)}`} className="card category"><div className="category-icon"><Utensils size={19}/></div><h3>{x}</h3><div className="muted" style={{fontSize:13}}>Firmaları keşfet</div></Link>)}</div>
    </section>

    <section className="container section"><div className="section-head"><div><div className="eyebrow">Editör seçimi</div><h2>Öne çıkan catering firmaları</h2></div><Link href="/catering-firmalari" className="btn btn-soft">Hepsini gör →</Link></div>
      <div className="grid-3">{companies.map(([name,rating,city,slug],i)=><Link href={`/firma/${slug}`} key={name} className="card company-card"><div className="company-photo"><img src={images[i]} alt={name}/></div><div className="company-body"><div className="company-title"><h3>{name}</h3><span className="rating">★ {rating}</span></div><div className="muted">{city} · Doğrulanmış firma</div><div className="chips"><span className="chip">Düğün & Davet</span><span className="chip">Kurumsal</span></div><div className="company-foot"><span>Teklif iste</span><span style={{color:'var(--green)'}}>Profili incele →</span></div></div></Link>)}</div>
    </section>

    <section className="dark-band"><div className="container"><div className="eyebrow">Nasıl çalışır?</div><h2 style={{fontSize:31,margin:'6px 0'}}>Aradığını bul, teklifleri tek yerde yönet.</h2><div className="steps" style={{marginTop:35}}>{[['01','İhtiyacını anlat','Etkinlik, kişi sayısı, konum ve bütçeni birkaç adımda paylaş.'],['02','Uygun firmaları karşılaştır','CateFind uygun firmaları eşleştirir; gelen teklifleri tek ekranda görürsün.'],['03','Mesajlaş ve anlaş','Firma ile güvenli şekilde mesajlaş, teklifi kabul et ve süreci tamamla.']].map(([n,t,d])=><div className="step" key={n}><div className="step-number">{n}</div><h3>{t}</h3><p style={{color:'#c9d6d1'}}>{d}</p></div>)}</div></div></section>

    <section className="container section"><div className="split"><div className="panel panel-soft"><BarChart3 size={24} style={{color:'var(--green)'}}/><h2>Catering firmanızı büyütün.</h2><p className="muted">Profesyonel profil, ilanlar, nitelikli talepler, teklif yönetimi ve performans analitiği tek panelde.</p><Link href="/kayit?role=company" className="btn btn-green">Firma Olarak Kayıt Ol</Link></div><div className="panel panel-dark"><Users size={24}/><h2>Talepleri fırsata dönüştürün.</h2><p style={{color:'#c9d6d1'}}>Lead → Teklif → Mesaj → Anlaşma akışını ölçülebilir ve güvenli hale getirin.</p><div style={{display:'flex',gap:35,marginTop:25}}><div><strong style={{fontSize:28,display:'block'}}>+24%</strong><span style={{color:'#c9d6d1',fontSize:13}}>dönüşüm</span></div><div><strong style={{fontSize:28,display:'block'}}>3.2x</strong><span style={{color:'#c9d6d1',fontSize:13}}>daha fazla görünürlük</span></div></div></div></div></section>
  </main><footer className="footer"><div className="container footer-grid"><div><div className="logo"><span className="pin"/>CateFind</div><p className="muted">Catering firmaları ve müşteriler için güvenilir marketplace.</p></div><div><b>Keşfet</b><Link href="/catering-firmalari">Catering Firmaları</Link><Link href="/hizmetler">Hizmetler</Link><Link href="/firma-ariyorum">Firma Arıyorum</Link></div><div><b>Platform</b><Link href="/nasil-calisir">Nasıl Çalışır?</Link><Link href="/blog">Blog</Link><Link href="/iletisim">İletişim</Link></div><div><b>Yasal</b><Link href="#">KVKK</Link><Link href="#">Gizlilik</Link><Link href="#">Çerez Politikası</Link></div></div><div className="container" style={{borderTop:'1px solid var(--line)',marginTop:28,paddingTop:18,fontSize:12,color:'var(--muted)'}}>© 2026 CateFind</div></footer></>;
}
