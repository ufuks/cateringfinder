import './globals.css';
import type {Metadata} from 'next';
export const metadata:Metadata={title:{default:'CateFind — Catering firmaları tek yerde',template:'%s | CateFind'},description:'İhtiyacını belirt, catering firmalarından teklif al, karşılaştır ve en doğru seçimi yap.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="tr"><body>{children}</body></html>}
