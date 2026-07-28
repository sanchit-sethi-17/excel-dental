import { site } from "@/lib/site";

export function MapEmbed({ className }: { className?: string }) {
  return (
    <iframe
      src={site.maps.embedSrc}
      title={`Map showing the location of ${site.legalName}`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
      className={`h-full min-h-80 w-full rounded-2xl border border-line grayscale-[35%] ${className ?? ""}`}
    />
  );
}
