export const allsberryCampaign = {
  path: "/allsberry-agency",
  // Google Ads fallback number. CallRail's existing dynamic number insertion
  // keeps Google on this line and swaps Meta traffic to its configured
  // tracking line, (951) 494-2765, when applicable.
  phone: "(951) 433-7683",
  phoneHref: "tel:+19514337683",
  callRailScriptUrl:
    "https://cdn.callrail.com/companies/952649365/646c44144ffb383f042d/12/swap.js",
  headline: "California home insurance starts with one clear conversation.",
  description:
    "Get a free California home insurance quote from Erin Allsberry, a licensed agent in Corona. One call covers coverage review, high fire-risk options, and bundling.",
  heroDescription:
    "A licensed California agent reviews your coverage, checks your discounts, and quotes it on one call.",
  heroHeadline: "Get free home insurance quotes",
  heroLocation: "in California",
  heroNote: "Call now and save up to 35% on California Home Insurance*",
  rating: {
    value: "5.0",
    reviewCount: "147",
  },
  carrierLogos: [
    {
      name: "Farmers Insurance",
      src: "/media/campaign/carriers/farmers.png",
      width: 1476,
      height: 802,
    },
    {
      name: "Bristol West",
      src: "/media/campaign/carriers/bristol-west.png",
      width: 400,
      height: 400,
    },
    {
      name: "Foremost Insurance",
      src: "/media/campaign/carriers/foremost.png",
      width: 465,
      height: 465,
    },
    {
      name: "Progressive",
      src: "/media/campaign/carriers/progressive.png",
      width: 540,
      height: 508,
    },
  ],
  quoteOptions: [
    {
      title: "Home insurance",
      description: "Dwelling, contents and liability — reviewed line by line",
      icon: "home",
    },
    {
      title: "Auto insurance",
      description: "Quoted in the same conversation",
      icon: "auto",
    },
    {
      title: "Home + Auto",
      description: "Bundle both on one call",
      icon: "bundle",
      badge: "Bundle & save",
    },
  ],
  agent: {
    name: "Erin Allsberry",
    role: "Licensed California agent · Corona",
    image: "/media/campaign/erin-allsberry.webp",
    description:
      "One call is usually all it takes. Erin looks at the coverage you have now, walks through what California underwriting will and won't accept on your property, and tells you straight what your options are — including the FAIR Plan if your home sits in a high fire-risk area.",
  },
} as const;
