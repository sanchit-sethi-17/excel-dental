/**
 * Recreated from the clinic's business card (vector redraw of the tooth mark).
 * Swap `LogoMark`'s path if the client supplies the original artwork.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M50 15C43 8.5 30.5 5.5 21.8 11.7 12 18.7 9.6 31.5 13.9 43.7c3.1 8.8 7.2 15.7 9.2 25.6C25.2 79.6 26.4 92 34 92c8.2 0 6.6-15.5 9.6-24 1.8-5.2 3.9-7.6 6.4-7.6s4.6 2.4 6.4 7.6c3 8.5 1.4 24 9.6 24 7.6 0 8.8-12.4 10.9-22.7 2-9.9 6.1-16.8 9.2-25.6C90.4 31.5 88 18.7 78.2 11.7 69.5 5.5 57 8.5 50 15Z" />
    </svg>
  );
}

export function Logo({
  className,
  markClassName = "text-accent",
  subtitleClassName = "text-subtle",
}: {
  className?: string;
  markClassName?: string;
  subtitleClassName?: string;
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark className={`h-9 w-9 shrink-0 ${markClassName}`} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-semibold tracking-tight">
          Excel Dental
        </span>
        <span
          className={`mt-1 text-[0.55rem] font-medium uppercase tracking-[0.22em] ${subtitleClassName}`}
        >
          Clinic &amp; Implant Centre
        </span>
      </span>
    </span>
  );
}
