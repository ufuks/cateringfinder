import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { CompanyListingForm } from '@/components/company-listing-form';

export const dynamic = 'force-dynamic';

export default async function EditListingPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getSessionUser();
  if (!user || user.role !== 'COMPANY' || user.companyUsers.length === 0) redirect('/giris');

  const { id } = await params;
  const companyId = user.companyUsers[0].companyId;
  const [listing, categories] = await Promise.all([
    db.listing.findFirst({ where: { id, companyId }, select: { id: true, title: true, description: true, categoryId: true, priceFrom: true, minPeople: true, maxPeople: true } }),
    db.category.findMany({ where: { active: true }, orderBy: { name: 'asc' }, select: { id: true, name: true } }),
  ]);

  if (!listing) notFound();

  return (
    <main className="min-h-screen">
      <div className="container max-w-3xl py-10">
        <Link href="/firma/ilanlar" className="inline-flex items-center gap-2 text-sm font-bold text-cf-primary"><ArrowLeft size={16} /> İlanlarıma dön</Link>
        <div className="mt-7"><div className="eyebrow">İlan Yönetimi</div><h1 className="mt-2 text-4xl font-bold">İlanı düzenle</h1><p className="muted mt-3">İlan bilgilerini güncelleyin. Aktif bir ilanı değiştirdiğinizde yeniden incelemeye alınır.</p></div>
        <CompanyListingForm categories={categories} initial={{ ...listing, description: listing.description ?? '', categoryId: listing.categoryId ?? '', priceFrom: listing.priceFrom?.toString() ?? '' }} />
      </div>
    </main>
  );
}
