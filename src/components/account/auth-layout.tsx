import type { ReactNode } from "react";
import Link from "next/link";
import { LogoMark } from "@/components/logo";

/** Centered card layout shared by the login / register / reset pages. */
export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 pb-16 pt-28 sm:pt-32">
      <Link href="/" className="mx-auto mb-8 flex items-center gap-2.5" aria-label="Excel Dental — home">
        <LogoMark className="h-9 w-9 text-brand" />
        <span className="font-display text-xl font-semibold tracking-tight text-foreground">
          Excel Dental
        </span>
      </Link>

      <div className="rounded-3xl border border-line bg-surface p-8 shadow-sm sm:p-10">
        <h1 className="font-display text-2xl font-medium text-foreground">{title}</h1>
        {subtitle && <p className="mt-2 text-sm leading-relaxed text-muted">{subtitle}</p>}
        <div className="mt-7">{children}</div>
      </div>

      {footer && <div className="mt-6 text-center text-sm text-muted">{footer}</div>}
    </div>
  );
}
