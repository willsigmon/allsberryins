import { productSelectionOptions, type ProductSlug } from "@/lib/site-data";

export const quoteInsuranceTypes = ["personal", "commercial", "life"] as const;

export type QuoteInsuranceType = (typeof quoteInsuranceTypes)[number];
export type QuoteProductSlug = (typeof productSelectionOptions)[number];

export const quoteInsuranceTypeOptions: ReadonlyArray<{
  value: QuoteInsuranceType;
  label: string;
  description: string;
}> = [
  {
    value: "personal",
    label: "Personal",
    description: "Home, auto, renters, condo, and umbrella coverage",
  },
  {
    value: "commercial",
    label: "Commercial",
    description: "Business and workers compensation coverage",
  },
  {
    value: "life",
    label: "Life",
    description: "Life insurance for the people who depend on you",
  },
];

export const quoteProductOptionsByInsuranceType: Record<
  QuoteInsuranceType,
  readonly QuoteProductSlug[]
> = {
  personal: ["home", "auto", "renters", "condo", "umbrella", "other"],
  commercial: [
    "business",
    "general-liability",
    "workers-comp",
    "commercial-property",
    "commercial-auto",
    "professional-liability",
    "specialty-coverage",
  ],
  life: ["life"],
};

export const defaultQuoteProductByInsuranceType: Record<
  QuoteInsuranceType,
  QuoteProductSlug
> = {
  personal: "home",
  commercial: "business",
  life: "life",
};

const commercialProductSlugs = new Set<ProductSlug>(
  quoteProductOptionsByInsuranceType.commercial,
);

export function getQuoteInsuranceTypeForProduct(
  product: ProductSlug,
): QuoteInsuranceType {
  if (product === "life") return "life";
  if (commercialProductSlugs.has(product)) return "commercial";
  return "personal";
}

export function isQuoteProductForInsuranceType(
  product: ProductSlug,
  insuranceType: QuoteInsuranceType,
): boolean {
  return quoteProductOptionsByInsuranceType[insuranceType].some(
    (allowedProduct) => allowedProduct === product,
  );
}
