export type MatchInput={location:number,service:number,category:number,capacity:number,budget:number,rating:number,responseTime:number,profileCompleteness:number};
export function matchScore(x:MatchInput){return Math.round((x.location*.25+x.service*.2+x.category*.15+x.capacity*.1+x.budget*.1+x.rating*.1+x.responseTime*.05+x.profileCompleteness*.05)*100)}
