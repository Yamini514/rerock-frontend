"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { blogs } from "@/lib/data/blogs";

export function LatestBlogs() {
  return (
    <section id="blogs" className="mx-auto max-w-[90rem] px-6 py-16 md:px-10 md:py-10">
      <SectionHeading eyebrow="Insights" title="Latest from the REROCK Journal" description="Market intelligence, buyer guides, and investment strategy." />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {blogs.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <Link href="#" className="group block">
              <div className="relative h-48 w-full overflow-hidden rounded-card">
                <Image src={post.image} alt={post.title} fill sizes="300px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-primary">{post.category}</p>
              <p className="mt-2 font-display text-lg leading-snug text-ink group-hover:text-primary">{post.title}</p>
              <p className="mt-2 text-sm text-ink-muted line-clamp-2">{post.excerpt}</p>
              <p className="mt-3 flex items-center gap-1 text-xs font-medium text-ink-faint">
                {post.readTime}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
