"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/treatments";

function FaqItem({ faq }: { faq: Faq }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="rounded-2xl border border-stone-200 bg-white transition-colors duration-200 hover:border-stone-300">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <span className="font-medium text-ink">{faq.q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-brand transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div id={panelId} className="accordion-panel" data-open={open}>
        <div>
          <p className="px-6 pb-6 text-[0.95rem] leading-relaxed text-stone-600">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <FaqItem key={faq.q} faq={faq} />
      ))}
    </div>
  );
}
