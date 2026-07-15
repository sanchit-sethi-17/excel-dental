import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { PlaceholderImage } from "@/components/ui";

export const metadata: Metadata = {
  title: "Clinic Gallery",
  description:
    "A look inside Excel Dental Clinic & Implant Centre in Sector 21C, Faridabad — reception, treatment rooms, sterilisation, and equipment.",
};

/**
 * PLACEHOLDER grid — swap each tile for a real photo (same aspect ratios)
 * when the client supplies clinic photography.
 */
const tiles = [
  { label: "Reception", ratio: "aspect-[4/3]", tone: "brand" as const },
  { label: "Treatment room", ratio: "aspect-[3/4]", tone: "light" as const },
  { label: "Sterilisation", ratio: "aspect-square", tone: "light" as const },
  { label: "Dental chair", ratio: "aspect-[3/4]", tone: "light" as const },
  { label: "Digital X-ray", ratio: "aspect-[4/3]", tone: "brand" as const },
  { label: "Waiting area", ratio: "aspect-square", tone: "light" as const },
  { label: "Instruments", ratio: "aspect-[4/3]", tone: "light" as const },
  { label: "The clinic", ratio: "aspect-[3/4]", tone: "brand" as const },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Clinic gallery"
        title={
          <>
            Step inside <em className="text-brand">before you visit</em>
          </>
        }
        lede="Clinic photography is on its way. In the meantime, here's the space the gallery will fill — reception to treatment room."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Stagger className="columns-2 gap-4 space-y-4 lg:columns-4" staggerDelay={0.06}>
          {tiles.map((tile) => (
            <StaggerItem key={tile.label} className="break-inside-avoid">
              <PlaceholderImage
                ratio={tile.ratio}
                tone={tile.tone}
                label={tile.label}
              />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-12 text-center">
          <p className="text-sm text-stone-500">
            Real photographs of the clinic will appear here shortly.
          </p>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
