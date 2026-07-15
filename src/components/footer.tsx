import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import { site } from "@/lib/site";
import { focusTreatments } from "@/lib/treatments";

const pageLinks = [
  { href: "/about", label: "About Us" },
  { href: "/treatments", label: "Treatments" },
  { href: "/consultants", label: "Consultants" },
  { href: "/gallery", label: "Clinic Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/book", label: "Book Appointment" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-stone-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block text-white" aria-label="Excel Dental — home">
              <Logo markClassName="text-brand" subtitleClassName="text-stone-400" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-stone-400">
              A focused dental practice in Sector 21C, Faridabad — root canals,
              implants, orthodontics, and the preventive care that keeps you
              out of the dentist&rsquo;s chair.
            </p>
            <p className="mt-6 font-display text-lg italic text-brand">
              {site.tagline}.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
              Pages
            </h3>
            <ul className="mt-4 space-y-2.5">
              {pageLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-stone-300 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
              Treatments
            </h3>
            <ul className="mt-4 space-y-2.5">
              {focusTreatments.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/treatments/${t.slug}`}
                    className="text-sm text-stone-300 transition-colors hover:text-white"
                  >
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
              Visit us
            </h3>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <a href={site.phoneHref} className="transition-colors hover:text-white">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>
                  {site.hours.map((h) => (
                    <span key={h.time} className="block">
                      {h.days && <span className="text-stone-400">{h.days}: </span>}
                      {h.time}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-stone-800 pt-8 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>
            Led by Dr. Esha Walia, BDS, MDS
          </p>
        </div>
      </div>
    </footer>
  );
}
