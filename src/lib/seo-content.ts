import type { AgentSlug } from "@/lib/site-data";

export type SeoPageType = "pillar" | "supporting" | "location";

export type SeoFaq = {
  question: string;
  answer: string;
};

export type SeoReference = {
  label: string;
  href: string;
  source: string;
};

export type SeoSection = {
  title: string;
  body: string;
  bullets?: string[];
  callout?: string;
};

export type SeoComparison = {
  title: string;
  description?: string;
  leftLabel: string;
  rightLabel: string;
  rows: Array<{
    label: string;
    left: string;
    right: string;
  }>;
};

export type SeoPage = {
  slug: string;
  pageType: SeoPageType;
  title: string;
  description: string;
  eyebrow: string;
  heroSummary: string;
  answer: string;
  whoItsFor: string[];
  keyPoints: string[];
  sections: SeoSection[];
  comparison?: SeoComparison;
  faqs: SeoFaq[];
  references?: SeoReference[];
  keywords: string[];
  lastReviewed: string;
  reviewedBy: string;
  relatedPageSlugs?: string[];
  relatedBlogSlugs?: string[];
  relatedAgentSlugs?: AgentSlug[];
};

export const seoPages: SeoPage[] = [
  {
    slug: "california-home-insurance",
    pageType: "pillar",
    title: "California Home Insurance",
    description:
      "California home insurance is more complex than a quick quote. Review wildfire risk, rebuild cost, carrier appetite, and FAIR Plan + DIC options.",
    eyebrow: "Home insurance guide",
    heroSummary:
      "This is the wedge page for modern search and AI discovery: clear, plain-English guidance on how California home insurance actually gets evaluated in 2026.",
    answer:
      "California home insurance is no longer a one-click commodity for many households. Premium changes, carrier pullbacks, wildfire underwriting, and rebuild-cost accuracy all matter, which is why the strongest process is a real coverage review instead of a generic rate hunt.",
    whoItsFor: [
      "Homeowners comparing renewal options in California",
      "Buyers who want to understand what a real quote review should cover",
      "Families whose current policy feels expensive or incomplete",
      "People who may need a FAIR Plan or other backup path",
    ],
    keyPoints: [
      "Cheapest is not the same thing as best protected",
      "Replacement cost and wildfire exposure affect the quote more than most people expect",
      "A local review can uncover gaps, overlap, or better bundle structure",
    ],
    sections: [
      {
        title: "What changes the price of home insurance in California",
        body:
          "The biggest drivers are not just your ZIP code. Carriers look at the home's age, roof condition, claims history, rebuild cost, brush or wildfire exposure, updates to plumbing or electrical systems, and how the property fits the carrier's current appetite.",
        bullets: [
          "Wildfire and brush exposure can affect eligibility before price even comes up",
          "Outdated rebuild numbers can leave a home underinsured",
          "Bundling can help, but only after the base coverage is built correctly",
        ],
      },
      {
        title: "What a real quote review should include",
        body:
          "A useful review checks whether the dwelling limit reflects rebuilding reality, whether liability is high enough, how deductibles affect both price and risk, and whether the policy includes the endorsements the household actually needs.",
        bullets: [
          "Dwelling and other-structures limits",
          "Personal property and loss-of-use protection",
          "Deductible fit and claim comfort level",
          "Whether earthquake, flood, or umbrella coverage should be reviewed separately",
        ],
      },
      {
        title: "When FAIR Plan and DIC enter the conversation",
        body:
          "Some households still qualify for standard homeowners coverage. Others need a backup structure because of wildfire exposure or market restrictions. That is where a FAIR Plan plus a Difference in Conditions policy may become part of the discussion.",
        callout:
          "A FAIR Plan is usually a fallback path, not the first choice when a standard market option is still available.",
      },
    ],
    comparison: {
      title: "Quick quote vs. reviewed California home insurance plan",
      description:
        "This is where many ranking pages fail: they act like every home should be shopped the same way.",
      leftLabel: "Fast generic quote",
      rightLabel: "Reviewed California quote",
      rows: [
        {
          label: "Wildfire context",
          left: "Often treated as just another ZIP-code input",
          right: "Reviewed as a real underwriting and eligibility factor",
        },
        {
          label: "Rebuild cost",
          left: "Can be carried over from stale assumptions",
          right: "Pressure-tested against current rebuild reality",
        },
        {
          label: "Fallback options",
          left: "Usually not explained",
          right: "FAIR Plan and DIC are discussed when relevant",
        },
      ],
    },
    faqs: [
      {
        question: "Why is homeowners insurance so expensive in California?",
        answer:
          "Wildfire risk, rebuild cost pressure, carrier appetite, reinsurance costs, and claims trends have all pushed prices higher. The best response is not just to chase the lowest number, but to make sure the structure of the policy still fits your home and your risk.",
      },
      {
        question: "Can I bundle home and auto insurance in California?",
        answer:
          "Often yes, and bundling can help. But the right order is to confirm the home policy itself is strong first, then compare bundle options with real coverage details instead of just a discount headline.",
      },
      {
        question: "Do all California homeowners need the FAIR Plan?",
        answer:
          "No. Many people still qualify for standard homeowners insurance. FAIR Plan becomes relevant when the traditional market is limited or unavailable for that specific property.",
      },
      {
        question: "Can a local agency still help if I already have a renewal offer?",
        answer:
          "Yes. A renewal is often the best time to review limits, deductibles, endorsements, and whether another structure would make more sense for your situation.",
      },
    ],
    references: [
      {
        label: "California Department of Insurance consumer resources",
        href: "https://www.insurance.ca.gov/",
        source: "California Department of Insurance",
      },
      {
        label: "California FAIR Plan",
        href: "https://www.cfpnet.com/",
        source: "California FAIR Plan Association",
      },
    ],
    keywords: [
      "homeowners insurance california",
      "home insurance quote california",
      "home insurance corona ca",
      "affordable homeowners insurance",
      "insurance for homes in fire zones california",
    ],
    lastReviewed: "2026-04-06",
    reviewedBy: "Reviewed by Erin Allsberry, Agency Owner (CA License #0E91043)",
    relatedPageSlugs: [
      "wildfire-home-insurance-california",
      "ca-fair-plan-guide",
      "difference-in-conditions-insurance-california",
      "insurance-agency-corona-ca",
    ],
    relatedBlogSlugs: [
      "five-questions-before-renewing-home-insurance",
      "save-on-homeowners-insurance-california",
      "why-bundle-your-policies",
    ],
    relatedAgentSlugs: ["erin", "brahm"],
  },
  {
    slug: "wildfire-home-insurance-california",
    pageType: "supporting",
    title: "Wildfire Home Insurance in California",
    description:
      "Wildfire pressure changes how California home insurance is quoted and renewed. Learn how eligibility, inspections, and backup options work.",
    eyebrow: "Wildfire insurance context",
    heroSummary:
      "People often search for a standalone wildfire policy, but the real question is how wildfire exposure affects home insurance eligibility, pricing, and fallback planning in California.",
    answer:
      "Most homeowners do not buy a separate wildfire policy in the standard market. Instead, wildfire exposure affects whether a carrier will write or renew the home, how the home is inspected, and whether a standard homeowners policy or a FAIR Plan-based structure is the right path.",
    whoItsFor: [
      "California homeowners in brush, foothill, canyon, or mountain-adjacent areas",
      "Households facing non-renewal or sharp premium changes",
      "People trying to understand what carriers mean by wildfire risk",
    ],
    keyPoints: [
      "Wildfire pressure changes underwriting before it changes marketing language",
      "Home hardening and defensible-space work can matter, but they are not a guarantee",
      "The backup path should be understood before a renewal deadline arrives",
    ],
    sections: [
      {
        title: "What wildfire risk changes in practice",
        body:
          "Carriers may order new inspections, tighten underwriting, or limit appetite for certain property profiles. That does not always mean a home is uninsurable, but it often means the shopping process takes more context and better documentation.",
      },
      {
        title: "What insurers tend to review",
        body:
          "Expect questions about brush clearance, roof type, access roads, slope, prior claims, updates to the home, and whether the property has completed hardening work. Some carriers also use third-party wildfire models alongside their own internal rules.",
        bullets: [
          "Roof age and materials",
          "Defensible space and brush clearance",
          "Exterior materials and ember resistance",
          "Access and emergency response considerations",
        ],
      },
      {
        title: "What to do before the renewal gets close",
        body:
          "If the property might be a tougher home to place, do not wait until the last few days. Gather policy documents, inspection notes, renovation details, and any home-hardening updates early so the review can move with real information instead of guesswork.",
      },
    ],
    comparison: {
      title: "Standard market path vs. fallback path",
      leftLabel: "Standard homeowners market",
      rightLabel: "Fallback planning",
      rows: [
        {
          label: "When it fits",
          left: "When the home still meets a carrier's appetite",
          right: "When the standard market is limited or unavailable",
        },
        {
          label: "Main goal",
          left: "Keep broad homeowners coverage with one policy",
          right: "Protect the property with FAIR Plan plus broader support where needed",
        },
        {
          label: "Best use of local guidance",
          left: "Checking if a better standard fit still exists",
          right: "Explaining what gaps still need to be addressed",
        },
      ],
    },
    faqs: [
      {
        question: "Is there a separate wildfire insurance policy in California?",
        answer:
          "Usually the issue is not a separate wildfire product. It is whether a standard homeowners policy is still available for the property and, if not, whether another structure like FAIR Plan plus DIC makes sense.",
      },
      {
        question: "Can home-hardening work help?",
        answer:
          "It can help support eligibility or underwriting conversations, especially when documentation is available. But it should be treated as part of the placement strategy, not a guaranteed fix by itself.",
      },
      {
        question: "What should I gather if my renewal is at risk?",
        answer:
          "Start with the current declaration page, prior carrier notices, inspection notes, update history for the home, and any defensible-space or hardening improvements you can document.",
      },
    ],
    references: [
      {
        label: "California Department of Insurance disaster and insurance resources",
        href: "https://www.insurance.ca.gov/01-consumers/140-catastrophes/upload/Disaster-Insurance-Guidebook-FINAL-v2.pdf",
        source: "California Department of Insurance",
      },
      {
        label: "Ready, Set, Go / Ready for Wildfire",
        href: "https://www.readyforwildfire.org/",
        source: "CAL FIRE wildfire preparedness program",
      },
    ],
    keywords: [
      "wildfire insurance california",
      "fire insurance california",
      "insurance for homes in fire zones",
      "cal fire home insurance",
      "wildfire home insurance california",
    ],
    lastReviewed: "2026-04-06",
    reviewedBy: "Reviewed by Erin Allsberry, Agency Owner (CA License #0E91043)",
    relatedPageSlugs: [
      "california-home-insurance",
      "ca-fair-plan-guide",
      "home-insurance-in-a-fire-zone-california",
    ],
    relatedBlogSlugs: [
      "five-questions-before-renewing-home-insurance",
      "save-on-homeowners-insurance-california",
    ],
    relatedAgentSlugs: ["erin"],
  },
  {
    slug: "ca-fair-plan-guide",
    pageType: "supporting",
    title: "CA FAIR Plan Guide",
    description:
      "A plain-English guide to the California FAIR Plan, what it usually covers, what it does not, and when a DIC policy may also be part of the solution.",
    eyebrow: "FAIR Plan guide",
    heroSummary:
      "This page is built for one of the highest-value long-tail topics Erin identified: people trying to understand what the CA FAIR Plan is and how it actually works.",
    answer:
      "The California FAIR Plan is a market-of-last-resort program designed to help homeowners find basic fire coverage when traditional insurance is not available. Because it is not the same thing as a standard homeowners policy, many households also need to review whether a Difference in Conditions policy should be paired with it for broader protection.",
    whoItsFor: [
      "Homeowners who were declined or non-renewed in the standard market",
      "People who keep hearing about FAIR Plan but are not sure what it means",
      "Families comparing basic fire coverage against broader homeowners protection",
    ],
    keyPoints: [
      "FAIR Plan is usually a fallback structure, not the ideal first choice",
      "Coverage is narrower than a standard homeowners policy",
      "Many people also review DIC coverage to address gaps",
    ],
    sections: [
      {
        title: "When FAIR Plan usually comes up",
        body:
          "It most often becomes part of the conversation after standard-market difficulty: non-renewal, declination, or severe restrictions related to wildfire exposure or property profile.",
      },
      {
        title: "What it usually covers and what it does not",
        body:
          "FAIR Plan is built around basic fire-related protection. It should not be assumed to behave like a traditional homeowners policy. That is why the structure of the total package matters so much.",
        bullets: [
          "Basic property protection is the core role",
          "Liability and other broader protections may need a separate review",
          "The details still depend on the form and endorsements in front of you",
        ],
      },
      {
        title: "Why DIC is often mentioned alongside FAIR Plan",
        body:
          "DIC stands for Difference in Conditions. It is commonly used to add broader protection where FAIR Plan alone would leave important gaps. The exact structure varies, which is why a side-by-side explanation matters.",
      },
    ],
    comparison: {
      title: "Standard homeowners vs. FAIR Plan structure",
      leftLabel: "Standard homeowners",
      rightLabel: "FAIR Plan path",
      rows: [
        {
          label: "Use case",
          left: "Preferred when a standard carrier is still available",
          right: "Fallback when traditional options are limited",
        },
        {
          label: "Coverage breadth",
          left: "Broader all-in-one structure",
          right: "Basic fire-oriented structure that often needs support",
        },
        {
          label: "Review need",
          left: "Annual cleanup and renewal review",
          right: "Closer explanation of what is and is not protected",
        },
      ],
    },
    faqs: [
      {
        question: "What is the CA FAIR Plan and how does it work?",
        answer:
          "It is a market-of-last-resort option that helps provide basic fire coverage when a standard homeowners carrier is not available. The application and policy structure still need to be reviewed carefully because FAIR Plan is not a full substitute for every part of a standard homeowners policy.",
      },
      {
        question: "Can I get a FAIR Plan quote through a local agency?",
        answer:
          "Yes. A local agency can help you understand whether FAIR Plan is actually needed, how it compares to other options, and whether a DIC policy also needs to be reviewed.",
      },
      {
        question: "Does FAIR Plan mean my home is uninsurable?",
        answer:
          "No. It means the structure of the placement has changed. The goal becomes making sure the property is protected in the most complete and understandable way available for that situation.",
      },
    ],
    references: [
      {
        label: "California FAIR Plan official site",
        href: "https://www.cfpnet.com/",
        source: "California FAIR Plan Association",
      },
      {
        label: "California Department of Insurance consumer support",
        href: "https://www.insurance.ca.gov/",
        source: "California Department of Insurance",
      },
    ],
    keywords: [
      "ca fair plan quote",
      "california fair plan insurance",
      "fair plan",
      "what is the ca fair plan and how does it work",
      "fire insurance california",
    ],
    lastReviewed: "2026-04-06",
    reviewedBy: "Reviewed by Erin Allsberry, Agency Owner (CA License #0E91043)",
    relatedPageSlugs: [
      "difference-in-conditions-insurance-california",
      "home-insurance-in-a-fire-zone-california",
      "california-home-insurance",
    ],
    relatedBlogSlugs: ["save-on-homeowners-insurance-california"],
    relatedAgentSlugs: ["erin", "brahm"],
  },
  {
    slug: "difference-in-conditions-insurance-california",
    pageType: "supporting",
    title: "Difference in Conditions (DIC) Insurance in California",
    description:
      "Learn what DIC insurance means in California, why it is often paired with FAIR Plan, and what questions to ask before assuming gaps are covered.",
    eyebrow: "DIC coverage guide",
    heroSummary:
      "This page explains one of the most confusing search terms in California insurance: Difference in Conditions, commonly shortened to DIC.",
    answer:
      "Difference in Conditions insurance is a supplemental policy structure often reviewed alongside FAIR Plan when a household needs broader protection than FAIR Plan alone typically provides. It is not one universal contract, so the safest move is to review what the specific policy form adds back and what still needs attention.",
    whoItsFor: [
      "Homeowners already hearing FAIR Plan and DIC in the same sentence",
      "People trying to understand whether liability or other protections are missing",
      "Families who need a cleaner explanation before they bind coverage",
    ],
    keyPoints: [
      "DIC is not meant to be guessed at from the name alone",
      "The policy form matters because not every DIC package is identical",
      "The value comes from explaining the total coverage structure, not just selling another line item",
    ],
    sections: [
      {
        title: "Why DIC exists",
        body:
          "When FAIR Plan is being used for basic fire protection, households often still need to address other homeowners-style exposures. DIC exists to help bridge that gap, but the exact bridge depends on the policy in front of you.",
      },
      {
        title: "What should be reviewed before you assume you are fully covered",
        body:
          "The questions are practical: where does liability sit, what about theft or water damage, how do deductibles stack, and how do the two policies work together if something actually happens?",
        bullets: [
          "What does FAIR Plan handle first?",
          "What does the DIC form add or restore?",
          "Are there exclusions or limits the household still needs to understand?",
        ],
      },
      {
        title: "Why a side-by-side explanation matters",
        body:
          "DIC is one of those topics that sounds simple until a claim scenario comes up. A side-by-side coverage explanation is usually more helpful than trying to decode the forms after the fact.",
      },
    ],
    comparison: {
      title: "FAIR Plan only vs. FAIR Plan plus DIC",
      leftLabel: "FAIR Plan only",
      rightLabel: "FAIR Plan + DIC review",
      rows: [
        {
          label: "Main strength",
          left: "Basic fire-oriented placement",
          right: "Broader structure built around the FAIR placement",
        },
        {
          label: "Main risk",
          left: "Assuming the whole homeowners picture is handled",
          right: "Still needs a careful form review, but far clearer",
        },
        {
          label: "Best next step",
          left: "Clarify what is missing",
          right: "Clarify how the two policies work together",
        },
      ],
    },
    faqs: [
      {
        question: "What does DIC stand for in insurance?",
        answer:
          "DIC stands for Difference in Conditions. In California home insurance conversations, it often refers to coverage used with a FAIR Plan placement to help provide broader protection.",
      },
      {
        question: "Does every FAIR Plan policy need DIC?",
        answer:
          "The right answer depends on the total coverage structure and what risks still need to be addressed. But many homeowners reviewing FAIR Plan also review DIC because FAIR Plan alone is usually not the full homeowners answer.",
      },
      {
        question: "Can an agency explain DIC in plain English?",
        answer:
          "Yes. That is exactly the point of a reviewed placement: to explain what each policy does, what it does not do, and what your next question should be before binding.",
      },
    ],
    references: [
      {
        label: "California FAIR Plan official site",
        href: "https://www.cfpnet.com/",
        source: "California FAIR Plan Association",
      },
      {
        label: "California Department of Insurance",
        href: "https://www.insurance.ca.gov/",
        source: "California Department of Insurance",
      },
    ],
    keywords: [
      "difference in conditions insurance",
      "difference in conditions insurance california",
      "dic insurance california",
      "fair plan dic policy",
      "insurance for homes in fire zones california",
    ],
    lastReviewed: "2026-04-06",
    reviewedBy: "Reviewed by Erin Allsberry, Agency Owner (CA License #0E91043)",
    relatedPageSlugs: [
      "ca-fair-plan-guide",
      "home-insurance-in-a-fire-zone-california",
      "california-home-insurance",
    ],
    relatedBlogSlugs: ["save-on-homeowners-insurance-california"],
    relatedAgentSlugs: ["erin", "brahm"],
  },
  {
    slug: "home-insurance-in-a-fire-zone-california",
    pageType: "supporting",
    title: "How to Insure a Home in a Fire Zone in California",
    description:
      "What to do if your home is in a higher wildfire area or you have been dropped by insurance in California. Start with the facts before you shop blind.",
    eyebrow: "Fire-zone insurance help",
    heroSummary:
      "This page targets the highest-intent long-tail questions Erin found: people in California actively trying to solve a fire-zone or dropped-policy problem.",
    answer:
      "If a home is in a higher wildfire area or was dropped by a carrier, the first move is not to panic-shop random quotes. The better process is to gather the property facts, understand why the prior carrier pulled back, document hardening work, and then compare whether a standard-market option or a FAIR Plan-based path is more realistic.",
    whoItsFor: [
      "Homeowners in higher wildfire areas",
      "Families that were non-renewed or declined",
      "People who need a fast, realistic next-step plan before a deadline",
    ],
    keyPoints: [
      "Deadlines matter, but so does getting the structure right",
      "Carrier notices and property updates are part of the placement file",
      "Local context can keep you from wasting time on mismatched options",
    ],
    sections: [
      {
        title: "If you were dropped or non-renewed",
        body:
          "Read the notice carefully and save it. The reason matters. Sometimes the issue is general carrier appetite, sometimes it is inspection-related, and sometimes it is tied to wildfire model changes or property condition.",
      },
      {
        title: "What to gather before you start shopping",
        body:
          "Bring the current declaration page, the carrier notice, renovation details, roof information, photos if helpful, and any defensible-space or home-hardening records. That lets the next review start with evidence instead of guesswork.",
        bullets: [
          "Current declarations page",
          "Carrier non-renewal or declination notice",
          "Roof, wiring, plumbing, and update history",
          "Brush clearance or home-hardening documentation",
        ],
      },
      {
        title: "What the next path usually looks like",
        body:
          "The goal is to test for a viable standard market option first, then move to backup structures when necessary. That keeps the process disciplined and avoids assuming FAIR Plan is the only answer before the file is fully reviewed.",
      },
    ],
    faqs: [
      {
        question: "How do I get insurance in a fire zone in California?",
        answer:
          "Start with a reviewed placement strategy, not a mass quote spree. Gather your current policy documents, the reason for any carrier change, and any property-improvement records so the next review can focus on realistic options.",
      },
      {
        question: "How do I insure a home that was dropped by insurance?",
        answer:
          "Save the notice, understand the reason, collect your property details, and review whether a standard market carrier is still possible before moving into fallback structures like FAIR Plan and DIC.",
      },
      {
        question: "Should I wait until my renewal is almost over?",
        answer:
          "No. Tougher placements usually benefit from more lead time, not less. Early review creates more room to compare the right structure and avoid rushed decisions.",
      },
    ],
    references: [
      {
        label: "California Department of Insurance consumer guidance",
        href: "https://www.insurance.ca.gov/",
        source: "California Department of Insurance",
      },
      {
        label: "Ready for Wildfire preparedness resources",
        href: "https://www.readyforwildfire.org/",
        source: "CAL FIRE wildfire preparedness program",
      },
    ],
    keywords: [
      "how to get insurance in a fire zone california",
      "how to insure a home that was dropped by insurance",
      "insurance for homes in fire zones california",
      "wildfire insurance california",
      "fire insurance california",
    ],
    lastReviewed: "2026-04-06",
    reviewedBy: "Reviewed by Erin Allsberry, Agency Owner (CA License #0E91043)",
    relatedPageSlugs: [
      "wildfire-home-insurance-california",
      "ca-fair-plan-guide",
      "difference-in-conditions-insurance-california",
    ],
    relatedBlogSlugs: [
      "five-questions-before-renewing-home-insurance",
      "save-on-homeowners-insurance-california",
    ],
    relatedAgentSlugs: ["erin"],
  },
  {
    slug: "insurance-agency-corona-ca",
    pageType: "location",
    title: "Insurance Agency in Corona, CA",
    description:
      "Allsberry Insurance Agency in Corona, CA helps Inland Empire and Southern California clients with home, auto, business, and life insurance.",
    eyebrow: "Local office page",
    heroSummary:
      "This is the proof-rich local page meant to support map, local, and AI-search visibility without spinning up thin city clones.",
    answer:
      "Allsberry Insurance Agency is a Corona-based insurance office serving households and businesses across the Inland Empire and broader Southern California. If you searched for an insurance agent near Corona, this page is designed to make the office, contact details, and core coverage help easy to verify quickly.",
    whoItsFor: [
      "People searching for an insurance agent near Corona",
      "Homeowners and drivers in Corona, Norco, Riverside, Eastvale, and nearby communities",
      "Business owners who want a local office to call when they need help",
    ],
    keyPoints: [
      "Local office, real team, direct phone, and quote help",
      "Home, auto, business, life, and proof-of-insurance support",
      "Built around Corona first, then Inland Empire proof expansion",
    ],
    sections: [
      {
        title: "Why a local insurance page still matters",
        body:
          "Many people do not just want a rate. They want to confirm there is a real office, a local phone number, and a team that can explain the coverage before and after the policy is bound. That is especially true when home insurance or business insurance is getting harder to place.",
      },
      {
        title: "What the Corona office helps with",
        body:
          "The team helps with home, auto, umbrella, life, business, workers compensation, and proof-of-insurance requests. The right route depends on whether you are shopping fresh, reviewing a renewal, or fixing a time-sensitive paperwork issue.",
        bullets: [
          "Homeowners and personal lines reviews",
          "Business insurance and workers comp conversations",
          "Certificates or evidence of insurance requests",
          "Agent contact pages for direct follow-up",
        ],
      },
      {
        title: "Local context the site should keep reinforcing",
        body:
          "This page is intentionally centered on Corona, while still acknowledging the office serves the wider Inland Empire and Southern California. That gives search systems one strong entity page to trust instead of a pile of thin city pages.",
        callout:
          "The next move after this page is proof: reviews, photos, consistent listing data, and a strong Google Business Profile cadence.",
      },
    ],
    comparison: {
      title: "Call-center experience vs. local office review",
      leftLabel: "Generic quote path",
      rightLabel: "Local Corona office path",
      rows: [
        {
          label: "Office verification",
          left: "Not always clear who you are dealing with",
          right: "Address, phone, team, and contact routes are visible",
        },
        {
          label: "Problem solving",
          left: "Often starts with general scripts",
          right: "Can move straight into your actual local situation",
        },
        {
          label: "Follow-through",
          left: "May feel transactional",
          right: "Better fit for renewals, paperwork, and long-term review",
        },
      ],
    },
    faqs: [
      {
        question: "Is Allsberry Insurance Agency really based in Corona, CA?",
        answer:
          "Yes. The office is at 355 N Sheridan St, Ste 100, Corona, CA 92878 and serves clients across Corona, the Inland Empire, and broader Southern California.",
      },
      {
        question: "Can I call or email instead of starting online?",
        answer:
          "Yes. You can call the office, email the team, or start with the online quote flow if that is faster for you.",
      },
      {
        question: "Do you only help with home insurance?",
        answer:
          "No. The office also helps with auto, umbrella, life, business insurance, workers compensation, and proof-of-insurance requests.",
      },
    ],
    references: [
      {
        label: "Google Maps profile",
        href: "https://www.google.com/maps/place/Allsberry+Insurance+Agency/@33.88454,-117.56837,17z/",
        source: "Google Maps",
      },
      {
        label: "Official Erin Allsberry Farmers profile",
        href: "https://agents.farmers.com/ca/corona/erin-allsberry/",
        source: "Farmers public profile",
      },
    ],
    keywords: [
      "insurance agent corona ca",
      "insurance agency corona ca",
      "insurance inland empire",
      "riverside county insurance agent",
      "local insurance agent near me",
    ],
    lastReviewed: "2026-04-06",
    reviewedBy: "Reviewed by Erin Allsberry, Agency Owner (CA License #0E91043)",
    relatedPageSlugs: ["california-home-insurance", "ca-fair-plan-guide"],
    relatedBlogSlugs: [
      "what-is-an-umbrella-policy",
      "understanding-commercial-insurance-small-businesses",
      "why-bundle-your-policies",
    ],
    relatedAgentSlugs: ["erin", "brahm", "dakota"],
  },
];

export const featuredSeoPageSlugs = [
  "california-home-insurance",
  "ca-fair-plan-guide",
  "insurance-agency-corona-ca",
] as const;

export const seoKeywordBasket = [
  "insurance agent corona ca",
  "insurance agency corona ca",
  "home insurance corona ca",
  "homeowners insurance california",
  "wildfire insurance california",
  "ca fair plan quote",
  "difference in conditions insurance california",
  "how to get insurance in a fire zone california",
  "how to insure a home that was dropped by insurance",
] as const;

const seoPageLookup = new Map(seoPages.map((page) => [page.slug, page]));

const seoPagesByAgentSlug: Partial<Record<AgentSlug, string[]>> = {
  erin: [
    "california-home-insurance",
    "wildfire-home-insurance-california",
    "ca-fair-plan-guide",
    "difference-in-conditions-insurance-california",
    "home-insurance-in-a-fire-zone-california",
    "insurance-agency-corona-ca",
  ],
  brahm: [
    "california-home-insurance",
    "ca-fair-plan-guide",
    "difference-in-conditions-insurance-california",
    "insurance-agency-corona-ca",
  ],
  dakota: ["insurance-agency-corona-ca", "california-home-insurance"],
};

export function getSeoPageBySlug(slug: string) {
  return seoPageLookup.get(slug);
}

export function getSeoPagesBySlugs(slugs: readonly string[]) {
  return slugs
    .map((slug) => getSeoPageBySlug(slug))
    .filter((page): page is SeoPage => Boolean(page));
}

export function getFeaturedSeoPages() {
  return getSeoPagesBySlugs(featuredSeoPageSlugs);
}

export function getSeoPagesForAgent(agentSlug: AgentSlug) {
  return getSeoPagesBySlugs(seoPagesByAgentSlug[agentSlug] ?? []);
}

export function getSeoPagePath(slug: string) {
  return `/${slug}`;
}
