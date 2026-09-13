import {NextResponse} from 'next/server';
import {parseWebhookHeaders} from '@/services/payments/webhook';

export async function POST(req: Request) {
  const headers = parseWebhookHeaders(req.headers);
  if (!headers.ok) return NextResponse.json({error: headers.error}, {status: 401});

  // iyzico's provider-specific signature verification and subscription transition
  // must be completed before this endpoint is enabled in production.
  // Returning 503 is intentional: acknowledging an unverified payment is unsafe.
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({error: 'Payment webhook integration is not configured.'}, {status: 503});
  }

  const payload = await req.text();
  return NextResponse.json({ok: true, eventId: headers.eventId, testMode: true, payloadReceived: payload.length > 0});
}
