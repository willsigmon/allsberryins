export const allsberryCampaign = {
  path: "/allsberry-agency",
  // Frank's latest direction: the Google landing page uses this single
  // tracking number. Meta uses click-to-call directly in the ads, not here.
  phone: "(866) 688-6145",
  phoneHref: "tel:+18666886145",
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
