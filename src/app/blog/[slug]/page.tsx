import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui";
import { formatPostDate, getPost, posts, type BlogSection } from "@/lib/blog";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

function Section({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "h2":
      return (
        <h2 className="mt-12 font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
          {section.text}
        </h2>
      );
    case "list":
      return (
        <ul className="mt-6 space-y-3">
          {section.items.map((item) => (
            <li key={item} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
              />
              <span className="text-[1.05rem] leading-relaxed text-stone-700">
                {item}
              </span>
            </li>
          ))}
        </ul>
      );
    default:
      return (
        <p className="mt-6 text-[1.05rem] leading-relaxed text-stone-700">
          {section.text}
        </p>
      );
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:pt-40">
        <Reveal>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition-colors hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" />
            All articles
          </Link>

          <header className="mt-8">
            <Eyebrow>{post.category}</Eyebrow>
            <h1 className="mt-4 font-display text-4xl font-medium leading-[1.1] tracking-tight text-ink text-balance sm:text-5xl">
              {post.title}
            </h1>
            <div className="mt-6 flex items-center gap-3 text-sm text-stone-500">
              <span className="font-medium text-ink">Excel Dental Team</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readMinutes} min read</span>
            </div>
          </header>

          <hr className="mt-10 border-stone-200" />

          <div>
            {post.sections.map((section, i) => (
              <Section key={i} section={section} />
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-stone-200 bg-white p-7">
            <p className="font-display text-lg font-medium text-ink">
              Worried about something you&rsquo;ve read?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              Articles inform — they don&rsquo;t diagnose. If a tooth is
              troubling you, an examination will give you a real answer.
            </p>
            <Link
              href="/book"
              className="mt-5 inline-flex cursor-pointer items-center rounded-full bg-brand px-6 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-px hover:bg-brand-deep"
            >
              Book a check-up
            </Link>
          </div>
        </Reveal>
      </article>

      <CtaBand />
    </>
  );
}
