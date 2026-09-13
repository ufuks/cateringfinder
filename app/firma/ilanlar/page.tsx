import Link from 'next/link';
import { redirect } from 'next/navigation';
import { DashboardShell, PageHeader, StatsRow } from '@/components/lumen-marketplace';
import { Eye, Edit3, Plus } from 'lucide-react';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

const statusLabels: Record<string, string> = {
  DRAFT: 'Taslak',
  PENDING_REVIEW: 'İncelemede',
  APPROVED: 'Aktif',
  REJECTED: 'Reddedildi',
  SUSPENDED: 'Askıya alındı',
};

const statusClasses: Record<string, string> = {
  DRAFT: 'bg-cf-accent text-cf-primary',
  PENDING_REVIEW: 'bg-amber-100 text-amber-800',
  APPROVED: 'bg-emerald-100 text-emerald-800',
  REJECTED: 'bg-red-100 text-red-800',
  SUSPENDED: 'bg-slate-200 text-slate-700',
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
}

export default async function Listings() {
  const user = await getSessionUser();

  if (!user || user.role !== 'COMPANY') redirect('/giris');

  const membership = user.companyUsers[0];
  if (!membership) redirect('/firma');

  const [listings, total, active, drafts] = await Promise.all([
    db.listing.findMany({
      where: { companyId: membership.companyId },
      include: { category: true },
      orderBy: { updatedAt: 'desc' },
    }),
    db.listing.count({ where: { companyId: membership.companyId } }),
    db.listing.count({ where: { companyId: membership.companyId, status: 'APPROVED' } }),
    db.listing.count({ where: { companyId: membership.companyId, status: 'DRAFT' } }),
  ]);

  return (
    <DashboardShell role="Firma" active="İlanlar">
      <PageHeader
        eyebrow="İlan Yönetimi"
        title="İlanlarım"
        description="Menü ve hizmet paketlerinizi yayınlayın, güncelleyin ve yayın durumlarını takip edin."
      />

      <div className="mb-6 flex justify-end">
        <Link href="/firma/ilanlar/yeni" className="btn btn-primary">
          <Plus size={17} /> Yeni İlan
        </Link>
      </div>

      <StatsRow
        items={[
          { label: 'Toplam İlan', value: total.toLocaleString('tr-TR') },
          { label: 'Aktif', value: active.toLocaleString('tr-TR') },
          { label: 'Taslak', value: drafts.toLocaleString('tr-TR') },
          { label: 'Görüntülenme', value: 'Veri yok' },
        ]}
      />

      <div className="mt-8 overflow-hidden rounded-2xl border border-cf-border bg-white">
        <div className="hidden grid-cols-[1.4fr_1fr_auto_auto] gap-4 border-b border-cf-border p-4 text-xs font-bold uppercase tracking-wider muted md:grid">
          <span>İlan</span>
          <span>Kategori</span>
          <span>Durum</span>
          <span></span>
        </div>

        {listings.length === 0 ? (
          <div className="p-10 text-center">
            <h2 className="text-lg font-bold">Henüz ilanınız yok</h2>
            <p className="mt-2 text-sm muted">İlk menü veya hizmet paketinizi oluşturarak firmanızı müşterilere göstermeye başlayın.</p>
            <Link href="/firma/ilanlar/yeni" className="btn btn-primary mt-5 inline-flex">
              <Plus size={17} /> İlk İlanı Oluştur
            </Link>
          </div>
        ) : (
          listings.map((listing) => {
            const label = statusLabels[listing.status] ?? listing.status;
            const statusClass = statusClasses[listing.status] ?? 'bg-slate-100 text-slate-700';

            return (
              <div
                key={listing.id}
                className="grid gap-3 border-b border-cf-border p-5 last:border-0 md:grid-cols-[1.4fr_1fr_auto_auto] md:items-center"
              >
                <div>
                  <b>{listing.title}</b>
                  <div className="mt-1 text-xs muted flex items-center gap-1">
                    <Eye size={13} /> Görüntülenme verisi henüz mevcut değil · Güncellendi {formatDate(listing.updatedAt)}
                  </div>
                </div>
                <span className="text-sm muted">{listing.category?.name ?? 'Kategori belirtilmemiş'}</span>
                <span className={`w-fit rounded-full px-2.5 py-1 text-xs font-bold ${statusClass}`}>{label}</span>
                <Link href={`/firma/ilanlar/${listing.id}/duzenle`} className="text-cf-primary" aria-label={`${listing.title} ilanını düzenle`}>
                  <Edit3 size={17} />
                </Link>
              </div>
            );
          })
        )}
      </div>
    </DashboardShell>
  );
}
