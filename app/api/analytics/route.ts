import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { db } from '@/lib/db';
import { sanitizeAnalyticsProperties } from '@/lib/analytics';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (typeof body?.name !== 'string' || typeof body?.sessionId !== 'string') {
      return NextResponse.json({ error: 'Invalid event' }, { status: 400 });
    }

    const sanitized = sanitizeAnalyticsProperties(body.properties || {});
    const properties = (sanitized ?? {}) as Prisma.InputJsonValue;

    const event = await db.analyticsEvent.create({
      data: {
        name: body.name,
        sessionId: body.sessionId,
        userId: typeof body.userId === 'string' ? body.userId : undefined,
        entityType: typeof body.entityType === 'string' ? body.entityType : undefined,
        entityId: typeof body.entityId === 'string' ? body.entityId : undefined,
        properties,
      },
    });

    return NextResponse.json({ ok: true, id: event.id });
  } catch {
    return NextResponse.json({ error: 'Event could not be recorded' }, { status: 500 });
  }
}
