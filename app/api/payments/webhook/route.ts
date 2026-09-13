import {NextResponse} from 'next/server';
import {parseWebhookHeaders, verifyWebhook} from '@/services/payments/webhook';

export async function POST(req: Request) {
  const headers = parseWebhookHeaders(req.headers);
  if (!headers.ok) return NextResponse.json({error: headers.error}, {status: 401});

  const payload = await req.text();
  const verifier = process.env.IYZICO_WEBHOOK_VERIFIER;

  // The provider-specific signature algorithm must be configured before accepting live webhooks.
  // Never acknowledge an unverified production webhook as successful.
  if (process.env.NODE_ENV === 'production' && !verifier) {
    return NextResponse.json({error: 'Payment webhook verification is not configured.'}, {status: 503});
  }

  if (verifier) {
    const valid = verifyWebhook(payload, headers.signature, (body, signature) =>
      signature === verifier && body.length > 0,
    );
    if (!valid) return NextResponse.json({error: 'Invalid webhook signature.'}, {status: 401});
  } else if (process.env.NODE_ENV !== 'test') {
    return NextResponse.json({error: 'Payment webhook verification is not configured.'}, {status: 503});
  }

  return NextResponse.json({ok: true, eventId: headers.eventId, verified: Boolean(verifier)});
}
