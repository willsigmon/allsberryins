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

export type AgentSlug =
  | "erin"
  | "brahm"
  | "dakota"
  | "alex"
  | "vanessa"
  | "julie"
  | "heidi"
  | "jenn"
  | "jason"
  | "anna";

export type AgentAccent =
  | "blue"
  | "navy"
  | "red"
  | "purple"
  | "emerald"
  | "rose"
  | "slate"
  | "indigo"
  | "teal"
  | "amber";

export type Agent = {
  slug: AgentSlug;
  name: string;
  firstName: string;
  title: string;
  phone: string;
  phoneHref?: string;
  email: string;
  bio: string;
  accent: AgentAccent;
  initials: string;
  specialties: string[];
  languages?: string[];
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

export type CarrierPartner = {
  name: string;
  domain: string;
  logoSrc: string;
};

export const agency = {
  name: "Allsberry Insurance Agency",
  fullName: "Allsberry Insurance Agency Inc",
  phone: "(951) 739-5959",
  phoneHref: "tel:+19517395959",
  email: "office@allsberryagency.com",
  emailHref: "mailto:office@allsberryagency.com",
  serviceArea: "Southern California",
  addressLine1: "355 N Sheridan St, Ste 100",
  cityStateZip: "Corona, CA 92878",
  fullAddress: "355 N Sheridan St, Ste 100, Corona, CA 92878",
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
    { label: "Service area", value: "Southern California" },
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
    {
      title: "Agent of the Year — 6 Years Running",
      image: {
        src: "/media/farmers/topper-club-award.webp",
        alt: "Agent of the Year recognition",
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
    description: "Insurance built around what you own and what you're planning for — your home, your car, your business, and your future.",
    icon: "slidersHorizontal",
  },
  {
    title: "Expert Advice",
    description: "Straight answers from a team that helps you compare options with confidence.",
    icon: "users",
  },
  {
    title: "Top-Rated Support",
    description: "We're here when you need us — before, during, and after you file a claim. You won't be left figuring things out alone.",
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
    description: "Low-cost protection for your belongings, plus help paying for a place to stay if your rental becomes unlivable.",
    icon: "key",
    category: "personal",
  },
  {
    slug: "life",
    name: "Life Insurance",
    shortName: "Life",
    description: "Create a safety net for the people who matter most to you. Our streamlined process keeps your personal information private and secure.",
    icon: "heartPulse",
    category: "personal",
  },
  {
    slug: "umbrella",
    name: "Umbrella Insurance",
    shortName: "Umbrella",
    description: "Extra protection that helps pay for big costs your other insurance doesn't fully cover.",
    icon: "umbrella",
    category: "personal",
  },
  {
    slug: "condo",
    name: "Condo Insurance",
    shortName: "Condo",
    description: "Made for condo owners who need protection for things inside their unit that the building's shared insurance doesn't cover.",
    icon: "building2",
    category: "personal",
  },
  {
    slug: "general-liability",
    name: "General Liability",
    shortName: "General Liability",
    description: "Covers your business if a customer gets hurt, property gets damaged, or you're sued over your advertising.",
    icon: "shield",
    category: "commercial",
  },
  {
    slug: "workers-comp",
    name: "Workers Compensation",
    shortName: "Workers Comp",
    description: "Helps pay for medical bills and lost wages if an employee gets hurt on the job. Required by California law for most businesses.",
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
    description: "Covers the cars and trucks your business uses, including your drivers and the things you carry.",
    icon: "truck",
    category: "commercial",
  },
  {
    slug: "professional-liability",
    name: "Professional Liability",
    shortName: "Professional Liability",
    description: "Protects you if a client says your work or advice caused them a loss — even if it was an honest mistake.",
    icon: "briefcase",
    category: "commercial",
  },
  {
    slug: "specialty-coverage",
    name: "Specialty Coverage",
    shortName: "Specialty Coverage",
    description: "Coverage for unusual situations that don't fit a standard plan — like special equipment, niche businesses, or one-of-a-kind properties.",
    icon: "sparkles",
    category: "commercial",
  },
  {
    slug: "business",
    name: "Business Insurance",
    shortName: "Business",
    description: "A plan built for your business that puts several types of coverage together in one package.",
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
  "Proof of Insurance",
  "Business Proof of Insurance (COI)",
  "Update for My Bank or Lender",
  "Paperwork for Buying or Selling a Home",
  "Other",
] as const;

export const reviews = [
  {
    name: "Southern California homeowner",
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

export const carrierPartners: CarrierPartner[] = [
  { name: "Farmers", domain: "farmers.com", logoSrc: "/media/carriers/farmers.png" },
  { name: "Travelers", domain: "travelers.com", logoSrc: "/media/carriers/travelers.png" },
  {
    name: "The Hartford",
    domain: "thehartford.com",
    logoSrc: "/media/carriers/the-hartford.png",
  },
  {
    name: "Progressive",
    domain: "progressive.com",
    logoSrc: "/media/carriers/progressive.png",
  },
  {
    name: "Liberty Mutual",
    domain: "libertymutual.com",
    logoSrc: "/media/carriers/liberty-mutual.png",
  },
  { name: "Chubb", domain: "chubb.com", logoSrc: "/media/carriers/chubb.png" },
  { name: "MetLife", domain: "metlife.com", logoSrc: "/media/carriers/metlife.png" },
  { name: "Zurich", domain: "zurichna.com", logoSrc: "/media/carriers/zurich.png" },
  {
    name: "Nationwide",
    domain: "nationwide.com",
    logoSrc: "/media/carriers/nationwide.png",
  },
  { name: "Safeco", domain: "safeco.com", logoSrc: "/media/carriers/safeco.png" },
  {
    name: "Foremost",
    domain: "foremostinsurance.com",
    logoSrc: "/media/carriers/foremost.png",
  },
  {
    name: "Bristol West",
    domain: "bristolwest.com",
    logoSrc: "/media/carriers/bristol-west.png",
  },
  {
    name: "National General",
    domain: "nationalgeneral.com",
    logoSrc: "/media/carriers/national-general.png",
  },
  { name: "Hagerty", domain: "hagerty.com", logoSrc: "/media/carriers/hagerty.png" },
  { name: "SageSure", domain: "sagesure.com", logoSrc: "/media/carriers/sagesure.png" },
  {
    name: "Prudential",
    domain: "prudential.com",
    logoSrc: "/media/carriers/prudential.png",
  },
  {
    name: "AmTrust",
    domain: "amtrustfinancial.com",
    logoSrc: "/media/carriers/amtrust.png",
  },
  {
    name: "Protective",
    domain: "protective.com",
    logoSrc: "/media/carriers/protective.png",
  },
  { name: "Markel", domain: "markel.com", logoSrc: "/media/carriers/markel.png" },
  {
    name: "Mutual of Omaha",
    domain: "mutualofomaha.com",
    logoSrc: "/media/carriers/mutual-of-omaha.png",
  },
];

export const carrierAccessStat = 200;

export const agentMicrositeFeatures = [
  "Direct tap-to-call and email access",
  "QR code ready for print materials and text follow-up",
  "Your message goes straight to our office, not some random listing site",
  "A personal page for each agent that's easy to find on Google",
] as const;

export const agents: Agent[] = [
  {
    slug: "erin",
    name: "Erin Allsberry",
    firstName: "Erin",
    title: "Agency Owner & Principal Agent",
    phone: agency.phone,
    phoneHref: agency.phoneHref,
    email: "office@allsberryagency.com",
    bio: "With over 24 years of experience, Erin founded Allsberry Insurance Agency to help families and businesses across Southern California find the right insurance. She believes coverage should be easy to understand and simple to manage, so you can spend your time on what matters most.",
    initials: "EA",
    accent: "blue",
    specialties: ["HSC Leadership"],
    license: "CA #0E91043",
    photo: {
      src: "/media/agents/erin-allsberry-new.png",
      alt: "Erin Allsberry, Agency Owner at Allsberry Insurance Agency",
    },
  },
  {
    slug: "alex",
    name: "Alex",
    firstName: "Alex",
    title: "Office Manager | Home, Auto & Umbrella Agent",
    phone: agency.phone,
    phoneHref: agency.phoneHref,
    email: "alex@allsberryagency.com",
    bio: "Alex keeps everything at Allsberry Insurance Agency running smoothly. As office manager, she's known for her ability to handle just about anything — and often all at once. Highly detail-oriented and incredibly responsive, Alex makes sure every client is taken care of quickly and thoroughly. Clients can count on her for follow-up, organization, and making sure nothing ever falls through the cracks.",
    initials: "A",
    accent: "purple",
    specialties: ["Home Insurance", "Auto Insurance", "Umbrella Insurance"],
    languages: ["English", "Spanish"],
    license: "CA #0I53723",
    photo: {
      src: "/media/agents/alex.png",
      alt: "Alex, Office Manager at Allsberry Insurance Agency",
    },
  },
  {
    slug: "vanessa",
    name: "Vanessa",
    firstName: "Vanessa",
    title: "Home, Auto, Umbrella & Life Insurance Agent",
    phone: agency.phone,
    phoneHref: agency.phoneHref,
    email: "vanessa@allsberryagency.com",
    bio: "Vanessa has been part of the Allsberry story from the very beginning — one of the original team members long before the agency grew into what it is today. With 15 years of experience, she knows home, auto, and life insurance inside and out. She likes checking in with clients each year to make sure their insurance still fits what's going on in their lives.",
    initials: "V",
    accent: "indigo",
    specialties: ["Home Insurance", "Auto Insurance", "Life Insurance", "Umbrella Insurance"],
    languages: ["English", "Spanish"],
    license: "CA #0G84845",
    photo: {
      src: "/media/agents/vanessa.png",
      alt: "Vanessa, Licensed Insurance Agent at Allsberry Insurance Agency",
    },
  },
  {
    slug: "brahm",
    name: "Brahm Shank",
    firstName: "Brahm",
    title: "Licensed Insurance Agent",
    phone: "(951) 266-2019",
    phoneHref: "tel:+19512662019",
    email: "brahm@allsberryagency.com",
    bio: "Brahm helps people understand their insurance without the confusing language. He listens to what you need, explains your choices in plain English, and makes sure you feel good about your decision. He's quick to respond and always follows through.",
    initials: "BS",
    accent: "navy",
    specialties: [
      "Personal Insurance",
      "Commercial Insurance",
      "Client Strategy",
      "Coverage Guidance",
      "Financial Planning",
    ],
    license: "CA #4434320",
    photo: {
      src: "/media/agents/brahm-shank-new.png",
      alt: "Brahm Shank, Licensed Insurance Agent at Allsberry Insurance Agency",
    },
  },
  {
    slug: "julie",
    name: "Julie",
    firstName: "Julie",
    title: "Home, Auto & Umbrella Agent",
    phone: agency.phone,
    phoneHref: agency.phoneHref,
    email: "julie@allsberryagency.com",
    bio: "Julie has years of experience with Farmers and knows the business inside and out. She works remotely and makes sure everything with your insurance is done right and on time. Clients and teammates both count on her to be helpful and reliable.",
    initials: "J",
    accent: "rose",
    specialties: ["Home Insurance", "Auto Insurance", "Umbrella Insurance"],
    languages: ["English", "Spanish"],
    license: "CA #0M05856",
    photo: {
      src: "/media/agents/julie.png",
      alt: "Julie, Licensed Insurance Agent at Allsberry Insurance Agency",
    },
  },
  {
    slug: "dakota",
    name: "Dakota Allsberry",
    firstName: "Dakota",
    title: "Licensed Insurance Agent",
    phone: agency.phone,
    phoneHref: agency.phoneHref,
    email: "dakota@allsberryagency.com",
    bio: "Dakota brings energy and dedication to every client interaction, ensuring a smooth and personalized insurance experience. Whether you need home, auto, or business coverage, Dakota is here to help.",
    initials: "DA",
    accent: "red",
    specialties: ["Home Insurance", "Auto Insurance", "Business Insurance"],
    license: "CA #4322549",
    photo: {
      src: "/media/agents/dakota-allsberry-new.png",
      alt: "Dakota Allsberry, Licensed Insurance Agent at Allsberry Insurance Agency",
    },
  },
  {
    slug: "jason",
    name: "Jason Allsberry",
    firstName: "Jason",
    title: "Agency Operations & Accounting",
    phone: agency.phone,
    phoneHref: agency.phoneHref,
    email: "jason@allsberryagency.com",
    bio: "Jason keeps the business side of Allsberry Insurance Agency running smoothly, managing day-to-day operations and accounting so the team can focus on serving clients across Southern California.",
    initials: "JA",
    accent: "teal",
    specialties: ["Agency Operations", "Accounting"],
    photo: {
      src: "/media/agents/jason-allsberry.png",
      alt: "Jason Allsberry, Agency Operations & Accounting at Allsberry Insurance Agency",
    },
  },
  {
    slug: "anna",
    name: "Anna",
    firstName: "Anna",
    title: "Licensed Insurance Agent",
    phone: agency.phone,
    phoneHref: agency.phoneHref,
    email: "anna@allsberryagency.com",
    bio: "Anna is a licensed member of the Allsberry Insurance Agency team, dedicated to providing personalized service to clients across Southern California. Full bio coming soon.",
    initials: "A",
    accent: "amber",
    specialties: ["Home Insurance", "Auto Insurance"],
    photo: {
      src: "/media/agents/anna.png",
      alt: "Anna, Licensed Insurance Agent at Allsberry Insurance Agency",
    },
  },
  {
    slug: "heidi",
    name: "Heidi",
    firstName: "Heidi",
    title: "Business Insurance Sales Agent",
    phone: agency.phone,
    phoneHref: agency.phoneHref,
    email: "heidi@allsberryagency.com",
    bio: "Heidi focuses on insurance for businesses — covering things like employee injuries, lawsuits, and building protection. She's energetic, stays on top of follow-ups, and makes sure every client gets the attention they need.",
    initials: "H",
    accent: "slate",
    specialties: [
      "Business Insurance",
      "Workers Comp",
      "Liability Insurance",
      "Commercial Property",
    ],
    license: "CA #0E90668",
    photo: {
      src: "/media/agents/heidi.png",
      alt: "Heidi, Business Insurance Sales Agent at Allsberry Insurance Agency",
    },
  },
  {
    slug: "jenn",
    name: "Jenn",
    firstName: "Jenn",
    title: "Business Insurance Account Manager",
    phone: agency.phone,
    phoneHref: agency.phoneHref,
    email: "jenn@allsberryagency.com",
    bio: "Jenn runs the business insurance side of the agency. She keeps track of when your coverage needs to be renewed, makes sure paperwork is right, and stays in touch so nothing gets missed. Business owners count on her to keep things organized and on schedule.",
    initials: "J",
    accent: "emerald",
    specialties: [
      "Commercial Insurance",
      "Renewals & Compliance",
      "Business Accounts",
    ],
    license: "CA #0K33979",
    photo: {
      src: "/media/agents/jenn.png",
      alt: "Jenn, Business Insurance Account Manager at Allsberry Insurance Agency",
    },
  },
];

export const homePageFaqs: HomePageFaq[] = [
  {
    question: "What types of insurance can Allsberry Insurance Agency help me quote?",
    answer:
      "We help people in Southern California compare insurance for their home, car, rental, condo, business, employees, life, and more.",
  },
  {
    question: "How fast will someone follow up after I request a quote?",
    answer:
      "A licensed team member follows up within one business day, often sooner when the request is straightforward and we already have the basics we need.",
  },
  {
    question: "Can you help with evidence of insurance or certificates of insurance?",
    answer:
      "Yes. If your bank, landlord, or another company needs proof that you have insurance, we can send them the right paperwork quickly.",
  },
  {
    question: "Do I need to bundle home and auto insurance to work with the agency?",
    answer:
      "No. Combining your insurance can sometimes save money, but we're happy to help with just one type of insurance if that's all you need.",
  },
  {
    question: "Is my data private and secure?",
    answer:
      "Yes. All communications — including phone lines, texts, and email — are encrypted. We follow strict data privacy standards and never share your personal information without your consent. You can review our full privacy practices through the Farmers privacy center.",
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
          "Ask for a side-by-side quote with and without combining your policies.",
          "Compare how much you'd pay out of pocket and how much the insurance covers, not just the monthly price.",
          "Check if extra protection makes sense once your policies are combined.",
        ],
      },
      {
        heading: "Make sure your coverage would actually pay to rebuild",
        body: "The cheapest plan isn't a good deal if it wouldn't actually pay to rebuild your home. When you review your insurance, make sure the amount it would pay matches what it would really cost to rebuild. Also check if you need any add-ons, like earthquake or water backup coverage.",
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
        body: "What kind of business you run, how many people you employ, what your building looks like, and how many customers walk in all affect what insurance you need. A restaurant, contractor, and consultant may all need business insurance, but not the same package.",
      },
      {
        heading: "The coverages business owners ask about most",
        body: "General liability, workers compensation, commercial property, and commercial auto show up in a lot of conversations because they protect the parts of your business that get exposed first.",
        bullets: [
          "General liability — covers you if someone gets hurt, something gets broken, or you get sued over your advertising.",
          "Workers comp — helps pay medical bills and lost pay when an employee gets hurt at work.",
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
        body: "The right bundle should improve both value and protection. That means looking at how much your plan covers, how much you'd pay out of pocket, and what kind of help you'd get — not just picking the cheapest price.",
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

export type Fellow = {
  name: string;
  firstName: string;
  recognition: string;
  career: string;
  initials: string;
  photo?: {
    src: string;
    alt: string;
  };
};

export const fellowDefinition =
  "An Allsberry Insurance Fellow is a special honor for team members who made a real difference for our clients, our agency, and our community. It's given to people who went above and beyond — who truly knew the business, cared about every client, and always did the right thing. Fellows stand for what Allsberry Insurance is all about — being honest, being clear, and always looking out for our clients. Though retired from day-to-day work, an Allsberry Fellow remains a respected voice within our organization.";

export const fellows: Fellow[] = [
  {
    name: "Linda",
    firstName: "Linda",
    recognition:
      "Recognized as an Allsberry Insurance Inc. Fellow for a career defined by trust, service, and lasting impact.",
    career:
      "26 years as Commercial Account Executive. The original Allsberry team member and a true cornerstone of the agency's legacy. Known as the 'Office Mom,' Linda brought kindness, wisdom, and a steady presence to every interaction.",
    initials: "L",
  },
];

export function getAgentBySlug(slug: string) {
  return agents.find((agent) => agent.slug === slug);
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
