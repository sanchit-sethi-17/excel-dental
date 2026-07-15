import { site } from "@/lib/site";
import { focusTreatments } from "@/lib/treatments";

/** LocalBusiness (Dentist) structured data for search engines. */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: site.legalName,
    slogan: site.tagline,
    description: site.description,
    url: site.url,
    telephone: "+919810309132",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: "Faridabad",
      addressRegion: site.address.state,
      postalCode: "121001",
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "14:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "17:00",
        closes: "20:30",
      },
    ],
    medicalSpecialty: "Dentistry",
    availableService: focusTreatments.map((t) => ({
      "@type": "MedicalProcedure",
      name: t.name,
    })),
    founder: {
      "@type": "Person",
      name: "Dr. Esha Walia",
      honorificSuffix: "BDS, MDS",
      jobTitle: "Principal Dental Consultant",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
