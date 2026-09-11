import { redirect } from 'next/navigation';
import { BarChart3, Building2, FileText, Search, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { getSessionUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';
type Kpi = [string, string, LucideIcon];

const kpis: Kpi[] = [
  ['Toplam firma', '1.284', Building2],
  ['Aktif müşteri', '8.421', Users],
  ['Toplam lead', '3.842', FileText],
  ['MRR', '₺2.84M', TrendingUp],
];

const searchRows = [
  ['istanbul catering', '12.450', '4.8'],
  ['kadıköy catering', '8.500', '11.4'],
  ['düğün catering fiyatları', '6.210', '7.2'],
  ['vegan catering', '4.880', '5.9'],
];

const navigation = [
  'Firmalar',
  'Başvurular',
  'İlanlar',
  'Müşteri Talepleri',
  'Teklifler',
  'Yorumlar',
  'Abonelikler',
  'Audit Logs',
];

export default async function Admin() {
  const user = await getSessionUser();
  if (!user || !['ADMIN', 'SUPER_ADMIN'].includes(user.role)) redirect('/giris');

  return (
    <main className="min-h-screen bg-cf-dark text-white">
      <div className="container py-8">
        <header className="flex items-center justify-between">
          <div>
            <div className="text-cf-accent text-xs font-bold uppercase tracking-widest">Operations</div>
            <h1 className="text-3xl font-bold mt-2">CateFind Admin</h1>
          </div>
          <div className="text-sm text-white/60">Tüm platform · Eylül 2026</div>
        </header>

        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8" aria-label="KPI özeti">
          {kpis.map(([title, value, Icon]) => (
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5" key={title}>
              <Icon className="text-cf-accent" size={19} />
              <div className="text-white/60 text-sm mt-4">{title}</div>
              <div className="text-2xl font-bold mt-1">{value}</div>
            </div>
          ))}
        </section>

        <div className="grid lg:grid-cols-2 gap-5 mt-6">
          <section className="rounded-2xl bg-white text-cf-text p-6">
            <div className="flex justify-between">
              <div>
                <h2 className="font-bold text-xl">Lead & teklif trendi</h2>
                <p className="muted text-sm mt-1">Son 30 gün</p>
              </div>
              <BarChart3 className="text-cf-primary" />
            </div>
            <div className="h-64 flex items-end gap-1 mt-5" aria-label="Lead ve teklif trend grafiği">
              {[42, 55, 47, 65, 59, 73, 68, 82, 75, 91, 84, 96].map((height, index) => (
                <div
                  key={index}
                  className="flex-1 bg-cf-primary rounded-t"
                  style={{ height: `${height}%` }}
                  aria-hidden="true"
                />
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-white text-cf-text p-6">
            <div className="flex items-center gap-2">
              <Search className="text-cf-primary" />
              <h2 className="font-bold text-xl">SEO & Search Intelligence</h2>
            </div>
            <div className="grid gap-3 mt-6">
              {searchRows.map(([query, impressions, position]) => (
                <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-cf-border pb-3 text-sm" key={query}>
                  <b>{query}</b>
                  <span>{impressions} gösterim</span>
                  <span className="text-cf-primary font-bold">{position}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl bg-cf-accent p-4 text-sm">
              <ShieldCheck size={17} className="inline mr-2 text-cf-primary" />
              <b>Fırsat:</b> “kadıköy catering” 1. sayfaya yakın. Landing page içeriğini güçlendir.
            </div>
          </section>
        </div>

        <nav className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 mt-6" aria-label="Yönetim bölümleri">
          {navigation.map((item) => (
            <button key={item} type="button" className="p-4 rounded-xl bg-white/5 border border-white/10 text-left text-sm font-bold hover:bg-white/10">
              {item}
            </button>
          ))}
        </nav>
      </div>
    </main>
  );
}
