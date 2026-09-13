'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Category = { id: string; name: string };
type Listing = { id?: string; title: string; description: string; categoryId: string; priceFrom?: string | number | null; minPeople?: number | null; maxPeople?: number | null };

export function CompanyListingForm({ categories, initial }: { categories: Category[]; initial?: Listing }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError('');
    const form = new FormData(event.currentTarget);
    const payload = {
      title: String(form.get('title') || ''),
      description: String(form.get('description') || ''),
      categoryId: String(form.get('categoryId') || ''),
      priceFrom: form.get('priceFrom') ? Number(form.get('priceFrom')) : undefined,
      minPeople: form.get('minPeople') ? Number(form.get('minPeople')) : undefined,
      maxPeople: form.get('maxPeople') ? Number(form.get('maxPeople')) : undefined,
    };
    const response = await fetch(initial?.id ? `/api/company/listings/${initial.id}` : '/api/company/listings', {
      method: initial?.id ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await response.json().catch(() => ({}));
    setSaving(false);
    if (!response.ok) {
      setError(result.error || 'İlan kaydedilemedi.');
      return;
    }
    router.push('/firma/ilanlar');
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="card mt-8 grid gap-5 p-6 sm:p-8">
      <label className="grid gap-2 text-sm font-bold">İlan başlığı
        <input name="title" required minLength={3} maxLength={120} defaultValue={initial?.title ?? ''} className="h-12 rounded-xl border border-cf-border px-3 font-normal" placeholder="Örn. 500 kişilik düğün menüsü" />
      </label>
      <label className="grid gap-2 text-sm font-bold">Kategori
        <select name="categoryId" defaultValue={initial?.categoryId ?? ''} className="h-12 rounded-xl border border-cf-border px-3 font-normal">
          <option value="">Kategori seçin</option>
          {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
      </label>
      <label className="grid gap-2 text-sm font-bold">Açıklama
        <textarea name="description" required minLength={10} maxLength={10000} defaultValue={initial?.description ?? ''} className="min-h-32 rounded-xl border border-cf-border p-3 font-normal" placeholder="Menü, servis, teslimat ve paket detaylarını anlat…" />
      </label>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="grid gap-2 text-sm font-bold">Başlangıç fiyatı<input name="priceFrom" type="number" min="0" step="0.01" defaultValue={initial?.priceFrom ?? ''} className="h-12 rounded-xl border border-cf-border px-3 font-normal" /></label>
        <label className="grid gap-2 text-sm font-bold">Minimum kişi<input name="minPeople" type="number" min="1" defaultValue={initial?.minPeople ?? ''} className="h-12 rounded-xl border border-cf-border px-3 font-normal" /></label>
        <label className="grid gap-2 text-sm font-bold">Maksimum kişi<input name="maxPeople" type="number" min="1" defaultValue={initial?.maxPeople ?? ''} className="h-12 rounded-xl border border-cf-border px-3 font-normal" /></label>
      </div>
      {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <button disabled={saving} className="btn btn-primary justify-center disabled:cursor-not-allowed disabled:opacity-60"><Save size={17} />{saving ? 'Kaydediliyor…' : initial?.id ? 'Değişiklikleri kaydet' : 'İlanı taslak olarak kaydet'}</button>
    </form>
  );
}
