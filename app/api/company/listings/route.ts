import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

const listingSchema = z.object({
  title: z.string().trim().min(3).max(120),
  description: z.string().trim().min(10).max(10000),
  categoryId: z.string().cuid().optional().or(z.literal('')),
  priceFrom: z.coerce.number().min(0).max(100000000).optional(),
  minPeople: z.coerce.number().int().min(1).max(100000).optional(),
  maxPeople: z.coerce.number().int().min(1).max(100000).optional(),
}).refine((data) => data.maxPeople == null || data.minPeople == null || data.maxPeople >= data.minPeople, {
  message: 'Maksimum kişi sayısı minimum kişi sayısından küçük olamaz.',
  path: ['maxPeople'],
});

async function getCompanyUser() {
  const user = await getSessionUser();
  if (!user || user.role !== 'COMPANY') return null;
  const membership = user.companyUsers[0];
  return membership ? { user, companyId: membership.companyId } : null;
}

export async function GET() {
  const auth = await getCompanyUser();
  if (!auth) return NextResponse.json({ error: 'Firma hesabıyla giriş yapmalısınız.' }, { status: 401 });

  const listings = await db.listing.findMany({
    where: { companyId: auth.companyId },
    include: { category: true },
    orderBy: { updatedAt: 'desc' },
  });

  return NextResponse.json({ listings });
}

export async function POST(req: Request) {
  const auth = await getCompanyUser();
  if (!auth) return NextResponse.json({ error: 'Firma hesabıyla giriş yapmalısınız.' }, { status: 401 });

  try {
    const body = listingSchema.parse(await req.json());
    const categoryId = body.categoryId || undefined;
    if (categoryId) {
      const category = await db.category.findFirst({ where: { id: categoryId, active: true } });
      if (!category) return NextResponse.json({ error: 'Geçersiz kategori.' }, { status: 400 });
    }

    const baseSlug = body.title.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 70) || 'ilan';
    const listing = await db.listing.create({
      data: {
        companyId: auth.companyId,
        title: body.title,
        slug: `${baseSlug}-${Date.now().toString(36)}`,
        description: body.description,
        categoryId,
        priceFrom: body.priceFrom,
        minPeople: body.minPeople,
        maxPeople: body.maxPeople,
        status: 'DRAFT',
      },
    });

    return NextResponse.json({ ok: true, listingId: listing.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'İlan bilgileri geçersiz.' }, { status: 400 });
  }
}
