import crypto from 'node:crypto';

export type PaymentWebhookEvent = {eventId: string; status: string; subscriptionId?: string};
export type WebhookVerifier = (payload: string, signature: string) => boolean;

export function parseWebhookHeaders(headers: Headers) {
  const signature=headers.get('x-iyz-signature-v3') || headers.get('X-IYZ-SIGNATURE-V3');
  const eventId=headers.get('x-event-id') || headers.get('X-Event-Id');
  if(!signature)return {ok:false as const,error:'Missing signature'};
  return {ok:true as const,signature,eventId};
}

export function verifyWebhook(payload:string, signature:string, verifier:WebhookVerifier){if(!payload||!signature)return false;return verifier(payload,signature);}

export function buildDirectSignature(secretKey:string,eventType:string,paymentId:string,paymentConversationId:string,status:string){return crypto.createHmac('sha256',secretKey).update(secretKey+eventType+paymentId+paymentConversationId+status,'utf8').digest('hex');}
export function buildHppSignature(secretKey:string,eventType:string,iyziPaymentId:string,token:string,paymentConversationId:string,status:string){return crypto.createHmac('sha256',secretKey).update(secretKey+eventType+iyziPaymentId+token+paymentConversationId+status,'utf8').digest('hex');}
export function buildSubscriptionSignature(merchantId:string,secretKey:string,eventType:string,subscriptionReferenceCode:string,orderReferenceCode:string,customerReferenceCode:string){return crypto.createHmac('sha256',secretKey).update(merchantId+secretKey+eventType+subscriptionReferenceCode+orderReferenceCode+customerReferenceCode,'utf8').digest('hex');}
export function safeEqualHex(a:string,b:string){const left=Buffer.from(a.trim().toLowerCase(),'utf8');const right=Buffer.from(b.trim().toLowerCase(),'utf8');return left.length===right.length&&crypto.timingSafeEqual(left,right);}
export function paymentStatusIsSuccessful(status:string){return ['SUCCESS','SUCCESSFUL','PAID'].includes(status.trim().toUpperCase());}
