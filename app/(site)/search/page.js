import { Suspense } from "react";
import { SearchClient } from "./SearchClient";

export const metadata = {
  title: "Search",
  description: "Search properties, communities, builders, and locations across REROCK Realty.",
};

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-14 md:px-10">
      <h1 className="font-display text-4xl text-ink md:text-5xl">Smart Search</h1>
      <p className="mt-3 max-w-2xl text-ink-muted md:text-lg">Find properties, communities, builders, and locations in one place.</p>
      <div className="mt-10">
        <Suspense fallback={null}>
          <SearchClient />
        </Suspense>
      </div>
    </div>
  );
}
