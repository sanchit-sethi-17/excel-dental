import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { focusTreatments } from "@/lib/treatments";
import { posts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/about",
    "/treatments",
    "/consultants",
    "/gallery",
    "/blog",
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

  const blogPages = posts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...treatmentPages, ...blogPages];
}
