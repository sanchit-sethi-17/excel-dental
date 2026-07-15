/**
 * Single source of truth for clinic facts and integration switches.
 * Values marked PLACEHOLDER are awaiting confirmation from the client.
 */
export const site = {
  name: "Excel Dental",
  legalName: "Excel Dental Clinic & Implant Centre",
  tagline: "Smile with confidence",
  description:
    "Excel Dental Clinic & Implant Centre in Sector 21C, Faridabad — root canal treatment, dental implants, orthodontics and preventive oral care led by Dr. Esha Walia (BDS, MDS).",
  url: "https://exceldental.in", // PLACEHOLDER — final domain TBD

  phone: "+91 98103 09132",
  phoneHref: "tel:+919810309132",
  whatsappNumber: "919810309132",
  email: null as string | null, // PLACEHOLDER — client to confirm

  address: {
    line1: "Shop No. 195, Basement, Huda Market",
    line2: "Sector 21C, Faridabad — 121001",
    state: "Haryana",
    country: "India",
    full: "Shop No. 195, Basement, Huda Market, Sector 21C, Faridabad, Haryana 121001",
  },

  // PLACEHOLDER hours — confirm with client before launch
  hours: [
    { days: "Monday – Saturday", time: "10:00 am – 2:00 pm" },
    { days: "", time: "5:00 pm – 8:30 pm" },
    { days: "Sunday", time: "By appointment" },
  ],

  maps: {
    embedSrc:
      "https://maps.google.com/maps?q=" +
      encodeURIComponent(
        "Huda Market, Sector 21C, Faridabad, Haryana 121001"
      ) +
      "&z=16&output=embed",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=" +
      encodeURIComponent(
        "Huda Market, Sector 21C, Faridabad, Haryana 121001"
      ),
  },

  // PLACEHOLDER — replace with the clinic's Google Business review link
  googleReviewsUrl:
    "https://www.google.com/search?q=" +
    encodeURIComponent("Excel Dental Clinic & Implant Centre Faridabad reviews"),

  /**
   * Booking. WhatsApp is the live mechanism today; when the client's Cal.com
   * account exists, set calcom.enabled = true and paste the event link —
   * the /book page switches automatically.
   */
  booking: {
    calcom: {
      enabled: false,
      link: "", // e.g. "excel-dental/consultation"
    },
  },
} as const;

export type OpeningHours = (typeof site.hours)[number];

/** Build a wa.me deep link with a pre-filled message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
