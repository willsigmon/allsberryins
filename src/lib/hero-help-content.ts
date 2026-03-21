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
      "Buying a home? Refinancing? Need paperwork for your lender? Pick the path that fits your situation.",
    helperText:
      "Most people start with homeowners insurance. Then they add auto to see if combining saves money.",
    quickReasons: ["New purchase or refinance", "Bundle home + auto", "Escrow or lender proof"],
    cards: [
      {
        id: "home-homeowner",
        title: "Homeowner or buyer",
        description:
          "Start here if you're buying a home, checking your current plan, or setting up a new homeowners policy.",
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
          "Good for families who want to compare home and auto together and see if combining saves money.",
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
          "Use this when you're closing on a home and need insurance paperwork for the bank or title company.",
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
      "Most auto shoppers want one of three things: a lower price, help adding or removing a driver, or quick proof of insurance.",
    helperText:
      "Not sure where to start? The one-car path is the fastest way to get going.",
    quickReasons: ["New vehicle or replacement", "Teen or household drivers", "ID cards or lender proof"],
    cards: [
      {
        id: "auto-driver",
        title: "One car or one driver",
        description:
          "Good for getting a new auto plan, adding a car, or checking if your current coverage still fits.",
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
        title: "Multiple drivers or family plan",
        description:
          "Use this when you have more than one driver, a teen driver, or want to combine your home and auto together.",
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
        id: "auto-proof",
        title: "Need proof of auto insurance?",
        description:
          "Use this when your bank, dealer, or leasing company needs proof that your vehicle is covered.",
        icon: "shieldCheck",
        quote: {
          href: "/quote",
          label: "Start auto quote",
          entry: "hero-auto-proof-quote",
          audience: "Auto Client",
          product: "auto",
        },
        proof: {
          href: "/evidence-of-insurance",
          label: "Request proof of coverage",
          entry: "hero-auto-proof-request",
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
      "Most renters start with a simple move-in quote. If you already have auto insurance, we can check if combining saves you money.",
    quickReasons: ["Apartment move-in", "Bundle with auto", "Landlord proof request"],
    cards: [
      {
        id: "renters-move-in",
        title: "Apartment or rental move-in",
        description:
          "Use this for your first apartment, a new lease, or if you want a renters plan that's easier to understand.",
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
          "If you already have auto insurance, combining it with renters can save money and keep things simple.",
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
          "Use this when your landlord or leasing office needs a letter proving you have renters insurance.",
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
      "Your privacy comes first. We only see what we need to help you — never your full personal details. The process is quick and simple.",
    helperText:
      "Not sure where to start? The family protection path is the most popular choice and a great first step.",
    quickReasons: ["Growing family", "Income replacement", "Existing policy review"],
    cards: [
      {
        id: "life-family",
        title: "Family protection",
        description:
          "Great for new parents, newly married couples, or anyone who wants to make sure their family is taken care of.",
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
          "Use this if you want to protect a business, a partner, your kids, or plan for the long run.",
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
          "Already have life insurance? We can check if the amount and length still make sense for you.",
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
      "Umbrella insurance adds extra protection on top of your home and auto plans. It helps cover big costs your other insurance might not fully handle.",
    helperText:
      "We usually start by looking at your home and auto plans first. That way, we can see where umbrella coverage would help the most.",
    quickReasons: ["Extra protection beyond your other plans", "Homes, rentals, or more to protect", "Make sure all your plans work together"],
    cards: [
      {
        id: "umbrella-household",
        title: "Home + auto liability review",
        description:
          "Use this if you want more protection on top of the home and auto plans you already have.",
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
          "Good for landlords, property owners, or anyone who wants more protection than their regular plans offer.",
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
        title: "Check all your plans together",
        description:
          "Best if you want us to look at all your insurance plans at once and find any gaps or weak spots.",
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
      "Business insurance is easier when we start with how your company works, not just a list of policy names.",
    helperText:
      "Most business owners start here. After a quick conversation, we help you figure out which types of coverage you need.",
    quickReasons: ["New business or renewal", "Proof of insurance for vendors or landlords", "Changes to employees, vehicles, or property"],
    cards: [
      {
        id: "business-owner",
        title: "Business owner or operator",
        description:
          "Good for checking your current plan, renewing, or getting a new business quote with a simple form.",
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
          label: "Request proof of insurance",
          entry: "hero-business-owner-proof",
          audience: "Business Owner",
        },
      },
      {
        id: "business-operations",
        title: "Contractor, restaurant, or service business",
        description:
          "Use this when your business has employees, vehicles, tools, or a location that needs coverage.",
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
          "Use this when a vendor, landlord, or client needs proof that your business has insurance.",
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
