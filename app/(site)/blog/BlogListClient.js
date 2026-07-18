"use client";

import { useMemo, useState } from "react";
import { BlogCard } from "@/components/cards/BlogCard";
import { NoResultsState } from "@/components/ui/StateScreen";
import { blogs } from "@/lib/data/blogs";

const categories = ["All", ...Array.from(new Set(blogs.map((b) => b.category)))];

export function BlogListClient() {
  const [active, setActive] = useState("All");

  const filtered = useMemo(() => (active === "All" ? blogs : blogs.filter((b) => b.category === active)), [active]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-pill px-4 py-2 text-sm font-medium transition-colors ${
              active === c ? "bg-primary text-white" : "bg-surface-soft text-ink-muted hover:text-ink"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {filtered.length === 0 ? (
          <NoResultsState title="No articles in this category yet" />
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <BlogCard key={post.slug} post={post} className="h-full" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
