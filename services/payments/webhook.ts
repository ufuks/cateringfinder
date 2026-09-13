export type PaymentWebhookEvent = {
  eventId: string;
  status: string;
  subscriptionId?: string;
};

export type WebhookVerifier = (payload: string, signature: string) => boolean;

export function parseWebhookHeaders(headers: Headers) {
  const signature = headers.get('x-iyzico-signature');
  const eventId = headers.get('x-event-id');
  if (!signature) return {ok: false as const, error: 'Missing signature'};
  if (!eventId) return {ok: false as const, error: 'Missing event id'};
  return {ok: true as const, signature, eventId};
}

export function verifyWebhook(payload: string, signature: string, verifier: WebhookVerifier) {
  if (!payload || !signature) return false;
  return verifier(payload, signature);
}

export function paymentStatusIsSuccessful(status: string) {
  return ['SUCCESS', 'SUCCESSFUL', 'PAID'].includes(status.trim().toUpperCase());
}
