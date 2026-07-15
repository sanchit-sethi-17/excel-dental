import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Stagger, StaggerItem } from "@/components/reveal";
import { PlaceholderImage } from "@/components/ui";
import { formatPostDate, posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Dental Health, Explained Simply",
  description:
    "Practical, honest dental health advice from Excel Dental Clinic & Implant Centre, Faridabad — root canals, implants, oral hygiene, and more.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={
          <>
            Dental health, <em className="text-brand">explained simply</em>
          </>
        }
        lede="No jargon, no scare tactics — just the advice we give patients in the chair, written down."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Stagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <StaggerItem key={post.slug} className="h-full">
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-stone-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <PlaceholderImage ratio="aspect-[16/10]" tone="light" />
                <div className="flex flex-1 flex-col p-4 pt-5">
                  <div className="flex items-center gap-3 text-xs text-stone-500">
                    <span className="rounded-full bg-brand-soft px-3 py-1 font-medium text-brand">
                      {post.category}
                    </span>
                    <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readMinutes} min read</span>
                  </div>
                  <h2 className="mt-4 font-display text-xl font-medium leading-snug text-ink text-balance">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">
                    {post.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                    Read article
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CtaBand />
    </>
  );
}
