import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, Clock } from "lucide-react";
import { blogs } from "@/lib/data/blogs";
import { Badge } from "@/components/ui/Badge";
import { BlogCard } from "@/components/cards/BlogCard";
import { absoluteUrl, siteConfig } from "@/lib/seo";

export async function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogs.find((b) => b.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt, images: [{ url: post.image }], publishedTime: post.date, authors: [post.author.name] },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images: [post.image] },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = blogs.find((b) => b.slug === slug);
  if (!post) notFound();

  const related = blogs.filter((b) => b.slug !== post.slug && b.category === post.category).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.image),
    datePublished: post.date,
    author: { "@type": "Person", name: post.author.name },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png") },
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-14 md:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Badge tone="primary">{post.category}</Badge>
      <h1 className="mt-4 font-display text-4xl leading-tight text-ink md:text-5xl">{post.title}</h1>
      <div className="mt-6 flex items-center gap-4">
        <span className="relative h-11 w-11 overflow-hidden rounded-full">
          <Image src={post.author.avatar} alt={post.author.name} fill sizes="44px" className="object-cover" />
        </span>
        <div>
          <p className="text-sm font-medium text-ink">{post.author.name}</p>
          <p className="text-xs text-ink-muted">{post.author.role}</p>
        </div>
        <div className="ml-auto flex items-center gap-4 text-xs text-ink-faint">
          <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> {post.date}</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
        </div>
      </div>

      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-card md:h-96">
        <Image src={post.image} alt={post.title} fill sizes="768px" priority className="object-cover" />
      </div>

      <div className="prose-rerock mt-10 space-y-6">
        {post.content.map((paragraph, i) => (
          <p key={i} className="leading-relaxed text-ink-muted md:text-lg">{paragraph}</p>
        ))}
      </div>

      {related.length > 0 && (
        <section className="mt-16 border-t border-border pt-10">
          <h2 className="mb-6 font-display text-2xl text-ink">More on {post.category}</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {related.map((r) => (
              <BlogCard key={r.slug} post={r} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
