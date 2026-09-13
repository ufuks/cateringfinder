# CateFind

Production odaklı catering marketplace + vendor SaaS başlangıç uygulaması.

## Stack
Next.js App Router, React, TypeScript, Tailwind CSS, Prisma/PostgreSQL, Redis-ready jobs, S3-ready media, provider abstractions.

## Çalıştırma
1. `cp .env.example .env`
2. `docker compose up -d`
3. `npm install`
4. `npm run db:generate`
5. `npm run db:push`
6. `npm run db:seed`
7. `npm run dev`

## Demo hesaplar
Seed sonrası şirket ve müşteri demo hesapları `Demo12345!` parolasıyla test edilebilir. Yeni kayıtlar e-posta doğrulaması gerektirir; geliştirme ortamında doğrulama URL'si API yanıtında döndürülür.

## Production
- `npm run build`
- `npm run start`
- Vercel için `DATABASE_URL`, `SESSION_SECRET` ve entegrasyon secret'larını production environment'a ekleyin.
- iyzico webhook için `IYZICO_MERCHANT_ID` ve `IYZICO_SECRET_KEY` yapılandırılmalıdır.
- S3 signed URL + private/public bucket ayrımı kullanın.
- Redis queue ile email, görsel işleme, Search Console/Yandex sync ve expiration job'larını çalıştırın.

## Mimari
`services/` domain kurallarını, `lib/` altyapı adaptörlerini, `app/api/` HTTP katmanını, `prisma/` persistence katmanını taşır. UI bileşenleri DB sorgusu çalıştırmaz.

## Kontroller
GitHub Actions PostgreSQL service ile Prisma generate/db push, TypeScript typecheck, Vitest ve production build çalıştırır.

Hukuki metinler (KVKK, açık rıza, üyelik sözleşmeleri vb.) production öncesinde profesyonel hukuk danışmanı tarafından sonlandırılmalıdır.
