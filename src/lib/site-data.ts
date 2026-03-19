import { siteUrl } from "@/lib/utils";

export type ProductSlug =
  | "home"
  | "auto"
  | "renters"
  | "life"
  | "umbrella"
  | "condo"
  | "business"
  | "general-liability"
  | "workers-comp"
  | "commercial-property"
  | "commercial-auto"
  | "professional-liability"
  | "specialty-coverage"
  | "other";

export type ProductCategory = "personal" | "commercial";

export type Product = {
  slug: ProductSlug;
  name: string;
  shortName: string;
  description: string;
  icon: IconName;
  category: ProductCategory;
};

export type IconName =
  | "house"
  | "car"
  | "key"
  | "heartPulse"
  | "umbrella"
  | "building2"
  | "shield"
  | "hardHat"
  | "warehouse"
  | "truck"
  | "briefcase"
  | "sparkles"
  | "shieldCheck"
  | "slidersHorizontal"
  | "users"
  | "star";

export type Agent = {
  slug: "erin" | "brahm" | "dakota";
  name: string;
  firstName: string;
  title: string;
  phone: string;
  phoneHref?: string;
  email: string;
  bio: string;
  accent: "blue" | "navy" | "red";
  initials: string;
  specialties: string[];
  license?: string;
  photo?: {
    src: string;
    alt: string;
  };
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTime: string;
  tags: string[];
  intro: string;
  sections: Array<{
    heading: string;
    body: string;
    bullets?: string[];
  }>;
};

export type HomePageFaq = {
  question: string;
  answer: string;
};

export const agency = {
  name: "Allsberry Insurance Agency",
  fullName: "Allsberry Insurance Agency Inc",
  phone: "(951) 739-5959",
  phoneHref: "tel:+19517395959",
  email: "erin@allsberryagency.com",
  emailHref: "mailto:erin@allsberryagency.com",
  addressLine1: "355 N Sheridan St Ste 100",
  cityStateZip: "Corona, CA 92878",
  fullAddress: "355 N Sheridan St Ste 100, Corona, CA 92878",
  hours: "Monday–Friday, 8:00 AM – 5:00 PM",
  licenses: "CA #0E91043, Agency #6001414",
  ownerLicense: "CA License #0E91043",
  agencyLicense: "Agency #6001414",
  socials: {
    facebook: "https://facebook.com/AllsberryInsuranceagency",
    instagram: "https://instagram.com/allsberry_insurance",
    linkedin: "https://linkedin.com/in/erin-allsberry-2845a819",
  },
  founded: 1994,
  erinSince: 2009,
  domain: siteUrl,
  geo: {
    latitude: 33.88454,
    longitude: -117.56837,
  },
} as const;

// Publicly available media captured from Erin Allsberry's official Farmers profile
// on March 15, 2026.
export const officialProfile = {
  sourceUrl: "https://agents.farmers.com/ca/corona/erin-allsberry/",
  sourceLabel: "Official Erin Allsberry Farmers profile",
  headshot: {
    src: "/media/agents/erin-allsberry.png",
    alt: "Erin Allsberry, Agency Owner at Allsberry Insurance Agency",
  },
  highlights: [
    { label: "Location", value: "Corona, CA" },
    { label: "Phone", value: agency.phone },
    { label: "Coverage", value: "Home • Auto • Business • Life" },
  ],
  recognition: [
    {
      title: "Business Leadership Training",
      description: "Public profile image that adds real local context to the site.",
      image: {
        src: "/media/farmers/business-leadership-training.jpg",
        alt: "Business Leadership Training photo from Erin Allsberry's public Farmers profile",
      },
    },
    {
      title: "District 30 2020 Agency of the Year",
      description: "Award image published on Erin's public Farmers profile.",
      image: {
        src: "/media/farmers/district-30-award.jpg",
        alt: "District 30 2020 Agency of the Year award from Erin Allsberry's public Farmers profile",
      },
    },
  ],
  badges: [
    {
      title: "Topper Club Award",
      image: {
        src: "/media/farmers/topper-club-award.webp",
        alt: "Topper Club Award logo from the Farmers profile",
      },
    },
  ],
  productIcons: [
    {
      label: "Home",
      src: "/media/farmers/icon-home.svg",
      alt: "Home insurance icon from the Farmers profile",
    },
    {
      label: "Auto",
      src: "/media/farmers/icon-auto.svg",
      alt: "Auto insurance icon from the Farmers profile",
    },
    {
      label: "Business",
      src: "/media/farmers/icon-business.svg",
      alt: "Business insurance icon from the Farmers profile",
    },
    {
      label: "Life",
      src: "/media/farmers/icon-life.svg",
      alt: "Life insurance icon from the Farmers profile",
    },
  ],
} as const;

export const navigation = [
  { label: "Personal Insurance", href: "/#personal-insurance" },
  { label: "Commercial Insurance", href: "/#commercial-insurance" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const valueProps = [
  {
    title: "Seamless Experience",
    description: "Clear guidance, fast follow-up, and a smooth process from quote to coverage.",
    icon: "shieldCheck",
  },
  {
    title: "Personalized Coverage",
    description: "Protection tailored around your home, vehicles, business, and long-term goals.",
    icon: "slidersHorizontal",
  },
  {
    title: "Expert Advice",
    description: "Straight answers from a team that helps you compare options with confidence.",
    icon: "users",
  },
  {
    title: "Top-Rated Support",
    description: "Responsive service before, during, and after claims so you never feel on your own.",
    icon: "star",
  },
] as const;

export const products: Product[] = [
  {
    slug: "home",
    name: "Home Insurance",
    shortName: "Home",
    description: "Protect your home, belongings, and peace of mind with dependable coverage.",
    icon: "house",
    category: "personal",
  },
  {
    slug: "auto",
    name: "Auto Insurance",
    shortName: "Auto",
    description: "Coverage built for your vehicle, your commute, and the unexpected.",
    icon: "car",
    category: "personal",
  },
  {
    slug: "renters",
    name: "Renters Insurance",
    shortName: "Renters",
    description: "Affordable protection for your stuff, liability, and temporary living costs.",
    icon: "key",
    category: "personal",
  },
  {
    slug: "life",
    name: "Life Insurance",
    shortName: "Life",
    description: "Create a safety net for the people who matter most to you.",
    icon: "heartPulse",
    category: "personal",
  },
  {
    slug: "umbrella",
    name: "Umbrella Insurance",
    shortName: "Umbrella",
    description: "Extra liability protection that kicks in when standard policies run out.",
    icon: "umbrella",
    category: "personal",
  },
  {
    slug: "condo",
    name: "Condo Insurance",
    shortName: "Condo",
    description: "Designed for condo owners who want coverage beyond the HOA master policy.",
    icon: "building2",
    category: "personal",
  },
  {
    slug: "general-liability",
    name: "General Liability",
    shortName: "General Liability",
    description: "Foundational business protection for claims tied to injury, damage, or advertising.",
    icon: "shield",
    category: "commercial",
  },
  {
    slug: "workers-comp",
    name: "Workers Compensation",
    shortName: "Workers Comp",
    description: "Help protect your employees and keep your business compliant.",
    icon: "hardHat",
    category: "commercial",
  },
  {
    slug: "commercial-property",
    name: "Commercial Property",
    shortName: "Commercial Property",
    description: "Safeguard your building, equipment, inventory, and daily operations.",
    icon: "warehouse",
    category: "commercial",
  },
  {
    slug: "commercial-auto",
    name: "Commercial Auto",
    shortName: "Commercial Auto",
    description: "Coverage for company vehicles, drivers, cargo, and the miles that keep you moving.",
    icon: "truck",
    category: "commercial",
  },
  {
    slug: "professional-liability",
    name: "Professional Liability",
    shortName: "Professional Liability",
    description: "Reduce risk from client claims tied to professional services or advice.",
    icon: "briefcase",
    category: "commercial",
  },
  {
    slug: "specialty-coverage",
    name: "Specialty Coverage",
    shortName: "Specialty Coverage",
    description: "Flexible solutions for unique industries, specialty property, and hard-to-fit risks.",
    icon: "sparkles",
    category: "commercial",
  },
  {
    slug: "business",
    name: "Business Insurance",
    shortName: "Business",
    description: "A custom package for growing companies that need layered commercial protection.",
    icon: "briefcase",
    category: "commercial",
  },
  {
    slug: "other",
    name: "Other Coverage",
    shortName: "Other",
    description: "Tell us what you need and we will point you in the right direction.",
    icon: "sparkles",
    category: "personal",
  },
];

export const heroProductSlugs: ProductSlug[] = ["home", "auto", "life", "business", "renters", "umbrella"];

export const personalProducts = products.filter((product) =>
  ["home", "auto", "renters", "life", "umbrella", "condo"].includes(product.slug),
);

export const commercialProducts = products.filter((product) =>
  [
    "general-liability",
    "workers-comp",
    "commercial-property",
    "commercial-auto",
    "professional-liability",
    "specialty-coverage",
  ].includes(product.slug),
);

export const productSelectionOptions = [
  "home",
  "auto",
  "business",
  "workers-comp",
  "life",
  "renters",
  "condo",
  "umbrella",
  "other",
] as const satisfies ProductSlug[];

export const referralSources = [
  "Real Estate Agent",
  "Online Search",
  "Referral",
  "Social Media",
  "Other",
] as const;

export const employeeOptions = ["1-5", "6-15", "16-50", "51-100", "100+"] as const;

export const evidenceRequestTypes = [
  "Evidence of Insurance",
  "Certificate of Insurance (COI)",
  "Mortgagee / Loss Payee Update",
  "Closing / Escrow Request",
  "Other",
] as const;

export const reviews = [
  {
    name: "Corona, CA homeowner",
    body: "Switching our homeowners coverage felt easy. The team explained everything clearly and helped us land on protection that fit our family better.",
  },
  {
    name: "Local restaurant owner",
    body: "We needed business coverage quickly and Brahm made the process feel organized from the first call. He helped us understand what mattered and what could wait.",
  },
  {
    name: "Auto client",
    body: "I finally felt like someone was actually reviewing my auto policy instead of rushing me through it. The advice was practical and easy to trust.",
  },
  {
    name: "Small business client",
    body: "Responsive, thoughtful, and steady when we had questions about claims and coverage changes. You can tell this agency cares about follow-through.",
  },
] as const;

export const carrierPartners = [
  { name: "Farmers", domain: "farmers.com" },
  { name: "Travelers", domain: "travelers.com" },
  { name: "The Hartford", domain: "thehartford.com" },
  { name: "Progressive", domain: "progressive.com" },
  { name: "Liberty Mutual", domain: "libertymutual.com" },
  { name: "Chubb", domain: "chubb.com" },
  { name: "MetLife", domain: "metlife.com" },
  { name: "Zurich", domain: "zurichna.com" },
  { name: "Nationwide", domain: "nationwide.com" },
  { name: "Safeco", domain: "safeco.com" },
  { name: "Foremost", domain: "foremostinsurance.com" },
  { name: "Bristol West", domain: "bristolwest.com" },
  { name: "National General", domain: "nationalgeneral.com" },
  { name: "Hagerty", domain: "hagerty.com" },
  { name: "SageSure", domain: "sagesure.com" },
  { name: "Prudential", domain: "prudential.com" },
  { name: "AmTrust", domain: "amtrustfinancial.com" },
  { name: "Protective", domain: "protective.com" },
  { name: "Markel", domain: "markel.com" },
  { name: "Mutual of Omaha", domain: "mutualofomaha.com" },
] as const;

export const carrierAccessStat = 200;

export const agentMicrositeFeatures = [
  "Direct tap-to-call and email access",
  "QR code ready for print leave-behinds and text follow-up",
  "Lead form routed through the agency, not a generic directory",
  "SEO-ready branded page structure for each producer",
] as const;

export const agents: Agent[] = [
  {
    slug: "erin",
    name: "Erin Allsberry",
    firstName: "Erin",
    title: "Agency Owner & Principal Agent",
    phone: agency.phone,
    phoneHref: agency.phoneHref,
    email: "erin@allsberryagency.com",
    bio: "With over 24 years of experience, Erin founded Allsberry Insurance Agency to provide personalized insurance solutions to families and businesses across Southern California. She believes in making insurance straightforward and stress-free, so you can focus on what matters most.",
    initials: "EA",
    accent: "blue",
    specialties: ["Home Insurance", "Auto Insurance", "Agency Leadership"],
    license: agency.ownerLicense,
    photo: officialProfile.headshot,
  },
  {
    slug: "brahm",
    name: "Brahm Shank",
    firstName: "Brahm",
    title: "Licensed Insurance Agent",
    phone: "(951) 266-2019",
    phoneHref: "tel:+19512662019",
    email: "brahm@allsberryagency.com",
    bio: "Brahm specializes in helping clients find the right coverage at the right price, with a focus on building lasting relationships. His dedication to client service ensures every policy is tailored to your unique situation.",
    initials: "BS",
    accent: "navy",
    specialties: [
      "Commercial Insurance",
      "Restaurant Coverage",
      "Client Strategy",
      "Financial Planning",
    ],
    photo: {
      src: "/media/agents/brahm-shank.png",
      alt: "Brahm Shank, Licensed Insurance Agent at Allsberry Insurance Agency",
    },
  },
  {
    slug: "dakota",
    name: "Dakota",
    firstName: "Dakota",
    title: "Licensed Insurance Agent",
    phone: agency.phone,
    phoneHref: agency.phoneHref,
    email: "dakota@allsberryagency.com",
    bio: "Dakota brings energy and dedication to every client interaction, ensuring a smooth and personalized insurance experience. Whether you need home, auto, or business coverage, Dakota is here to help.",
    initials: "D",
    accent: "red",
    specialties: ["Home Insurance", "Auto Insurance", "Fast Follow-Up"],
    photo: {
      src: "/media/agents/dakota-allsberry.png",
      alt: "Dakota Allsberry, Licensed Insurance Agent at Allsberry Insurance Agency",
    },
  },
];

export const homePageFaqs: HomePageFaq[] = [
  {
    question: "What types of insurance can Allsberry Insurance Agency help me quote?",
    answer:
      "We help Southern California clients compare home, auto, renters, condo, umbrella, life, business, workers compensation, commercial property, professional liability, and specialty coverage options.",
  },
  {
    question: "How fast will someone follow up after I request a quote?",
    answer:
      "A licensed team member follows up within one business day, often sooner when the request is straightforward and we already have the basics we need.",
  },
  {
    question: "Can you help with evidence of insurance or certificates of insurance?",
    answer:
      "Yes. We can help with proof of insurance, mortgagee updates, COI requests, and escrow or closing-related documentation so the right party gets the right evidence quickly.",
  },
  {
    question: "Do I need to bundle home and auto insurance to work with the agency?",
    answer:
      "No. Bundling is often worth reviewing, but the agency can quote a single policy or build a custom mix if that is the better fit for your budget and coverage goals.",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "save-on-homeowners-insurance-california",
    title: "How to Save on Homeowners Insurance in California",
    excerpt:
      "Smart ways to lower your premium without giving up the protection your home needs.",
    publishedAt: "2026-02-10",
    readingTime: "4 min read",
    tags: ["Home Insurance", "California", "Savings Tips"],
    intro:
      "California homeowners are balancing rising costs, wildfire questions, and coverage changes. The good news: there are still practical ways to improve value without sacrificing protection.",
    sections: [
      {
        heading: "Bundle wherever it makes sense",
        body: "Pairing home and auto often opens the door to meaningful discounts. Bundling also makes your coverage easier to manage because one agency can review gaps across multiple policies.",
        bullets: [
          "Ask for a side-by-side quote with and without bundling.",
          "Compare deductibles and liability limits together, not just price.",
          "Review whether umbrella coverage makes sense once policies are bundled.",
        ],
      },
      {
        heading: "Revisit replacement cost and endorsements",
        body: "The cheapest policy is not a win if rebuilding costs outpace your coverage. A strong review should balance affordability with realistic rebuild numbers and the endorsements your property actually needs.",
      },
      {
        heading: "Look for credits you may be missing",
        body: "Alarm systems, newer roofs, gated communities, and recent renovations can all affect your premium. A quick policy review can uncover credits that were never applied when your current policy was written.",
      },
    ],
  },
  {
    slug: "understanding-commercial-insurance-small-businesses",
    title: "Understanding Commercial Insurance for Small Businesses",
    excerpt:
      "A practical primer on the core coverages most small businesses should review before they open their doors.",
    publishedAt: "2026-01-22",
    readingTime: "5 min read",
    tags: ["Business Insurance", "Commercial Insurance"],
    intro:
      "Commercial insurance is not one product. It is a set of coverages that work together to protect your operations, team, property, and reputation.",
    sections: [
      {
        heading: "Start with your risk profile",
        body: "Your industry, contract requirements, payroll size, building setup, and customer traffic all influence the right mix of coverage. A restaurant, contractor, and consultant may all need business insurance, but not the same package.",
      },
      {
        heading: "The coverages business owners ask about most",
        body: "General liability, workers compensation, commercial property, and commercial auto show up in a lot of conversations because they protect the parts of your business that get exposed first.",
        bullets: [
          "General liability for bodily injury, property damage, and advertising claims.",
          "Workers compensation for employee injuries and wage replacement obligations.",
          "Commercial property for buildings, inventory, furniture, and equipment.",
          "Commercial auto for owned, leased, or hired vehicles used for business.",
        ],
      },
      {
        heading: "Review coverage before growth outpaces it",
        body: "Hiring staff, moving locations, adding equipment, or landing bigger contracts can change your insurance needs quickly. An annual review is a minimum; fast-growing businesses should check in more often.",
      },
    ],
  },
  {
    slug: "why-bundle-your-policies",
    title: "Why Bundle Your Policies?",
    excerpt:
      "Bundling is about more than discounts. It can simplify your protection and make claims easier to navigate.",
    publishedAt: "2025-12-18",
    readingTime: "3 min read",
    tags: ["Auto Insurance", "Home Insurance", "Bundle"],
    intro:
      "When your policies work together, your coverage story usually gets stronger. That matters when life gets messy and you need your insurance to respond cleanly.",
    sections: [
      {
        heading: "One agency, clearer coverage",
        body: "Bundling makes it easier to spot overlaps and gaps. If multiple policies are in play, one coordinated review can save time and reduce confusion.",
      },
      {
        heading: "Discounts are real, but not the only benefit",
        body: "Lower premiums are great, but the bigger win is usually simplification: fewer billing headaches, easier policy reviews, and less scrambling during claims.",
      },
      {
        heading: "Bundle strategically",
        body: "The right bundle should improve both value and protection. That means checking limits, deductibles, liability, and service expectations instead of chasing the lowest number on the page.",
      },
    ],
  },
];

export const quickLinks = [
  { label: "Get a Quote", href: "/quote" },
  { label: "Proof of Insurance", href: "/evidence-of-insurance" },
  { label: "Meet Our Team", href: "/#team" },
  { label: "Commercial Coverage", href: "/#commercial-insurance" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerProducts = [
  { label: "Home Insurance", href: "/quote?product=home" },
  { label: "Auto Insurance", href: "/quote?product=auto" },
  { label: "Business Insurance", href: "/quote?product=business" },
  { label: "Workers Comp", href: "/quote?product=workers-comp" },
  { label: "Life Insurance", href: "/quote?product=life" },
] as const;

export function getAgentBySlug(slug: string) {
  return agents.find((agent) => agent.slug === slug);
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
