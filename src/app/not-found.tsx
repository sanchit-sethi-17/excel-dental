import Link from "next/link";
import { LogoMark } from "@/components/logo";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-24 text-center">
      <LogoMark className="h-16 w-16 text-brand-soft" />
      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        Error 404
      </p>
      <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-muted">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-9 inline-flex cursor-pointer items-center rounded-full bg-brand px-7 py-3.5 font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-px hover:bg-brand-deep"
      >
        Back to home
      </Link>
    </div>
  );
}
