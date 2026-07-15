import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Anchor,
  AlignCenterVertical,
  Baby,
  CircleDot,
  Crown,
  ShieldCheck,
  Sparkle,
  Stethoscope,
} from "lucide-react";

export type Faq = { q: string; a: string };
export type ProcessStep = { title: string; detail: string };

export type Treatment = {
  slug: string;
  name: string;
  shortName: string;
  icon: LucideIcon;
  /** One-line card copy */
  excerpt: string;
  /** Hero paragraph on the detail page */
  intro: string;
  benefits: string[];
  process: ProcessStep[];
  faqs: Faq[];
  /** Small factual chips shown under the detail hero */
  facts: { label: string; value: string }[];
};

export const focusTreatments: Treatment[] = [
  {
    slug: "root-canal-treatment",
    name: "Root Canal Treatment",
    shortName: "Root Canal",
    icon: Activity,
    excerpt:
      "Gentle, single-visit-where-possible root canal therapy that saves your natural tooth and ends the pain.",
    intro:
      "A root canal removes infected tissue from inside the tooth, relieves pain, and preserves the natural tooth — almost always the better outcome compared to extraction. At Excel Dental, root canal treatment is performed under local anaesthesia with rotary instrumentation and apex locators for precise, comfortable therapy.",
    benefits: [
      "Relieves toothache at its source instead of masking it",
      "Preserves your natural tooth and bite",
      "Local anaesthesia and modern rotary technique for comfort",
      "Single-visit treatment where clinically suitable",
      "Finished with a crown for long-term protection",
    ],
    process: [
      {
        title: "Diagnosis & X-ray",
        detail:
          "We examine the tooth, take a digital X-ray, and confirm whether root canal therapy is the right treatment — and explain exactly why.",
      },
      {
        title: "Comfortable anaesthesia",
        detail:
          "The tooth is fully numbed. Most patients describe the procedure as no more uncomfortable than a routine filling.",
      },
      {
        title: "Cleaning & shaping",
        detail:
          "Infected pulp is removed and the canals are cleaned, shaped, and disinfected using rotary instruments.",
      },
      {
        title: "Sealing",
        detail:
          "The canals are sealed with a biocompatible filling material to prevent re-infection.",
      },
      {
        title: "Crown & follow-up",
        detail:
          "A crown restores full strength to the treated tooth. We review healing at your follow-up visit.",
      },
    ],
    faqs: [
      {
        q: "Is a root canal painful?",
        a: "With modern anaesthesia and rotary technique, the procedure itself is comfortable — most patients feel pressure, not pain. The toothache you came in with is what the treatment removes.",
      },
      {
        q: "How many visits will I need?",
        a: "Many root canals can be completed in a single visit. Complex or heavily infected teeth may need two to three shorter visits. We'll tell you the plan before we begin.",
      },
      {
        q: "Do I really need a crown afterwards?",
        a: "In most cases, yes. A root-canal-treated tooth becomes more brittle over time, and a crown protects it so it can last for many years.",
      },
      {
        q: "What happens if I delay treatment?",
        a: "Infection inside a tooth doesn't resolve on its own. Delaying usually means more pain, possible swelling or abscess, and a higher chance the tooth can no longer be saved.",
      },
    ],
    facts: [
      { label: "Anaesthesia", value: "Local" },
      { label: "Visits", value: "1–3" },
      { label: "Goal", value: "Save the natural tooth" },
    ],
  },
  {
    slug: "dental-implants",
    name: "Dental Implants",
    shortName: "Implants",
    icon: Anchor,
    excerpt:
      "Permanent, natural-feeling replacement for missing teeth — planned precisely, placed gently.",
    intro:
      "A dental implant is a small titanium post that replaces the root of a missing tooth, topped with a crown that looks and functions like your own. Implants protect the jawbone, don't rely on neighbouring teeth, and with good care can last decades. As an implant centre, this is at the heart of what we do.",
    benefits: [
      "Closest replacement to a natural tooth in look, feel, and function",
      "Preserves jawbone that would otherwise shrink after tooth loss",
      "No grinding down of healthy neighbouring teeth (unlike bridges)",
      "Eat, speak, and smile without slipping dentures",
      "Decades of service with routine care",
    ],
    process: [
      {
        title: "Assessment & planning",
        detail:
          "Clinical examination and imaging let us assess bone quality and plan the implant position precisely before anything else happens.",
      },
      {
        title: "Implant placement",
        detail:
          "The titanium implant is placed in the jaw under local anaesthesia — a shorter and calmer appointment than most patients expect.",
      },
      {
        title: "Healing & integration",
        detail:
          "Over the following weeks the bone bonds with the implant (osseointegration), creating a foundation as stable as a natural root.",
      },
      {
        title: "Crown placement",
        detail:
          "A custom crown, matched to your natural teeth, is fixed onto the implant. Bite and fit are checked and refined.",
      },
      {
        title: "Long-term care",
        detail:
          "Implants are maintained like natural teeth — good hygiene and periodic reviews keep them healthy for the long run.",
      },
    ],
    faqs: [
      {
        q: "Am I a candidate for implants?",
        a: "Most healthy adults with a missing tooth are. Bone volume, gum health, and general health are assessed first — if an implant isn't the right choice for you, we'll say so and discuss alternatives honestly.",
      },
      {
        q: "How long does the whole process take?",
        a: "Typically two to four months from placement to final crown, most of which is quiet healing time. Some cases qualify for faster protocols.",
      },
      {
        q: "Is implant placement painful?",
        a: "The procedure is done under local anaesthesia and most patients report less discomfort than a tooth extraction. Mild soreness for a few days is normal and manageable.",
      },
      {
        q: "How long do implants last?",
        a: "With good oral hygiene and regular check-ups, implants routinely last 15–25 years and often a lifetime. The crown on top may be replaced after 10–15 years of wear.",
      },
    ],
    facts: [
      { label: "Material", value: "Titanium" },
      { label: "Timeline", value: "2–4 months" },
      { label: "Feels like", value: "A natural tooth" },
    ],
  },
  {
    slug: "orthodontic-treatment",
    name: "Orthodontic Treatment",
    shortName: "Orthodontics",
    icon: AlignCenterVertical,
    excerpt:
      "Braces and clear aligners that straighten teeth and correct your bite — for children, teens, and adults.",
    intro:
      "Orthodontics is about more than straight teeth: a well-aligned bite is easier to clean, wears evenly, and functions comfortably for life. We offer conventional and ceramic braces as well as clear aligners, with a plan matched to your age, goals, and lifestyle.",
    benefits: [
      "Corrects crowding, gaps, and bite problems at any age",
      "Options from conventional braces to discreet clear aligners",
      "Easier cleaning and healthier gums after alignment",
      "Balanced bite reduces uneven wear and jaw strain",
      "Structured reviews to keep treatment on schedule",
    ],
    process: [
      {
        title: "Orthodontic assessment",
        detail:
          "Records, photographs, and X-rays establish exactly how your teeth and jaws relate — the foundation of an honest treatment plan.",
      },
      {
        title: "Plan & options",
        detail:
          "We walk you through the suitable options — metal braces, ceramic braces, or clear aligners — with realistic timelines and costs for each.",
      },
      {
        title: "Fitting",
        detail:
          "Braces are bonded or your first aligner set is delivered, with clear guidance on eating, cleaning, and what the first week feels like.",
      },
      {
        title: "Adjustment visits",
        detail:
          "Short visits every 4–8 weeks keep teeth moving as planned. Aligner patients switch trays on a set schedule.",
      },
      {
        title: "Retention",
        detail:
          "Once alignment is complete, retainers hold the result — the step that protects everything you've invested.",
      },
    ],
    faqs: [
      {
        q: "Am I too old for braces?",
        a: "No. Healthy teeth and gums can be moved at any age — a large share of orthodontic patients today are adults, many choosing clear aligners for discretion.",
      },
      {
        q: "How long does treatment take?",
        a: "Most cases take 12–24 months depending on complexity. Minor corrections can be quicker; we'll give you a realistic estimate at assessment.",
      },
      {
        q: "Braces or clear aligners — which is better?",
        a: "It depends on the case. Braces handle complex movements reliably; aligners offer discretion and easier cleaning for suitable cases. We'll tell you honestly which fits yours.",
      },
      {
        q: "When should a child first see an orthodontist?",
        a: "Around age 7–8 is a good time for a first orthodontic check. Most children won't need early treatment, but catching jaw-growth issues early keeps options open.",
      },
    ],
    facts: [
      { label: "Options", value: "Braces & aligners" },
      { label: "Typical duration", value: "12–24 months" },
      { label: "Ages", value: "Children to adults" },
    ],
  },
  {
    slug: "oral-hygiene",
    name: "Oral Hygiene & Preventive Care",
    shortName: "Oral Hygiene",
    icon: ShieldCheck,
    excerpt:
      "Professional cleaning, gum care, and check-ups — the quiet habits that prevent expensive problems.",
    intro:
      "The best dentistry is the treatment you never need. Professional scaling and polishing, gum assessment, and regular check-ups catch problems while they're small — protecting your teeth and your budget. It's the foundation we recommend for every patient of every age.",
    benefits: [
      "Removes hardened tartar that brushing can't reach",
      "Healthier gums — the main defence against tooth loss in adults",
      "Fresher breath and a cleaner, brighter feel",
      "Early detection of decay, cracks, and gum disease",
      "Personalised home-care guidance, not generic advice",
    ],
    process: [
      {
        title: "Examination",
        detail:
          "Teeth, gums, and soft tissues are checked thoroughly, with X-rays only where clinically indicated.",
      },
      {
        title: "Scaling",
        detail:
          "Ultrasonic scaling lifts away plaque and hardened tartar from tooth surfaces and below the gum line.",
      },
      {
        title: "Polishing",
        detail:
          "Surfaces are polished smooth, making it harder for new plaque to take hold.",
      },
      {
        title: "Personal guidance",
        detail:
          "Brushing technique, interdental cleaning, and diet advice tailored to what we actually observed in your mouth.",
      },
      {
        title: "Recall schedule",
        detail:
          "Most patients benefit from a professional clean every six months; gum patients may need closer intervals.",
      },
    ],
    faqs: [
      {
        q: "Does scaling damage or weaken teeth?",
        a: "No — this is a common myth. Scaling removes hardened deposits sitting on the tooth. The 'gaps' patients sometimes feel afterwards were spaces the tartar had been occupying.",
      },
      {
        q: "How often should I get my teeth cleaned?",
        a: "Every six months suits most people. If you have gum disease, a history of heavy tartar, or wear braces, a shorter interval may be advised.",
      },
      {
        q: "My gums bleed when I brush. Is that normal?",
        a: "Bleeding gums are a sign of inflammation, usually early gum disease — and it's very treatable at this stage. It's a reason to book a check-up, not to brush less.",
      },
      {
        q: "Is professional cleaning painful?",
        a: "Routine scaling is generally comfortable. If your gums are inflamed you may feel mild sensitivity, which settles quickly as they heal.",
      },
    ],
    facts: [
      { label: "Visit length", value: "30–45 minutes" },
      { label: "Recommended", value: "Every 6 months" },
      { label: "For", value: "All ages" },
    ],
  },
];

/** Secondary services shown on the treatments index. */
export const otherServices: {
  name: string;
  icon: LucideIcon;
  blurb: string;
}[] = [
  {
    name: "Crowns & Bridges",
    icon: Crown,
    blurb: "Durable restorations that rebuild damaged teeth and close gaps.",
  },
  {
    name: "Tooth Extraction",
    icon: CircleDot,
    blurb: "Gentle removal — including wisdom teeth — when a tooth can't be saved.",
  },
  {
    name: "Dentures",
    icon: Sparkle,
    blurb: "Comfortable full and partial dentures, made to fit well and look natural.",
  },
  {
    name: "Paediatric Dentistry",
    icon: Baby,
    blurb: "Patient, friendly care that gives children a calm start with the dentist.",
  },
  {
    name: "Gum (Periodontal) Care",
    icon: Stethoscope,
    blurb: "Treatment for bleeding gums and periodontitis, from deep cleaning onwards.",
  },
];

export function getTreatment(slug: string): Treatment | undefined {
  return focusTreatments.find((t) => t.slug === slug);
}
