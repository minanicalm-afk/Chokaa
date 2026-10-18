/**
 * Every company fact used by the site.
 * Values marked PLACEHOLDER must be replaced before launch.
 */

export const site = {
  name: "Chokaa Works",
  legalName: "Chokaa Works Limited",
  tagline: "We build with clarity, from foundation to handover.",
  description:
    "A Nairobi building contractor for houses, fit-outs, and civil works. On site since 2011, from foundation to handover.",
  established: 2011,
  url: "https://chokaaworks.co.ke",
  email: "studio@chokaaworks.co.ke",
  phone: {
    display: "+254 700 000 111",
    e164: "+254700000111",
    whatsapp: "254700000111",
  },
  whatsappPrefill: "Hello. I would like to talk about a building project.",
  address: {
    line1: "Studio 4, General Mathenge Drive",
    area: "Westlands",
    city: "Nairobi",
    country: "Kenya",
    countryCode: "KE",
  },
  nca: {
    number: "NCA/XXXXX/2024",
    category: "Building works",
  },
  registration: {
    companyNumber: "CPR/XXXXXX",
    kraPin: "A000000000X",
  },
  compliance: {
    doshs: "DOSHS compliant",
    insurance: "Insured",
    kra: "KRA compliant",
  },
  counties: ["Nairobi", "Kiambu", "Nakuru", "Mombasa"] as const,
  sectors: [
    { value: "residential", label: "Residential" },
    { value: "commercial", label: "Commercial" },
    { value: "civil", label: "Civil" },
    { value: "renovation", label: "Renovation" },
  ] as const,
  /** PLACEHOLDER — confirm the fee before live M-Pesa payments. */
  consultationFeeKes: 5000,
  capabilityStatementHref: "/capability-statement",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Westlands%2C%20Nairobi&z=14&output=embed",
  nav: [
    { href: "/work", label: "Work" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/insights", label: "Insights" },
    { href: "/procurement", label: "Procurement" },
  ],
  process: [
    {
      name: "Consult",
      duration: "About a week",
      summary: "We visit the plot, listen, and agree what is in and out of scope.",
    },
    {
      name: "Design & approve",
      duration: "2–6 weeks",
      summary: "Drawings, county approvals, and a cost band you can hold us to.",
    },
    {
      name: "Build",
      duration: "The agreed programme",
      summary: "A named site team, a written programme, and regular progress notes.",
    },
    {
      name: "Handover",
      duration: "About a week",
      summary: "Snagging, as-built notes, and a clear handover.",
    },
  ],
  /** PLACEHOLDER names and qualifications. */
  team: [
    {
      name: "Amina Wanjiku",
      role: "Managing Director",
      qualification: "BSc Civil Engineering, EBK Registered",
    },
    {
      name: "David Otieno",
      role: "Site Engineer",
      qualification: "Diploma in Civil Engineering",
    },
    {
      name: "Faith Mwangi",
      role: "Quantity Surveyor",
      qualification: "BSc Quantity Surveying, IQSK",
    },
    {
      name: "Brian Kimani",
      role: "Project Manager",
      qualification: "BSc Construction Management",
    },
  ],
  /** PLACEHOLDER plant list for the procurement page. */
  plant: [
    "Concrete mixer",
    "Plate compactor",
    "Scaffold set",
    "Site pickup",
  ],
} as const;

export const credentialLine = [
  "NCA registered",
  site.nca.number,
  "DOSHS compliant",
  "Insured",
  `Since ${site.established}`,
] as const;

export function whatsappHref() {
  const text = encodeURIComponent(site.whatsappPrefill);
  return `https://wa.me/${site.phone.whatsapp}?text=${text}`;
}

export function telHref() {
  return `tel:${site.phone.e164}`;
}
