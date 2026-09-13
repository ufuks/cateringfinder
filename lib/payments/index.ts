export type CheckoutInput={companyId:string;planCode:string;interval:'MONTHLY'|'YEARLY';email:string};
export type CheckoutResult={provider:string;checkoutId:string;checkoutUrl?:string};
export interface PaymentProvider{createSubscription(input:CheckoutInput):Promise<CheckoutResult>;cancelSubscription(providerSubscriptionId:string):Promise<void>;handleWebhook(payload:unknown,signature:string):Promise<{eventId:string;handled:boolean}>}
export class IyzipaySubscriptionProvider implements PaymentProvider{
  async createSubscription(_input:CheckoutInput):Promise<CheckoutResult>{throw new Error('TODO: iyzico Subscription API credentials/configuration required');}
  async cancelSubscription(_id:string):Promise<void>{throw new Error('TODO: iyzico cancellation endpoint');}
  async handleWebhook(_payload:unknown,_signature:string):Promise<{eventId:string;handled:boolean}>{throw new Error('TODO: verify iyzico webhook signature and process idempotently');}
}
