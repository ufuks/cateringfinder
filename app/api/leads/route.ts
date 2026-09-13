import {NextResponse} from 'next/server';
import {db} from '@/lib/db';
import {getSessionUser} from '@/lib/auth';
import {leadSchema} from '@/lib/validation';
import {rankCompaniesForLead} from '@/services/lead-matching';

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== 'CUSTOMER') return NextResponse.json({error: 'Teklif talebi için müşteri hesabıyla giriş yapmalısınız.'}, {status: 401});
    const body = leadSchema.parse(await req.json());
    const city = await db.city.findFirst({where: {name: body.city}});
    const district = body.district && city ? await db.district.findFirst({where: {cityId: city.id, name: body.district}}) : null;
    const lead = await db.lead.create({data: {customerId: user.id, title: `${body.eventType} · ${body.people} kişi`, eventDate: body.eventDate ? new Date(body.eventDate) : undefined, eventType: body.eventType, cityId: city?.id, districtId: district?.id, people: body.people, budgetMax: body.budget, notes: body.notes, requirements: {city: body.city, district: body.district, phone: body.phone, email: body.email, requesterName: body.name}, status: 'OPEN'}});
    const companies = await db.company.findMany({where: {status: 'ACTIVE', deletedAt: null}, include: {profile: {select: {services: true, serviceAreas: true, completeness: true}}, categories: {include: {category: {select: {name: true, slug: true}}}}, listings: {where: {status: 'APPROVED'}, select: {minPeople: true, maxPeople: true, priceFrom: true}, take: 20}}});
    const ranked = rankCompaniesForLead({city: body.city, district: body.district, eventType: body.eventType, people: body.people, budget: body.budget}, companies.map((company) => ({city: city?.id === company.cityId ? body.city : null, serviceAreas: Array.isArray(company.profile?.serviceAreas) ? company.profile.serviceAreas.filter((v): v is string => typeof v === 'string') : [], services: Array.isArray(company.profile?.services) ? company.profile.services.filter((v): v is string => typeof v === 'string') : [], categories: company.categories.flatMap((item) => [item.category.name, item.category.slug]), minPeople: company.listings.length ? Math.min(...company.listings.map((x) => x.minPeople ?? 0)) : null, maxPeople: company.listings.length ? Math.max(...company.listings.map((x) => x.maxPeople ?? Number.MAX_SAFE_INTEGER)) : null, priceFrom: company.listings.length ? Math.min(...company.listings.map((x) => Number(x.priceFrom ?? Number.MAX_SAFE_INTEGER))) : null, rating: company.rating, responseMinutes: company.responseMinutes, profileCompleteness: company.profile?.completeness, id: company.id})));
    const matches = ranked.filter((item) => item.score >= 45).slice(0, 20).map((item) => ({leadId: lead.id, companyId: (item.company as typeof item.company & {id: string}).id, score: item.score}));
    if (matches.length) await db.leadCompanyMatch.createMany({data: matches, skipDuplicates: true});
    return NextResponse.json({ok: true, leadId: lead.id, matchedCompanies: matches.length});
  } catch {
    return NextResponse.json({error: 'Talep bilgileri geçersiz.'}, {status: 400});
  }
}
