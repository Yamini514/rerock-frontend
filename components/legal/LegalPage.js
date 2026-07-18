import { Badge } from "@/components/ui/Badge";

export function LegalPage({ eyebrow, title, updatedDate, sections }) {
  return (
    <div className="mx-auto max-w-[90rem] px-6 py-14 md:px-10">
      <Badge tone="primary">{eyebrow}</Badge>
      <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">{title}</h1>
      <p className="mt-3 text-sm text-ink-faint">Last updated {updatedDate}</p>

      <div className="mt-12 grid gap-12 lg:grid-cols-[240px_1fr]">
        <nav className="hidden lg:block">
          <div className="sticky top-28 space-y-1">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block rounded-lg px-3 py-2 text-sm text-ink-muted transition-colors hover:bg-surface-soft hover:text-ink"
              >
                {s.title}
              </a>
            ))}
          </div>
        </nav>

        <div className="max-w-3xl space-y-12">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-28">
              <h2 className="font-display text-2xl text-ink">{s.title}</h2>
              <div className="mt-4 space-y-4">
                {s.body.map((p, i) => (
                  <p key={i} className="leading-relaxed text-ink-muted">{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
