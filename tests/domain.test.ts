import {describe, it, expect} from 'vitest';
import {matchScore} from '../services/matching';
import {rankCompaniesForLead, scoreLeadForCompany} from '../services/lead-matching';
import {canTransition} from '../services/quotes';
import {leadSchema, registerSchema, analyticsEventSchema} from '../lib/validation';
import {parseWebhookHeaders, paymentStatusIsSuccessful} from '../services/payments/webhook';

describe('domain rules', () => {
  it('weighted match score is deterministic', () => {
    expect(matchScore({location: 1, service: 1, category: 1, capacity: 1, budget: 1, rating: 1, responseTime: 1, profileCompleteness: 1})).toBe(100);
  });

  it('quote state machine blocks invalid transition', () => {
    expect(canTransition('SENT', 'ACCEPTED')).toBe(true);
    expect(canTransition('ACCEPTED', 'SENT')).toBe(false);
  });

  it('lead validation rejects impossible people/budget values', () => {
    expect(leadSchema.safeParse({name:'Ali Veli',email:'ali@example.com',phone:'05551234567',eventType:'Düğün',city:'İstanbul',people:0,budget:-1}).success).toBe(false);
  });

  it('registration validation rejects unknown fields and short passwords', () => {
    expect(registerSchema.safeParse({name:'Ali Veli',email:'ali@example.com',password:'1234567',role:'CUSTOMER'}).success).toBe(false);
    expect(registerSchema.safeParse({name:'Ali Veli',email:'ali@example.com',password:'12345678',role:'CUSTOMER',isAdmin:true}).success).toBe(false);
  });

  it('analytics validation limits event shape', () => {
    expect(analyticsEventSchema.safeParse({name:'page_view',sessionId:'session-123456',properties:{ok:true}}).success).toBe(true);
    expect(analyticsEventSchema.safeParse({name:'<script>',sessionId:'session-123456'}).success).toBe(false);
  });

  it('lead matching favors location/capacity/service fit over a generic high rating', () => {
    const lead = {city:'İstanbul',district:'Kadıköy',eventType:'Düğün',people:300,budget:60000};
    const exact = {city:'İstanbul',serviceAreas:['Kadıköy'],services:['Düğün'],categories:['Düğün'],minPeople:100,maxPeople:500,priceFrom:45000,rating:4.4,responseMinutes:40,profileCompleteness:90};
    const generic = {city:'Ankara',serviceAreas:['Ankara'],services:['Kurumsal'],categories:['Kurumsal'],minPeople:10,maxPeople:1000,priceFrom:30000,rating:5,responseMinutes:20,profileCompleteness:100};
    expect(scoreLeadForCompany(lead, exact)).toBeGreaterThan(scoreLeadForCompany(lead, generic));
    expect(rankCompaniesForLead(lead, [generic, exact])[0].company).toBe(exact);
  });

  it('payment webhook requires both signature and event id', () => {
    expect(parseWebhookHeaders(new Headers())).toEqual({ok:false, error:'Missing signature'});
    const headers = new Headers({'x-iyzico-signature':'test','x-event-id':'evt-1'});
    expect(parseWebhookHeaders(headers)).toEqual({ok:true, signature:'test', eventId:'evt-1'});
  });

  it('payment success status helper is deterministic', () => {
    expect(paymentStatusIsSuccessful('SUCCESS')).toBe(true);
    expect(paymentStatusIsSuccessful('failure')).toBe(false);
  });
});
