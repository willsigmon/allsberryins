import type { IconName, ProductSlug } from "@/lib/site-data";

type HeroJourneyAction = {
  href: "/quote" | "/evidence-of-insurance";
  label: string;
  entry: string;
  audience?: string;
  product?: ProductSlug;
};

export type HeroJourneyCard = {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  quote: HeroJourneyAction;
  proof: HeroJourneyAction;
};

export type HeroHelpContent = {
  headline: string;
  description: string;
  helperText: string;
  quickReasons: string[];
  cards: HeroJourneyCard[];
};

const heroHelpContent: Partial<Record<ProductSlug, HeroHelpContent>> = {
  home: {
    headline: "Show us where you are in the home process.",
    description:
      "Whether you are buying, bundling, refinancing, or getting lender paperwork together, this panel should feel like a clear fork in the road.",
    helperText:
      "Most home shoppers start with the homeowners path, then bundle auto once the savings math is on the table.",
    quickReasons: ["New purchase or refinance", "Bundle home + auto", "Escrow or lender proof"],
    cards: [
      {
        id: "home-homeowner",
        title: "Homeowner or buyer",
        description:
          "Start here for a new purchase, a policy review, or a cleaner homeowners setup before you bind.",
        icon: "house",
        quote: {
          href: "/quote",
          label: "Start homeowners quote",
          entry: "hero-home-homeowner-quote",
          audience: "Homeowner",
          product: "home",
        },
        proof: {
          href: "/evidence-of-insurance",
          label: "Request lender or escrow proof",
          entry: "hero-home-homeowner-proof",
          audience: "Homeowner",
        },
      },
      {
        id: "home-bundle",
        title: "Home + auto bundle review",
        description:
          "Best for households comparing deductible strategy, liability limits, and bundle savings in one conversation.",
        icon: "car",
        quote: {
          href: "/quote",
          label: "Start bundle-ready quote",
          entry: "hero-home-bundle-quote",
          audience: "Home / Auto Owner",
          product: "home",
        },
        proof: {
          href: "/evidence-of-insurance",
          label: "Request updated proof package",
          entry: "hero-home-bundle-proof",
          audience: "Home / Auto Owner",
        },
      },
      {
        id: "home-real-estate",
        title: "Real estate or escrow partner",
        description:
          "Use this when a closing timeline, mortgagee update, or lender follow-up is driving the request.",
        icon: "key",
        quote: {
          href: "/quote",
          label: "Start closing-related intake",
          entry: "hero-home-real-estate-quote",
          audience: "Real Estate Professional",
          product: "other",
        },
        proof: {
          href: "/evidence-of-insurance",
          label: "Request closing proof",
          entry: "hero-home-real-estate-proof",
          audience: "Real Estate Professional",
        },
      },
    ],
  },
  auto: {
    headline: "Pick the auto path that matches the driver mix.",
    description:
      "Auto shoppers usually care about one of three things: a better premium, a household change, or fast proof that keeps life moving.",
    helperText:
      "If somebody is not sure where to start, the solo-driver path is usually the fastest and easiest first click.",
    quickReasons: ["New vehicle or replacement", "Teen or household drivers", "ID cards or lender proof"],
    cards: [
      {
        id: "auto-driver",
        title: "Daily driver or solo vehicle",
        description:
          "Great for replacing a current auto policy, adding a vehicle, or checking if the current limits still make sense.",
        icon: "car",
        quote: {
          href: "/quote",
          label: "Start auto quote",
          entry: "hero-auto-driver-quote",
          audience: "Auto Client",
          product: "auto",
        },
        proof: {
          href: "/evidence-of-insurance",
          label: "Request ID card or proof",
          entry: "hero-auto-driver-proof",
          audience: "Auto Client",
        },
      },
      {
        id: "auto-household",
        title: "Household or bundled drivers",
        description:
          "Use this when multiple drivers, teen drivers, or a home + auto bundle are part of the decision.",
        icon: "users",
        quote: {
          href: "/quote",
          label: "Start household quote",
          entry: "hero-auto-household-quote",
          audience: "Home / Auto Owner",
          product: "auto",
        },
        proof: {
          href: "/evidence-of-insurance",
          label: "Request multi-driver proof",
          entry: "hero-auto-household-proof",
          audience: "Home / Auto Owner",
        },
      },
      {
        id: "auto-lender",
        title: "Registration, DMV, or lienholder help",
        description:
          "Best for fast follow-up when a lender, DMV task, dealership, or leasing flow needs evidence of coverage.",
        icon: "shieldCheck",
        quote: {
          href: "/quote",
          label: "Start guided auto intake",
          entry: "hero-auto-lender-quote",
          audience: "Auto Client",
          product: "auto",
        },
        proof: {
          href: "/evidence-of-insurance",
          label: "Request lender-ready proof",
          entry: "hero-auto-lender-proof",
          audience: "Auto Client",
        },
      },
    ],
  },
  renters: {
    headline: "Renters coverage should feel fast, affordable, and clean.",
    description:
      "Most renters are either moving, bundling with auto, or trying to satisfy a landlord or property manager quickly.",
    helperText:
      "The most common renters path is a simple move-in quote, then a bundle check if auto coverage is already in play.",
    quickReasons: ["Apartment move-in", "Bundle with auto", "Landlord proof request"],
    cards: [
      {
        id: "renters-move-in",
        title: "Apartment or rental move-in",
        description:
          "Use this for first apartments, new leases, or replacing a basic policy with something better explained.",
        icon: "key",
        quote: {
          href: "/quote",
          label: "Start renters quote",
          entry: "hero-renters-move-quote",
          audience: "Renters Client",
          product: "renters",
        },
        proof: {
          href: "/evidence-of-insurance",
          label: "Request landlord proof",
          entry: "hero-renters-move-proof",
          audience: "Renters Client",
        },
      },
      {
        id: "renters-bundle",
        title: "Renters + auto bundle",
        description:
          "Helpful for people already carrying auto insurance who want a cleaner, lower-stress bundle setup.",
        icon: "car",
        quote: {
          href: "/quote",
          label: "Start bundle quote",
          entry: "hero-renters-bundle-quote",
          audience: "Home / Auto Owner",
          product: "renters",
        },
        proof: {
          href: "/evidence-of-insurance",
          label: "Request updated proof",
          entry: "hero-renters-bundle-proof",
          audience: "Renters Client",
        },
      },
      {
        id: "renters-landlord",
        title: "Leasing office or property manager",
        description:
          "Best for declarations pages, additional interested parties, or lease-compliance paperwork that needs a fast handoff.",
        icon: "shieldCheck",
        quote: {
          href: "/quote",
          label: "Start renters intake",
          entry: "hero-renters-landlord-quote",
          audience: "Renters Client",
          product: "renters",
        },
        proof: {
          href: "/evidence-of-insurance",
          label: "Request leasing proof",
          entry: "hero-renters-landlord-proof",
          audience: "Renters Client",
        },
      },
    ],
  },
  life: {
    headline: "Life coverage starts with who you are protecting.",
    description:
      "Life shoppers usually want to protect income, cover a growing family, or review a policy they already have but do not fully trust yet.",
    helperText:
      "If they are unsure, the growing-family path is the most natural entry point and usually leads to the right follow-up conversation.",
    quickReasons: ["Growing family", "Income replacement", "Existing policy review"],
    cards: [
      {
        id: "life-family",
        title: "Family protection",
        description:
          "Great for new parents, newly married couples, or anyone who wants a simple income-protection conversation.",
        icon: "heartPulse",
        quote: {
          href: "/quote",
          label: "Start life quote",
          entry: "hero-life-family-quote",
          audience: "Life Insurance Client",
          product: "life",
        },
        proof: {
          href: "/evidence-of-insurance",
          label: "Request policy proof",
          entry: "hero-life-family-proof",
          audience: "Life Insurance Client",
        },
      },
      {
        id: "life-income",
        title: "Income or legacy planning",
        description:
          "Use this when the conversation is really about protecting a business, a partner, kids, or long-term obligations.",
        icon: "briefcase",
        quote: {
          href: "/quote",
          label: "Start planning intake",
          entry: "hero-life-income-quote",
          audience: "Life Insurance Client",
          product: "life",
        },
        proof: {
          href: "/evidence-of-insurance",
          label: "Request policy details",
          entry: "hero-life-income-proof",
          audience: "Life Insurance Client",
        },
      },
      {
        id: "life-review",
        title: "Existing policy review",
        description:
          "Helpful when someone already has life coverage but wants clarity on amount, term, or whether it still fits.",
        icon: "slidersHorizontal",
        quote: {
          href: "/quote",
          label: "Start review request",
          entry: "hero-life-review-quote",
          audience: "Life Insurance Client",
          product: "life",
        },
        proof: {
          href: "/evidence-of-insurance",
          label: "Request proof for records",
          entry: "hero-life-review-proof",
          audience: "Life Insurance Client",
        },
      },
    ],
  },
  umbrella: {
    headline: "Umbrella coverage is about protecting the gaps most people miss.",
    description:
      "This is a good fit for households with more to protect, layered liability questions, or policies that need coordination across carriers.",
    helperText:
      "Umbrella usually works best after a quick review of the home and auto layers underneath it, so we steer people into a consultative first step.",
    quickReasons: ["Extra liability protection", "Homes, rentals, or higher assets", "Cross-policy cleanup"],
    cards: [
      {
        id: "umbrella-household",
        title: "Home + auto liability review",
        description:
          "Use this if someone wants a higher liability ceiling over the policies they already carry today.",
        icon: "umbrella",
        quote: {
          href: "/quote",
          label: "Start umbrella review",
          entry: "hero-umbrella-household-quote",
          audience: "Home / Auto Owner",
          product: "umbrella",
        },
        proof: {
          href: "/evidence-of-insurance",
          label: "Request umbrella proof",
          entry: "hero-umbrella-household-proof",
          audience: "Home / Auto Owner",
        },
      },
      {
        id: "umbrella-property",
        title: "Rental or higher-asset protection",
        description:
          "Helpful for landlords, public-facing households, and anyone worried standard liability limits may not be enough.",
        icon: "building2",
        quote: {
          href: "/quote",
          label: "Start liability intake",
          entry: "hero-umbrella-property-quote",
          audience: "Umbrella Coverage Client",
          product: "umbrella",
        },
        proof: {
          href: "/evidence-of-insurance",
          label: "Request excess liability proof",
          entry: "hero-umbrella-property-proof",
          audience: "Umbrella Coverage Client",
        },
      },
      {
        id: "umbrella-cleanup",
        title: "Policy coordination cleanup",
        description:
          "Best for clients who want one conversation about liability gaps, underlying limits, and where the weak spots are.",
        icon: "slidersHorizontal",
        quote: {
          href: "/quote",
          label: "Start coverage cleanup",
          entry: "hero-umbrella-cleanup-quote",
          audience: "Umbrella Coverage Client",
          product: "umbrella",
        },
        proof: {
          href: "/evidence-of-insurance",
          label: "Request policy summary",
          entry: "hero-umbrella-cleanup-proof",
          audience: "Umbrella Coverage Client",
        },
      },
    ],
  },
  business: {
    headline: "Start with the business situation, not just the policy name.",
    description:
      "Business insurance gets easier when the first click reflects how the company actually operates, not just what line item they think they need.",
    helperText:
      "Most commercial leads start with the owner or operator path, then the team narrows into liability, property, workers comp, or auto after the first conversation.",
    quickReasons: ["New venture or renewal", "COIs for vendors or landlords", "Payroll, vehicles, or property changes"],
    cards: [
      {
        id: "business-owner",
        title: "Business owner or operator",
        description:
          "Best for package reviews, renewals, and commercial quotes that need a practical starting point instead of a jargon-heavy form.",
        icon: "briefcase",
        quote: {
          href: "/quote",
          label: "Start business quote",
          entry: "hero-business-owner-quote",
          audience: "Business Owner",
          product: "business",
        },
        proof: {
          href: "/evidence-of-insurance",
          label: "Request a COI or vendor proof",
          entry: "hero-business-owner-proof",
          audience: "Business Owner",
        },
      },
      {
        id: "business-operations",
        title: "Contractor, restaurant, or service business",
        description:
          "Use this when payroll, vehicles, tools, premises, or operational risk are all part of the conversation.",
        icon: "hardHat",
        quote: {
          href: "/quote",
          label: "Start operations quote",
          entry: "hero-business-operations-quote",
          audience: "Business Owner",
          product: "business",
        },
        proof: {
          href: "/evidence-of-insurance",
          label: "Request compliance proof",
          entry: "hero-business-operations-proof",
          audience: "Business Owner",
        },
      },
      {
        id: "business-certificate",
        title: "Certificates, landlord, or vendor paperwork",
        description:
          "Helpful for COIs, additional insured requests, and fast follow-up when somebody is blocked waiting on insurance paperwork.",
        icon: "shieldCheck",
        quote: {
          href: "/quote",
          label: "Start business intake",
          entry: "hero-business-certificate-quote",
          audience: "Business Owner",
          product: "business",
        },
        proof: {
          href: "/evidence-of-insurance",
          label: "Request proof of insurance",
          entry: "hero-business-certificate-proof",
          audience: "Business Owner",
        },
      },
    ],
  },
};

export function getHeroHelpContent(productSlug: ProductSlug) {
  return heroHelpContent[productSlug] ?? heroHelpContent.home!;
}
