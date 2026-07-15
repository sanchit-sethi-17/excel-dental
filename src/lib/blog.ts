export type BlogSection =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  readMinutes: number;
  category: string;
  sections: BlogSection[];
};

/**
 * Starter articles. New posts = new entries here (or migrate to MDX later —
 * the page components only depend on this shape).
 */
export const posts: BlogPost[] = [
  {
    slug: "root-canal-myths",
    title: "Five myths about root canals — and what's actually true",
    excerpt:
      "“Root canal” might be the most unfairly feared phrase in dentistry. Here's what the treatment really involves today.",
    date: "2026-07-01",
    readMinutes: 4,
    category: "Root Canal",
    sections: [
      {
        type: "p",
        text: "Few dental treatments carry as much unearned fear as the root canal. Most of that reputation dates back decades — to a time before modern anaesthesia, rotary instruments, and digital X-rays. Let's take the most common myths one by one.",
      },
      { type: "h2", text: "Myth 1: Root canals are extremely painful" },
      {
        type: "p",
        text: "The pain people associate with root canals is almost always the toothache that made the treatment necessary. The procedure itself is done under local anaesthesia, and most patients compare it to getting a filling. The treatment is how the pain ends, not how it starts.",
      },
      { type: "h2", text: "Myth 2: It's better to just remove the tooth" },
      {
        type: "p",
        text: "A natural tooth — even one that has had a root canal — almost always serves you better than a gap or a replacement. Extraction can seem simpler, but the space it leaves causes neighbouring teeth to drift and bone to shrink, and replacing the tooth properly later costs more than saving it now.",
      },
      { type: "h2", text: "Myth 3: A root canal takes many long visits" },
      {
        type: "p",
        text: "With rotary instrumentation, many root canals are completed in a single visit. Complex cases may need two or three shorter appointments — your dentist should tell you the plan before starting.",
      },
      { type: "h2", text: "Myth 4: The tooth is dead, so it will fall out anyway" },
      {
        type: "p",
        text: "A root-canal-treated tooth no longer has a nerve, but it remains anchored in the bone and fully functional. Protected with a crown, it can last for decades — often for life.",
      },
      { type: "h2", text: "Myth 5: If nothing hurts, the infection is gone" },
      {
        type: "p",
        text: "An infected tooth can go quiet without healing. Inside, the infection continues and can surface later as swelling or an abscess. If you've been advised you need a root canal, a pain-free week doesn't change the diagnosis.",
      },
      {
        type: "p",
        text: "If a tooth has been troubling you — sensitivity to heat, pain on biting, or an ache that comes and goes — an examination and a single X-ray will tell you exactly where you stand.",
      },
    ],
  },
  {
    slug: "daily-oral-hygiene-routine",
    title: "A dentist's daily oral hygiene routine, minute by minute",
    excerpt:
      "You don't need a shelf of products — you need a few minutes, used correctly. The routine we'd recommend to family.",
    date: "2026-06-15",
    readMinutes: 5,
    category: "Oral Hygiene",
    sections: [
      {
        type: "p",
        text: "Ask ten people how to look after their teeth and you'll hear ten routines. The essentials are simpler than most product aisles suggest — but the details of technique matter more than the tools.",
      },
      { type: "h2", text: "Morning: two minutes, soft brush, gentle circles" },
      {
        type: "p",
        text: "Use a soft-bristled brush and fluoride toothpaste. Angle the bristles towards the gum line at roughly 45 degrees and use small circular motions — not hard horizontal scrubbing, which wears enamel and recedes gums over time. Two minutes is genuinely enough; most people stop at forty seconds.",
      },
      { type: "h2", text: "The step most people skip: between the teeth" },
      {
        type: "p",
        text: "A toothbrush cleans three of the five surfaces of each tooth. Floss or interdental brushes handle the other two — which is where most cavities between teeth and most gum problems begin. Once a day, ideally before your night brushing.",
      },
      { type: "h2", text: "Night: the brushing that matters most" },
      {
        type: "p",
        text: "Saliva flow drops while you sleep, which means less natural protection for your enamel. Brushing right before bed — with nothing to eat or drink afterwards except water — is the single most valuable habit in this whole article.",
      },
      { type: "h2", text: "What about mouthwash, tongue cleaning, and whitening pastes?" },
      {
        type: "list",
        items: [
          "Mouthwash: a supplement, never a substitute. Useful for specific conditions when your dentist recommends one.",
          "Tongue cleaning: a genuine help for fresh breath — a gentle scrape once a day is plenty.",
          "Highly abrasive 'whitening' pastes: often too harsh for daily use. If staining bothers you, professional cleaning is safer and works better.",
        ],
      },
      { type: "h2", text: "And every six months…" },
      {
        type: "p",
        text: "Even a perfect home routine can't remove hardened tartar or spot a small cavity under the surface. A professional clean and check-up twice a year keeps small issues small — it's the least expensive appointment in dentistry precisely because it prevents the expensive ones.",
      },
    ],
  },
  {
    slug: "dental-implant-aftercare",
    title: "You've got a new dental implant. Now what?",
    excerpt:
      "Implants have excellent long-term success — and aftercare is a bigger part of that than most patients realise.",
    date: "2026-05-28",
    readMinutes: 4,
    category: "Implants",
    sections: [
      {
        type: "p",
        text: "A dental implant is designed to serve you for decades. The implant itself can't decay — but the gum and bone around it still need the same care as natural teeth. Here's what the first days, weeks, and years should look like.",
      },
      { type: "h2", text: "The first 48 hours" },
      {
        type: "list",
        items: [
          "Mild soreness and slight swelling are normal — a cold compress and the prescribed medication handle it.",
          "Stick to soft, lukewarm food and avoid chewing on the implant side.",
          "Don't rinse vigorously or probe the area with your tongue; the early clot is doing important work.",
          "No smoking — it measurably impairs healing around implants.",
        ],
      },
      { type: "h2", text: "The healing weeks" },
      {
        type: "p",
        text: "Over the next two to four months, the bone quietly bonds with the implant surface. You won't feel this happening — which is exactly why patients are tempted to skip review visits. Keep them: they're short, and they're how small issues are caught before they matter.",
      },
      { type: "h2", text: "Living with an implant, long term" },
      {
        type: "p",
        text: "Treat it like a natural tooth with one extra rule: the gum seal around an implant is its weak point, so gentle, thorough cleaning along the gum line — brush plus floss or interdental brushes — is non-negotiable. Professional cleaning and a check every six months protects the investment.",
      },
      { type: "h2", text: "When to call us" },
      {
        type: "p",
        text: "Persistent pain after the first week, bleeding or swelling that returns after it had settled, or any feeling of looseness — these are all reasons to come in promptly rather than wait for the next scheduled visit. Caught early, almost everything around an implant is fixable.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function formatPostDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
