import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { CompanyListingForm } from '@/components/company-listing-form';

export const dynamic = 'force-dynamic';

export default async function NewListingPage() {
  const user = await getSessionUser();
  if (!user || user.role !== 'COMPANY' || user.companyUsers.length === 0) redirect('/giris');

  const categories = await db.category.findMany({ where: { active: true }, orderBy: { name: 'asc' }, select: { id: true, name: true } });

  return (
    <main className="min-h-screen">
      <div className="container max-w-3xl py-10">
        <Link href="/firma/ilanlar" className="inline-flex items-center gap-2 text-sm font-bold text-cf-primary"><ArrowLeft size={16} /> İlanlarıma dön</Link>
        <div className="mt-7"><div className="eyebrow">İlan Yönetimi</div><h1 className="mt-2 text-4xl font-bold">Yeni ilan oluştur</h1><p className="muted mt-3">Hizmetini müşterilerin kolayca anlayacağı şekilde tanımla.</p></div>
        <CompanyListingForm categories={categories} />
      </div>
    </main>
  );
}
