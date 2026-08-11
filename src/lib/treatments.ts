import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Anchor,
  AlignCenterVertical,
  Baby,
  CircleDot,
  Crown,
  Layers,
  ShieldCheck,
  Smile,
  Sparkle,
  Stethoscope,
  Zap,
} from "lucide-react";

export type Faq = { q: string; a: string };
export type ProcessStep = { title: string; detail: string };

export type Treatment = {
  slug: string;
  name: string;
  shortName: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  /** One-line card copy — short and clinical */
  excerpt: string;
  /** Two-sentence intro on the detail page */
  intro: string;
  benefits: string[];
  process: ProcessStep[];
  faqs: Faq[];
  facts: { label: string; value: string }[];
};

export const focusTreatments: Treatment[] = [
  {
    slug: "dental-implants",
    name: "Dental Implants",
    shortName: "Implants",
    icon: Anchor,
    image: "https://images.unsplash.com/photo-1593022356769-11f762e25ed9?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Dental implant model showing a titanium post and crown",
    excerpt: "A permanent, natural-looking replacement for missing teeth.",
    intro:
      "A dental implant is a titanium post placed in the jaw to replace the root of a missing tooth, supporting a crown, bridge or denture matched to your natural teeth. Implants are a long-lasting, natural-looking replacement that restores normal function and helps preserve the surrounding jawbone.",
    benefits: [
      "Looks and functions like a natural tooth",
      "Preserves the jawbone after tooth loss",
      "Does not rely on or alter neighbouring teeth",
      "A long-lasting solution with routine care",
    ],
    process: [
      {
        title: "Assessment & planning",
        detail:
          "Examination and imaging confirm bone quality and the correct implant position.",
      },
      {
        title: "Implant placement",
        detail: "The implant is placed in the jaw under local anaesthesia.",
      },
      {
        title: "Healing",
        detail:
          "The bone integrates with the implant over the following weeks to form a stable foundation.",
      },
      {
        title: "Crown fitting",
        detail:
          "A custom crown is fixed onto the implant and the bite is checked.",
      },
    ],
    faqs: [
      {
        q: "Am I suitable for an implant?",
        a: "Most healthy adults with a missing tooth are. Bone volume and gum health are assessed first, and we advise honestly if an alternative is more appropriate.",
      },
      {
        q: "How long does treatment take?",
        a: "Typically two to four months from placement to the final crown, most of which is healing time.",
      },
      {
        q: "How long do implants last?",
        a: "With good hygiene and regular reviews, implants can last many years, often decades.",
      },
    ],
    facts: [
      { label: "Material", value: "Titanium" },
      { label: "Timeline", value: "2–4 months" },
      { label: "Anaesthesia", value: "Local" },
    ],
  },
  {
    slug: "root-canal-treatment",
    name: "Root Canal Treatment",
    shortName: "Root Canal",
    icon: Activity,
    image: "https://images.unsplash.com/photo-1657470179447-0f5aa16daa91?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Dentist carrying out treatment on a patient",
    excerpt: "Removes infection and saves a damaged natural tooth.",
    intro:
      "Root canal treatment (endodontics) removes infected or damaged pulp from the centre of a tooth, saving it from extraction and restoring its function. It is carried out under local anaesthesia using modern rotary instruments, and is not painful.",
    benefits: [
      "Relieves pain caused by infection",
      "Preserves the natural tooth",
      "Performed under local anaesthesia",
      "Often completed in a single visit",
    ],
    process: [
      {
        title: "Diagnosis",
        detail:
          "Examination and a digital X-ray confirm whether root canal treatment is required.",
      },
      {
        title: "Anaesthesia",
        detail: "The tooth is fully numbed before treatment begins.",
      },
      {
        title: "Cleaning & shaping",
        detail:
          "Infected tissue is removed and the canals are cleaned and disinfected.",
      },
      {
        title: "Sealing & crown",
        detail: "The canals are sealed and the tooth is protected with a crown.",
      },
    ],
    faqs: [
      {
        q: "Is the procedure painful?",
        a: "It is carried out under local anaesthesia and is comparable to having a filling. The treatment relieves the pain caused by the infection.",
      },
      {
        q: "How many visits are needed?",
        a: "Many cases are completed in a single visit; more complex teeth may need two.",
      },
      {
        q: "Do I need a crown afterwards?",
        a: "In most cases, yes. A crown protects the treated tooth and helps it last.",
      },
    ],
    facts: [
      { label: "Anaesthesia", value: "Local" },
      { label: "Visits", value: "1–2" },
      { label: "Goal", value: "Save the tooth" },
    ],
  },
  {
    slug: "orthodontic-treatment",
    name: "Orthodontics",
    shortName: "Orthodontics",
    icon: AlignCenterVertical,
    image: "https://images.unsplash.com/photo-1598256989809-394fa4f6cd26?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Close-up of a patient with orthodontic braces",
    excerpt:
      "Braces and clear aligners to straighten teeth and correct the bite.",
    intro:
      "Braces and aligners correct crooked, gapped, rotated or crowded teeth. Braces — metal or ceramic — give precise control, while clear aligners are removable trays of medical-grade plastic, custom-fitted to your teeth. A well-aligned bite is easier to keep clean and more comfortable over time.",
    benefits: [
      "Corrects crowding, gaps and bite problems",
      "Fixed braces or discreet clear aligners",
      "Straighter teeth are easier to keep clean",
      "Suitable for teenagers and adults",
    ],
    process: [
      {
        title: "Assessment",
        detail: "Records and X-rays establish how the teeth and jaws relate.",
      },
      {
        title: "Treatment plan",
        detail: "We recommend braces or clear aligners with a clear timeline.",
      },
      {
        title: "Fitting",
        detail: "Braces are fitted or the first set of aligners is provided.",
      },
      {
        title: "Reviews & retention",
        detail:
          "Regular reviews keep treatment on track; retainers hold the result.",
      },
    ],
    faqs: [
      {
        q: "Am I too old for orthodontic treatment?",
        a: "No. Healthy teeth can be aligned at any age, and many patients are adults.",
      },
      {
        q: "Braces or clear aligners?",
        a: "It depends on the case. Braces handle complex movements; aligners are discreet and removable. We advise which suits you.",
      },
      {
        q: "How long does treatment take?",
        a: "Most cases take 12–24 months depending on complexity.",
      },
    ],
    facts: [
      { label: "Options", value: "Braces & aligners" },
      { label: "Duration", value: "12–24 months" },
      { label: "Ages", value: "Teens & adults" },
    ],
  },
  {
    slug: "oral-hygiene",
    name: "Oral Hygiene & Preventive Care",
    shortName: "Oral Hygiene",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1681939278218-a755fb2bf2d3?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Dental hygiene treatment being carried out",
    excerpt: "Professional cleaning and check-ups for healthy teeth and gums.",
    intro:
      "Routine cleaning and check-ups remove plaque and tartar, treat early gum problems and help prevent decay. Preventive care is the foundation of long-term oral health.",
    benefits: [
      "Removes plaque and hardened tartar",
      "Supports healthy gums",
      "Detects decay and other issues early",
      "Recommended every six months",
    ],
    process: [
      {
        title: "Examination",
        detail: "Teeth and gums are checked, with X-rays only where indicated.",
      },
      {
        title: "Scaling",
        detail: "Plaque and tartar are removed from the teeth and gum line.",
      },
      {
        title: "Polishing",
        detail: "Surfaces are polished to slow the return of plaque.",
      },
      {
        title: "Advice & recall",
        detail: "We provide home-care advice and schedule your next visit.",
      },
    ],
    faqs: [
      {
        q: "How often should I have a cleaning?",
        a: "Every six months suits most patients; more often if you have gum disease.",
      },
      {
        q: "Does scaling damage the teeth?",
        a: "No. Scaling removes hardened deposits from the tooth surface and does not harm the tooth.",
      },
      {
        q: "My gums bleed when I brush — is that normal?",
        a: "Bleeding gums are a sign of inflammation and are very treatable. It is a reason to book a check-up.",
      },
    ],
    facts: [
      { label: "Visit", value: "30–45 minutes" },
      { label: "Recommended", value: "Every 6 months" },
      { label: "For", value: "All ages" },
    ],
  },
];

/** Additional services shown as cards on the treatments index. */
export type Service = {
  name: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  /** One-line card copy */
  blurb: string;
  /** Fuller explanation, shown on the treatments page. Supplied by the clinic. */
  description?: string;
};

export const otherServices: Service[] = [
  {
    name: "Dental Fillings",
    icon: Sparkle,
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "A dentist carrying out a filling",
    blurb: "Tooth-coloured fillings that repair cavities and decay.",
    description:
      "Dental fillings repair cavities by filling in areas of damage or decay. Several materials are available, including amalgam and tooth-coloured options such as composite resin and porcelain. Our emphasis is on composite — aesthetic restorations that match the natural tooth. Depending on the material, a filling can last up to two decades.",
  },
  {
    name: "Full Mouth Rehabilitation",
    icon: Layers,
    image: "https://images.unsplash.com/photo-1667133295315-820bb6481730?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Dentist reviewing a full-mouth treatment plan",
    blurb: "Comprehensive restoration of worn, damaged or missing teeth.",
  },
  {
    name: "Implant-Supported Dentures",
    icon: Anchor,
    image: "https://images.unsplash.com/photo-1468493858157-0da44aaf1d13?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "A denture held in a gloved hand",
    blurb: "Stable, secure dentures anchored by dental implants.",
  },
  {
    name: "Crowns & Bridges",
    icon: Crown,
    image: "https://images.unsplash.com/photo-1684607632829-1e5bf4f21dab?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "A dental crown model",
    blurb: "Restorations that rebuild damaged teeth and replace gaps.",
    description:
      "Crowns and bridges are fixed prosthetic devices. Unlike dentures, which are removable, they are cemented onto existing teeth or implants and can only be removed by a dentist. A crown is fitted over an existing tooth or implant; a bridge replaces a missing tooth.",
  },
  {
    name: "Laser Dentistry",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1758205308106-5760d0227cc7?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Dental treatment being carried out with modern equipment",
    blurb: "Precise, minimally invasive treatment for gums and soft tissue.",
  },
  {
    name: "Child Dentistry",
    icon: Baby,
    image: "https://images.unsplash.com/photo-1758205307836-0829c799890b?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "A dentist checking a child's teeth",
    blurb: "Gentle preventive and routine care for children.",
  },
  {
    name: "Wisdom Tooth Removal",
    icon: CircleDot,
    image: "https://images.unsplash.com/photo-1681939282781-341ac4f61996?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "A patient having their teeth examined",
    blurb: "Removal of impacted wisdom teeth, and routine extractions.",
    description:
      "Wisdom tooth removal is a common surgical procedure to extract one or more third molars — the four permanent adult teeth at the back corners of the mouth. It is usually advised for impaction, crowding, or a risk of repeated infection. Routine extractions are carried out here too.",
  },
  {
    name: "Gum (Periodontal) Care",
    icon: Stethoscope,
    image: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "A dental hygienist at work",
    blurb: "Treatment for gum disease and inflammation.",
  },
  {
    name: "Dentures",
    icon: Smile,
    image: "https://images.unsplash.com/photo-1473232117216-c950d4ef2e14?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "A set of dentures",
    blurb: "Custom full and partial dentures for missing teeth.",
    description:
      "Dentures are prosthetic devices that replace missing teeth, supported by the surrounding soft and hard tissues of the mouth. Conventional dentures are removable, but many designs exist — some bond or clasp onto remaining teeth or dental implants.",
  },
];

export function getTreatment(slug: string): Treatment | undefined {
  return focusTreatments.find((t) => t.slug === slug);
}
