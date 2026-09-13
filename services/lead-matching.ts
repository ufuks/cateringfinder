import {matchScore, type MatchInput} from './matching';

export type LeadForMatching = {
  city: string;
  district?: string;
  eventType: string;
  people: number;
  budget: number;
};

export type CompanyForMatching = {
  city?: string | null;
  serviceAreas?: string[] | null;
  services?: string[] | null;
  categories?: string[] | null;
  minPeople?: number | null;
  maxPeople?: number | null;
  priceFrom?: number | null;
  priceTo?: number | null;
  rating?: number | null;
  responseMinutes?: number | null;
  profileCompleteness?: number | null;
};

const normalize = (value: string) => value.trim().toLocaleLowerCase('tr-TR');
const includesNormalized = (values: string[] | null | undefined, target: string) =>
  (values ?? []).some((value) => normalize(value) === normalize(target));

const ratio = (value: number, max: number) => Math.max(0, Math.min(1, value / max));

export function scoreLeadForCompany(lead: LeadForMatching, company: CompanyForMatching): number {
  const cityMatch = company.city ? normalize(company.city) === normalize(lead.city) : false;
  const location = cityMatch || includesNormalized(company.serviceAreas, lead.district || lead.city) ? 1 : 0;
  const service = includesNormalized(company.services, lead.eventType) ? 1 : 0.5;
  const category = includesNormalized(company.categories, lead.eventType) ? 1 : 0.5;
  const capacity =
    company.minPeople != null && lead.people < company.minPeople ? 0 :
    company.maxPeople != null && lead.people > company.maxPeople ? 0 : 1;
  const budget = company.priceFrom == null || lead.budget <= 0
    ? 0.5
    : lead.budget >= company.priceFrom
      ? 1
      : ratio(lead.budget, company.priceFrom);
  const rating = Math.max(0, Math.min(1, (company.rating ?? 0) / 5));
  const responseTime = 1 - Math.min(1, (company.responseMinutes ?? 240) / 240);
  const profileCompleteness = Math.max(0, Math.min(1, (company.profileCompleteness ?? 0) / 100));

  const input: MatchInput = {
    location,
    service,
    category,
    capacity,
    budget,
    rating,
    responseTime,
    profileCompleteness,
  };

  return matchScore(input);
}

export function rankCompaniesForLead<T extends CompanyForMatching>(lead: LeadForMatching, companies: T[]) {
  return companies
    .map((company, index) => ({company, score: scoreLeadForCompany(lead, company), index}))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map(({company, score}) => ({company, score}));
}
