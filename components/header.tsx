import Link from 'next/link';
import { Heart, Menu } from 'lucide-react';

export function Header() {
  return (
    <header className="header">
      <div className="container nav">
        <Link href="/" className="logo" aria-label="CateFind ana sayfa">
          <span className="pin" aria-hidden="true" />
          CateFind
        </Link>
        <nav className="navlinks" aria-label="Ana navigasyon">
          <Link href="/">Anasayfa</Link>
          <Link href="/catering-firmalari">Firmalar</Link>
          <Link href="/hizmetler">Hizmetler</Link>
          <Link href="/nasil-calisir">Nasıl Çalışır?</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/iletisim">İletişim</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/favorilerim" className="btn btn-light hidden sm:inline-flex" aria-label="Favorilerim">
            <Heart size={17} />
          </Link>
          <Link href="/giris" className="btn btn-light hidden sm:inline-flex">Giriş Yap</Link>
          <Link href="/kayit?role=company" className="btn btn-green">Firma Ol</Link>
          <button className="btn btn-light mobile-show" type="button" aria-label="Menüyü aç">
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
