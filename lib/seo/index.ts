export function absoluteUrl(path:string){return `https://catefind.example${path.startsWith('/')?path:`/${path}`}`}
export function noIndexPrivate(){return {index:false,follow:false}}
export function publicJsonLd(type:'LocalBusiness'|'Service'|'Article',data:Record<string,unknown>){return {'@context':'https://schema.org','@type':type,...data}}
