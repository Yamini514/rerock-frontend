import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function BlogCard({ post, className }) {
  return (
    <Card hover className={className}>
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="relative h-48 w-full overflow-hidden rounded-t-card">
          <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
        </div>
        <div className="p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">{post.category}</p>
          <p className="mt-2 font-display text-lg leading-snug text-ink group-hover:text-primary">{post.title}</p>
          <p className="mt-2 text-sm text-ink-muted line-clamp-2">{post.excerpt}</p>
          <p className="mt-3 flex items-center gap-1 text-xs font-medium text-ink-faint">
            {post.readTime}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </p>
        </div>
      </Link>
    </Card>
  );
}
