import { existsSync } from "node:fs";
import path from "node:path";
import { Photo } from "@/components/photo";
import type { Doctor } from "@/lib/doctors";

/** Initials, for the fallback shown until a real portrait is supplied. */
function initials(name: string) {
  return name
    .replace(/^Dr\.?\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/**
 * A consultant's portrait. Server-only: checks whether the image file actually
 * exists in /public and falls back to a monogram if it doesn't, so the page
 * looks intentional before the clinic's photos are added. Drop the file in and
 * the photo appears — no code change.
 */
export function DoctorPortrait({
  doctor,
  ratio = "aspect-[4/5]",
  sizes = "(max-width: 1024px) 100vw, 40vw",
  priority = false,
  className,
}: {
  doctor: Doctor;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const hasPhoto = existsSync(
    path.join(process.cwd(), "public", doctor.photo),
  );

  if (hasPhoto) {
    return (
      <Photo
        src={doctor.photo}
        alt={doctor.photoAlt}
        ratio={ratio}
        sizes={sizes}
        priority={priority}
        className={className}
        imgClassName={doctor.focus}
      />
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl border border-line bg-brand-soft ${ratio} ${className ?? ""}`}
    >
      <span
        aria-hidden="true"
        className="font-display text-6xl font-medium tracking-tight text-accent"
      >
        {initials(doctor.name)}
      </span>
      <span className="sr-only">{doctor.name}</span>
    </div>
  );
}
