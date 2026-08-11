/**
 * The clinic's consultants. Bios and credentials supplied by the clinic.
 *
 * `photo` is a path under /public. If the file isn't there yet the consultants
 * page falls back to a monogram automatically — drop the image in and it
 * appears, no code change needed. See public/images/team/README.txt.
 */

export type Doctor = {
  /** URL-safe id, used for anchors */
  id: string;
  name: string;
  role: string;
  qualification: string;
  photo: string;
  photoAlt: string;
  /** Tailwind object-position class, to fine-tune the crop (e.g. "object-top") */
  focus?: string;
  /** Short line under the name on cards */
  summary: string;
  /** Full bio, one string per paragraph */
  bio: string[];
  credentials: { label: string; value: string }[];
};

export const doctors: Doctor[] = [
  {
    id: "dr-esha",
    name: "Dr. Esha",
    role: "Founder & Principal Dentist",
    qualification: "BDS, MDS",
    photo: "/images/team/dr-esha.png",
    photoAlt: "Dr. Esha at Excel Dental Clinic & Implant Centre",
    // She sits left of centre in the frame, so hold the crop to the left edge.
    focus: "object-left",
    summary:
      "13+ years in clinical dentistry. Root canals, crowns, child dentistry and implantology.",
    bio: [
      "Dr. Esha is a dental surgeon with more than 13 years of experience in clinical dentistry, following an MDS in Oral Pathology and Microbiology. A meritorious student throughout her postgraduate years, she was University topper and Silver Medallist in her MDS.",
      "She has worked at Maulana Azad Institute of Dental Sciences (MAIDS) and Sir Ganga Ram Hospital. She then served as Clinic Head for Axiss Dental and Clove Dental over nine years, before opening her own private practice.",
      "Her areas of expertise are root canal treatment, crowns, child dentistry, implantology, and the diagnosis and treatment planning of fixed and removable orthodontics. She has carried out more than 5,000 root canals and crowns.",
    ],
    credentials: [
      { label: "Qualification", value: "BDS, MDS — Oral Pathology & Microbiology" },
      { label: "Distinction", value: "University Topper & Silver Medallist, MDS" },
      { label: "Experience", value: "13+ years · 5,000+ root canals and crowns" },
      { label: "Formerly", value: "MAIDS · Sir Ganga Ram Hospital" },
      { label: "Formerly", value: "Clinic Head, Axiss Dental & Clove Dental" },
    ],
  },
  {
    id: "dr-amit-narang",
    name: "Dr. Amit Narang",
    role: "Implantologist",
    qualification: "BDS, Cert. Implantology (Harvard)",
    photo: "/images/team/dr-amit-narang.png",
    photoAlt: "Dr. Amit Narang, implantologist at Excel Dental",
    focus: "object-top",
    summary:
      "Harvard-certified implantologist. Full mouth reconstruction and advanced grafting.",
    bio: [
      "Dr. Amit Narang is an implantologist certified in Implantology by the Harvard School of Dental Medicine, Boston, USA. He completed his Bachelor of Dental Surgery at Dr. M.G.R. Medical University, Chennai, in 1998.",
      "As part of the Excel Dental implant team, he carries out advanced implantological procedures including sinus lifts, ridge splits, autogenous bone harvesting and a range of bone grafting techniques.",
      "His work covers full mouth reconstructions, immediate and delayed placement and loading, and “Teeth in an Hour” using the All-on-Four approach from Nobel Biocare.",
    ],
    credentials: [
      { label: "Certification", value: "Implantology, Harvard School of Dental Medicine" },
      { label: "Qualification", value: "BDS, Dr. M.G.R. Medical University, Chennai (1998)" },
      { label: "Specialises in", value: "Sinus lifts, ridge splits, bone grafting" },
      { label: "Also", value: "All-on-Four — “Teeth in an Hour”, Nobel Biocare" },
    ],
  },
  {
    id: "dr-varun-goyal",
    name: "Dr. Varun Goyal",
    role: "Orthodontist",
    qualification: "BDS, MDS — Orthodontics",
    photo: "/images/team/dr-varun-goyal.png",
    photoAlt: "Dr. Varun Goyal, orthodontist at Excel Dental",
    summary:
      "Professor of Orthodontics with 14+ years' experience. Braces and clear aligners.",
    bio: [
      "Dr. Varun Goyal has more than 14 years of experience and is Professor in the Department of Orthodontics and Dentofacial Orthopedics at Sudha Rustagi College of Dental Sciences and Research, Faridabad.",
      "He has practised as a specialist orthodontist in India, Dubai and Sharjah, and for the past ten years has run Goyal's Dental and Orthodontics Centre in Faridabad, a NABH-accredited practice. He is also consultant orthodontist to a number of dental practices and hospitals across Delhi NCR, and runs an in-house aligner setup for clear aligner therapy.",
      "He has lectured at national and international conferences, authored several book chapters, and published more than 80 papers in peer-reviewed journals, with two patents to his name. He is currently pursuing a PhD in digital dentistry and 3D printing.",
    ],
    credentials: [
      { label: "Role", value: "Professor, Sudha Rustagi College of Dental Sciences" },
      { label: "Experience", value: "14+ years · India, Dubai & Sharjah" },
      { label: "Research", value: "80+ publications · 2 patents · PhD in progress" },
      { label: "Also", value: "In-house clear aligner therapy" },
    ],
  },
];
