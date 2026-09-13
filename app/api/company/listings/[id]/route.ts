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

async function companyIdForCurrentUser() {
  const user = await getSessionUser();
  if (!user || user.role !== 'COMPANY') return null;
  return user.companyUsers[0]?.companyId ?? null;
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const companyId = await companyIdForCurrentUser();
  if (!companyId) return NextResponse.json({ error: 'Firma hesabıyla giriş yapmalısınız.' }, { status: 401 });
  const { id } = await params;
  const listing = await db.listing.findFirst({ where: { id, companyId }, include: { category: true } });
  if (!listing) return NextResponse.json({ error: 'İlan bulunamadı.' }, { status: 404 });
  return NextResponse.json({ listing });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const companyId = await companyIdForCurrentUser();
  if (!companyId) return NextResponse.json({ error: 'Firma hesabıyla giriş yapmalısınız.' }, { status: 401 });
  const { id } = await params;

  try {
    const body = listingSchema.parse(await req.json());
    const existing = await db.listing.findFirst({ where: { id, companyId } });
    if (!existing) return NextResponse.json({ error: 'İlan bulunamadı.' }, { status: 404 });

    if (body.categoryId) {
      const category = await db.category.findFirst({ where: { id: body.categoryId, active: true } });
      if (!category) return NextResponse.json({ error: 'Geçersiz kategori.' }, { status: 400 });
    }

    const listing = await db.listing.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        categoryId: body.categoryId || null,
        priceFrom: body.priceFrom,
        minPeople: body.minPeople,
        maxPeople: body.maxPeople,
        status: existing.status === 'APPROVED' ? 'PENDING_REVIEW' : existing.status,
      },
    });

    return NextResponse.json({ ok: true, listingId: listing.id });
  } catch {
    return NextResponse.json({ error: 'İlan bilgileri geçersiz.' }, { status: 400 });
  }
}
