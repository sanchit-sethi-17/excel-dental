const items = [
  "Root Canal Treatment",
  "Dental Implants",
  "Orthodontics",
  "Oral Hygiene",
  "Crowns & Bridges",
  "Paediatric Dentistry",
  "Gum Care",
];

function Row() {
  return (
    <>
      {items.map((item) => (
        <span key={item} className="flex shrink-0 items-center gap-8">
          <span className="font-display text-lg italic text-stone-500">
            {item}
          </span>
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand/60"
          />
        </span>
      ))}
    </>
  );
}

/** Slow editorial strip of specialities between hero and content. */
export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-stone-200 bg-white py-4">
      <div className="flex w-max gap-8 animate-marquee">
        <div className="flex shrink-0 items-center gap-8">
          <Row />
        </div>
        <div aria-hidden="true" className="flex shrink-0 items-center gap-8">
          <Row />
        </div>
      </div>
    </div>
  );
}
