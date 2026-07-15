import { site } from "@/lib/site";

/**
 * Cal.com calendar embed — dormant until the client's Cal.com account exists.
 * To activate: in src/lib/site.ts set booking.calcom.enabled = true and
 * booking.calcom.link = "<username>/<event>" (e.g. "excel-dental/consultation").
 * The /book page then renders this instead of the WhatsApp form.
 */
export function CalEmbed() {
  const { link } = site.booking.calcom;
  if (!link) return null;
  return (
    <iframe
      src={`https://cal.com/${link}?embed=true&theme=light`}
      title="Book an appointment with Excel Dental"
      loading="lazy"
      className="h-[44rem] w-full rounded-3xl border border-stone-200 bg-white"
    />
  );
}
