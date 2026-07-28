import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { focusTreatments } from "@/lib/treatments";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/about",
    "/treatments",
    "/consultants",
    "/contact",
    "/book",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const treatmentPages = focusTreatments.map((t) => ({
    url: `${site.url}/treatments/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...treatmentPages];
}
