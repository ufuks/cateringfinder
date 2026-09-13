import type { ReactNode } from 'react';

type DashboardShellProps = {
  role: string;
  active?: string;
  children: ReactNode;
};

export function DashboardShell({ role, active, children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-cf-bg">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="text-sm font-semibold text-cf-primary">CateFind</div>
          <div className="flex items-center gap-2 text-sm muted">
            <span>{role}</span>
            {active ? <span aria-hidden="true">/</span> : null}
            {active ? <span>{active}</span> : null}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="mb-8">
      {eyebrow ? (
        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-cf-primary">
          {eyebrow}
        </div>
      ) : null}
      <h1 className="text-3xl font-extrabold tracking-tight text-cf-primary">{title}</h1>
      {description ? <p className="mt-2 max-w-2xl text-sm muted">{description}</p> : null}
    </header>
  );
}

type StatItem = {
  label: string;
  value: string | number;
};

export function StatsRow({ items }: { items: StatItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="rounded-2xl border border-cf-border bg-white p-5">
          <div className="text-xs font-bold uppercase tracking-wider muted">{item.label}</div>
          <div className="mt-2 text-2xl font-extrabold text-cf-primary">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
