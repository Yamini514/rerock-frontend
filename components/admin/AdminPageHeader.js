export function AdminPageHeader({ title, description, action }) {
  return (
    <div className="flex flex-col gap-4 border-b border-border px-6 py-6 sm:flex-row sm:items-center sm:justify-between md:px-10">
      <div>
        <h1 className="font-display text-2xl text-ink md:text-3xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-ink-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}
