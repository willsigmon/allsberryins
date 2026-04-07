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

export type BlogPostCategory = "tips" | "news" | "guides";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTime: string;
  tags: string[];
  category?: BlogPostCategory;
  author?: string;
  relatedSeoPageSlugs?: string[];
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
  calendlyUrl: "https://calendly.com/brahm-allsberryagency/30min",
  socials: {
    facebook: "https://facebook.com/AllsberryInsuranceagency",
    instagram: "https://instagram.com/allsberry_insurance",
    linkedin: "https://linkedin.com/in/erin-allsberry-2845a819",
    google: "https://www.google.com/maps/place/Allsberry+Insurance+Agency/@33.88454,-117.56837,17z/",
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
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const valueProps = [
  {
    title: "Seamless Experience",
    description: "We walk you through every step, follow up fast, and make getting covered simple.",
    icon: "shieldCheck",
  },
  {
    title: "Personalized Coverage",
    description: "We build a plan around your life — your home, your car, your business, and your future.",
    icon: "slidersHorizontal",
  },
  {
    title: "Expert Advice",
    description: "Our team gives you straight answers so you can pick the right plan.",
    icon: "users",
  },
  {
    title: "Top-Rated Support",
    description: "We're here before, during, and after you file a claim. You won't have to figure things out alone.",
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
    description: "Protection for your car, your daily drive, and the surprises on the road.",
    icon: "car",
    category: "personal",
  },
  {
    slug: "renters",
    name: "Renters Insurance",
    shortName: "Renters",
    description: "Affordable protection for your stuff. It also helps pay for a place to stay if your rental can't be lived in.",
    icon: "key",
    category: "personal",
  },
  {
    slug: "life",
    name: "Life Insurance",
    shortName: "Life",
    description: "Helps take care of the people you love if something happens to you. Getting started is quick, safe, and private.",
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
    description: "Covers what's inside your condo. Your building's insurance protects the outside, but you need your own plan for your stuff and walls.",
    icon: "building2",
    category: "personal",
  },
  {
    slug: "general-liability",
    name: "General Liability",
    shortName: "General Liability",
    description: "Pays for costs if a customer gets hurt at your business, something gets broken, or someone sues you.",
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
    description: "Protects your building, equipment, and the things you need to run your business every day.",
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
    description: "Helps pay the costs if a client says your work or advice caused them to lose money, even if it was an honest mistake.",
    icon: "briefcase",
    category: "commercial",
  },
  {
    slug: "specialty-coverage",
    name: "Specialty Coverage",
    shortName: "Specialty Coverage",
    description: "For things that don't fit a normal plan, like special equipment, unique businesses, or unusual properties.",
    icon: "sparkles",
    category: "commercial",
  },
  {
    slug: "business",
    name: "Business Insurance",
    shortName: "Business",
    description: "One package that puts together the different types of insurance your business needs.",
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
    name: "Classic car collector",
    body: "I am happy and confident having all my personal, family, and business insurance needs taken care of with the team here. Anytime I call with a question or a need they are happy to help and treat me like I am a top priority. Recently Erin was able to also help me in a big way — I have a few classic cars and to my surprise she was able to get my cars insured through Hagerty with great coverage.",
    source: "Yelp",
  },
  {
    name: "Corona homeowner",
    body: "The whole team made switching our home insurance simple. They walked us through every step and found a plan that actually fit our family. No pressure, just honest advice.",
    source: "Google",
  },
  {
    name: "Local restaurant owner",
    body: "Brahm handled our business coverage from day one. He was organized, answered every question, and helped us figure out what we actually needed versus what we could skip. Highly recommend.",
    source: "Google",
  },
  {
    name: "Auto insurance client",
    body: "First time I ever felt like someone actually looked at my auto policy instead of just renewing it. The advice was practical and I ended up with better coverage for less.",
    source: "Yelp",
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
  "Your message goes straight to our office, not some other website",
  "Each agent has their own page that's easy to find on Google",
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
    bio: "With over 24 years of experience, Erin founded Allsberry Insurance Agency to provide personalized insurance solutions to families and businesses across Southern California. She believes in making insurance straightforward and stress-free, so you can focus on what matters most.",
    initials: "EA",
    accent: "blue",
    specialties: ["Agency Owner"],
    license: "CA #0E91043",
    photo: {
      src: "/media/agents/erin-allsberry-new.png",
      alt: "Erin Allsberry, Agency Owner at Allsberry Insurance Agency",
    },
  },
  {
    slug: "alex",
    name: "Alex Coria",
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
      alt: "Alex Coria, Office Manager at Allsberry Insurance Agency",
    },
  },
  {
    slug: "vanessa",
    name: "Vanessa Rios",
    firstName: "Vanessa",
    title: "Home, Auto, Umbrella & Life Insurance Agent",
    phone: agency.phone,
    phoneHref: agency.phoneHref,
    email: "vanessa@allsberryagency.com",
    bio: "Vanessa has been part of the Allsberry story from the very beginning — one of the original team members long before the agency evolved into what it is today. With 15 years of experience, she's a trusted expert in home, auto, and life insurance. She genuinely enjoys connecting with clients through annual policy reviews, making sure coverage keeps up with life's changes.",
    initials: "V",
    accent: "indigo",
    specialties: ["Home Insurance", "Auto Insurance", "Life Insurance", "Umbrella Insurance"],
    languages: ["English", "Spanish"],
    license: "CA #0G84845",
    photo: {
      src: "/media/agents/vanessa.png",
      alt: "Vanessa Rios, Licensed Insurance Agent at Allsberry Insurance Agency",
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
    bio: "Brahm is a trusted advisor who brings a combination of technical fluency and a genuine client-first approach to insurance. Known for translating complex coverage into clear, actionable guidance, he helps clients make confident, informed decisions from the very first conversation. His approach is defined by precision — built on clarity, responsiveness, and trust.",
    initials: "BS",
    accent: "navy",
    specialties: [
      "Home Insurance",
      "Auto Insurance",
      "Life Insurance",
      "Commercial Insurance",
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
    name: "Julie Ortiz",
    firstName: "Julie",
    title: "Home, Auto & Umbrella Agent",
    phone: agency.phone,
    phoneHref: agency.phoneHref,
    email: "julie@allsberryagency.com",
    bio: "Julie brings a wealth of Farmers experience and industry knowledge to the team. Working remotely, she plays an important role in supporting clients and ensuring policies are handled accurately and efficiently. Her reliability, experience, and helpful approach make her a valuable resource for both clients and the team.",
    initials: "J",
    accent: "rose",
    specialties: ["Home Insurance", "Auto Insurance", "Umbrella Insurance"],
    languages: ["English", "Spanish"],
    license: "CA #0M05856",
    photo: {
      src: "/media/agents/julie.png",
      alt: "Julie Ortiz, Licensed Insurance Agent at Allsberry Insurance Agency",
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
    bio: "Jason handles the day-to-day business side of the agency, including operations and accounting. That lets the rest of the team focus on helping clients.",
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
    name: "Anna Gonzalez",
    firstName: "Anna",
    title: "Service Operations & Account Processing",
    phone: agency.phone,
    phoneHref: agency.phoneHref,
    email: "office@allsberryagency.com",
    bio: "Anna keeps the service side of the agency running. She processes accounts, handles policy paperwork, and provides day-to-day customer service so clients always have someone to call. Organized and dependable, she makes sure every request is handled quickly and correctly.",
    initials: "AG",
    accent: "amber",
    specialties: ["Account Processing", "Customer Service"],
    photo: {
      src: "/media/agents/anna.png",
      alt: "Anna Gonzalez, Service Operations at Allsberry Insurance Agency",
    },
  },
  {
    slug: "heidi",
    name: "Heidi Melzer",
    firstName: "Heidi",
    title: "Business Insurance Sales Agent",
    phone: agency.phone,
    phoneHref: agency.phoneHref,
    email: "heidi@allsberryagency.com",
    bio: "Specializing in business and commercial insurance, workers compensation, liability, and commercial building coverage, Heidi is a dedicated sales professional who brings energy and consistency to every client interaction. With years of insurance sales experience, she's always ready to take a call, follow up on a quote, and help clients find the right coverage.",
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
      alt: "Heidi Melzer, Business Insurance Sales Agent at Allsberry Insurance Agency",
    },
  },
  {
    slug: "jenn",
    name: "Jennifer Van Buskirk",
    firstName: "Jenn",
    title: "Business Insurance Account Manager",
    phone: agency.phone,
    phoneHref: agency.phoneHref,
    email: "jenn@allsberryagency.com",
    bio: "Jenn leads the commercial department with a strong focus on organization, compliance, and client communication. She ensures renewals are handled on time, reports are accurate, and opportunities to connect with business owners are never missed. Her attention to detail and proactive approach make her an essential partner for commercial clients navigating their insurance needs.",
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
      alt: "Jennifer Van Buskirk, Business Insurance Account Manager at Allsberry Insurance Agency",
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
      "A licensed team member will get back to you within one business day. If your request is simple and we have the info we need, it's often even faster.",
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
      "Yes. Your phone calls, texts, and emails with us are all protected. We never share your personal information without your permission. You can read more about how we protect your data through the Farmers privacy center.",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "five-questions-before-renewing-home-insurance",
    title: "5 Questions to Ask Before Renewing Your Home Insurance",
    excerpt:
      "Your renewal is a chance to make sure your coverage still fits. Here are five simple questions that can save you money and stress.",
    publishedAt: "2026-03-15",
    readingTime: "3 min read",
    tags: ["Home Insurance", "Renewal Tips"],
    category: "tips",
    author: "Erin Allsberry",
    relatedSeoPageSlugs: ["california-home-insurance", "wildfire-home-insurance-california"],
    intro:
      "Your renewal is a chance to make sure your coverage still fits. Here are five simple questions that can save you money and stress.",
    sections: [
      {
        heading: "Has anything changed about your home?",
        body: "If you added a room, got a new roof, or put in a pool, that can change what you need and what you pay. Make sure your plan matches your home today, not when you first signed up.",
      },
      {
        heading: "Are you paying for coverage you do not need?",
        body: "Over time, some parts of your plan may not matter anymore. Look through each part and ask your agent if it all still makes sense for you.",
      },
      {
        heading: "Is your deductible still right?",
        body: "A higher deductible means you pay more out of pocket before insurance kicks in, but your monthly cost goes down. Pick an amount you could handle in an emergency.",
      },
    ],
  },
  {
    slug: "what-is-an-umbrella-policy",
    title: "What Is an Umbrella Policy and Do You Need One?",
    excerpt:
      "An umbrella policy adds extra protection on top of your home and auto coverage. Here is how it works and who it helps the most.",
    publishedAt: "2026-03-08",
    readingTime: "4 min read",
    tags: ["Umbrella Insurance", "Coverage Guide"],
    category: "guides",
    author: "Brahm Shank",
    relatedSeoPageSlugs: ["california-home-insurance", "insurance-agency-corona-ca"],
    intro:
      "An umbrella policy adds extra protection on top of your home and auto coverage. Here is how it works and who it helps the most.",
    sections: [
      {
        heading: "How umbrella insurance works",
        body: "An umbrella plan starts paying after your home or auto insurance runs out. It gives you extra protection, often adding a million dollars or more.",
      },
      {
        heading: "Who benefits most from umbrella coverage?",
        body: "If you have a pool, rent out property, have a teen driver, or own a lot of valuable things, an umbrella plan is a smart idea.",
        bullets: [
          "Homeowners who own more than their current insurance would pay out.",
          "Families with teen drivers or lots of guests at the house.",
          "Business owners who want extra personal protection on top of their business insurance.",
        ],
      },
    ],
  },
  {
    slug: "new-team-members-spring-2026",
    title: "Welcome to the Team: Spring 2026 Updates",
    excerpt:
      "Our agency is growing. Meet the newest members of the Allsberry Insurance family and learn about the coverage areas they specialize in.",
    publishedAt: "2026-03-01",
    readingTime: "2 min read",
    tags: ["Agency News", "Team"],
    category: "news",
    author: "Erin Allsberry",
    intro:
      "Our agency is growing. Meet the newest members of the Allsberry Insurance family and learn about the coverage areas they specialize in.",
    sections: [
      {
        heading: "A growing team means better service",
        body: "As we've grown across Southern California, we've added new team members so every client gets personal attention. Each new agent is experienced and truly wants to help people understand their insurance.",
      },
    ],
  },
  {
    slug: "save-on-homeowners-insurance-california",
    title: "How to Save on Homeowners Insurance in California",
    excerpt:
      "Smart ways to lower your premium without giving up the protection your home needs.",
    publishedAt: "2026-02-10",
    readingTime: "4 min read",
    tags: ["Home Insurance", "California", "Savings Tips"],
    category: "tips",
    author: "Erin Allsberry",
    relatedSeoPageSlugs: ["california-home-insurance", "wildfire-home-insurance-california", "ca-fair-plan-guide"],
    intro:
      "California homeowners are dealing with higher costs, wildfire worries, and changing plans. The good news: there are still real ways to save money without losing the protection you need.",
    sections: [
      {
        heading: "Bundle wherever it makes sense",
        body: "Putting your home and auto together often gets you a real discount. It also makes things easier because one agency can check all your plans at once.",
        bullets: [
          "Ask to see prices with and without combining your plans.",
          "Compare what you'd pay out of pocket and what insurance pays, not just the monthly bill.",
          "Check if adding extra protection makes sense once your plans are together.",
        ],
      },
      {
        heading: "Make sure your coverage would actually pay to rebuild",
        body: "The cheapest plan isn't a good deal if it won't pay enough to rebuild your home. Make sure the amount matches what rebuilding would really cost. Also check if you need extras like earthquake or water backup coverage.",
      },
      {
        heading: "Look for credits you may be missing",
        body: "Alarm systems, newer roofs, gated neighborhoods, and recent home upgrades can all lower your price. A quick review can find discounts that were missed when your plan was first set up.",
      },
    ],
  },
  {
    slug: "understanding-commercial-insurance-small-businesses",
    title: "Understanding Commercial Insurance for Small Businesses",
    excerpt:
      "A simple guide to the main types of insurance most small businesses should look at before opening.",
    publishedAt: "2026-01-22",
    readingTime: "5 min read",
    tags: ["Business Insurance", "Commercial Insurance"],
    category: "guides",
    author: "Brahm Shank",
    relatedSeoPageSlugs: ["insurance-agency-corona-ca"],
    intro:
      "Business insurance isn't just one thing. It's a group of plans that work together to protect your business, your team, your property, and your name.",
    sections: [
      {
        heading: "Start with what your business does",
        body: "The type of work you do, how many people work for you, what your building looks like, and how many customers come in all matter. A restaurant, a contractor, and a consultant all need insurance, but not the same kind.",
      },
      {
        heading: "The coverages business owners ask about most",
        body: "These four types come up the most because they protect the parts of your business that are most likely to need help first.",
        bullets: [
          "General liability -- pays if someone gets hurt, something breaks, or you get sued.",
          "Workers comp -- helps pay doctor bills and lost pay when an employee gets hurt at work.",
          "Commercial property -- covers your building, supplies, furniture, and equipment.",
          "Commercial auto -- covers cars and trucks your business uses.",
        ],
      },
      {
        heading: "Check your plan as your business grows",
        body: "Hiring people, moving to a new place, buying equipment, or taking on bigger jobs can change what insurance you need. Check your plan at least once a year. If your business is growing fast, check in more often.",
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
    category: "tips",
    author: "Erin Allsberry",
    relatedSeoPageSlugs: ["california-home-insurance", "insurance-agency-corona-ca"],
    intro:
      "When your insurance plans work together, your protection gets stronger. That matters most when life throws you a curveball.",
    sections: [
      {
        heading: "One agency, clearer coverage",
        body: "When one agency handles all your plans, it's easier to find overlaps and gaps. One review covers everything and saves you time.",
      },
      {
        heading: "Discounts are real, but not the only benefit",
        body: "Paying less is great, but the bigger win is keeping things simple. One bill, one review, and less hassle when you need to use your insurance.",
      },
      {
        heading: "Bundle strategically",
        body: "The right bundle should save you money and give you better protection. Look at what your plan covers, what you'd pay out of pocket, and what help you'd get -- not just the cheapest price.",
      },
    ],
  },
];

export const quickLinks = [
  { label: "Get a Quote", href: "/quote" },
  { label: "Resources", href: "/resources" },
  { label: "Insurance Agency in Corona, CA", href: "/insurance-agency-corona-ca" },
  { label: "Blog", href: "/blog" },
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
    name: "Linda Sullivan",
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
