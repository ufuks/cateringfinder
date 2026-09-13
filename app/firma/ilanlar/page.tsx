import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Eye, Edit3, Plus } from 'lucide-react';
import { getSessionUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { DashboardShell, PageHeader, StatsRow } from '@/components/lumen-marketplace';

export const dynamic = 'force-dynamic';

function formatPrice(value: unknown) {
  if (value === null || value === undefined) return 'Fiyat belirtilmemiş';
  return `₺${Number(value).toLocaleString('tr-TR')}`;
}

function statusLabel(status: string) {
  const labels: Record<string, string> = {
    DRAFT: 'Taslak',
    PENDING_REVIEW: 'İncelemede',
    APPROVED: 'Aktif',
    REJECTED: 'Reddedildi',
    SUSPENDED: 'Askıya alındı',
  };
  return labels[status] ?? status;
}

export default async function Listings() {
  const user = await getSessionUser();
  if (!user || user.role !== 'COMPANY' || user.companyUsers.length === 0) redirect('/giris');

  const companyId = user.companyUsers[0].companyId;
  const [listings, total, active, drafts] = await Promise.all([
    db.listing.findMany({
      where: { companyId },
      include: { category: true },
      orderBy: { updatedAt: 'desc' },
      take: 50,
    }),
    db.listing.count({ where: { companyId } }),
    db.listing.count({ where: { companyId, status: 'APPROVED' } }),
    db.listing.count({ where: { companyId, status: 'DRAFT' } }),
  ]);

  return (
    <DashboardShell role="Firma" active="İlanlar">
      <PageHeader
        eyebrow="İlan Yönetimi"
        title="İlanlarım"
        description="Menü ve hizmet paketlerinizi yayınlayın, güncelleyin ve performansınızı takip edin."
      />
      <div className="mb-6 flex justify-end">
        <Link href="/firma/ilanlar/yeni" className="btn btn-primary">
          <Plus size={17} /> Yeni İlan
        </Link>
      </div>
      <StatsRow
        items={[
          { label: 'Toplam İlan', value: String(total) },
          { label: 'Aktif', value: String(active) },
          { label: 'Taslak', value: String(drafts) },
          { label: 'Toplam Görüntülenme', value: '—' },
        ]}
      />
      <div className="mt-8 overflow-hidden rounded-2xl border border-cf-border bg-white">
        <div className="hidden grid-cols-[1.4fr_1fr_auto_auto] gap-4 border-b border-cf-border p-4 text-xs font-bold uppercase tracking-wider muted md:grid">
          <span>İlan</span><span>Kategori</span><span>Durum</span><span />
        </div>
        {listings.length === 0 ? (
          <div className="p-10 text-center">
            <h2 className="text-lg font-bold">Henüz ilanınız yok</h2>
            <p className="muted mt-2">İlk hizmet paketinizi oluşturarak yayınlamaya başlayın.</p>
            <Link href="/firma/ilanlar/yeni" className="btn btn-primary mt-5 inline-flex"><Plus size={17} /> Yeni İlan</Link>
          </div>
        ) : listings.map((listing) => (
          <div key={listing.id} className="grid gap-3 border-b border-cf-border p-5 last:border-0 md:grid-cols-[1.4fr_1fr_auto_auto] md:items-center">
            <div>
              <b>{listing.title}</b>
              <div className="mt-1 text-xs muted flex items-center gap-1"><Eye size={13} /> Görüntülenme verisi henüz tutulmuyor</div>
              {listing.priceFrom !== null && <div className="mt-1 text-sm font-semibold">{formatPrice(listing.priceFrom)}+</div>}
            </div>
            <span className="text-sm muted">{listing.category?.name ?? 'Kategorisiz'}</span>
            <span className="w-fit rounded-full bg-cf-accent px-2.5 py-1 text-xs font-bold text-cf-primary">{statusLabel(listing.status)}</span>
            <Link href={`/firma/ilanlar/${listing.id}/duzenle`} className="text-cf-primary" aria-label={`${listing.title} ilanını düzenle`}>
              <Edit3 size={17} />
            </Link>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}
