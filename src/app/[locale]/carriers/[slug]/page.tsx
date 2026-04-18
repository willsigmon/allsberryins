import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { CtaBanner } from "@/components/sections/cta-banner";
import { StructuredData } from "@/components/seo/structured-data";
import { routing } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";
import { createBreadcrumbSchema } from "@/lib/seo";
import { agency, carrierPartners } from "@/lib/site-data";
import { absoluteUrl, slugify } from "@/lib/utils";

type Params = { params: Promise<{ locale: string; slug: string }> };

function getCarrierBySlug(slug: string) {
  return carrierPartners.find((carrier) => slugify(carrier.name) === slug);
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    carrierPartners.map((carrier) => ({ locale, slug: slugify(carrier.name) })),
  );
}

export async function generateMetadata({ params }: Params) {
  const { locale, slug } = await params;
  const carrier = getCarrierBySlug(slug);
  if (!carrier) {
    return createPageMetadata({
      title: "Carrier not found",
      description: "That carrier page could not be located.",
      path: `/carriers/${slug}`,
      locale,
    });
  }
  return createPageMetadata({
    title: `${carrier.name} Insurance in Corona & Southern California`,
    description: `Get ${carrier.name} home, auto, business, or life insurance through Allsberry Insurance Agency — an independent Corona, CA agency comparing ${carrier.name} with 20+ other carriers for the right fit.`,
    path: `/carriers/${slug}`,
    keywords: [
      `${carrier.name} insurance agent near me`,
      `${carrier.name} Corona CA`,
      `${carrier.name} California`,
      `independent ${carrier.name} agent`,
      `${carrier.name} home insurance`,
      `${carrier.name} auto insurance`,
    ],
    locale,
  });
}

export default async function CarrierPage({ params }: Params) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const carrier = getCarrierBySlug(slug);
  if (!carrier) notFound();

  const breadcrumb = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Carriers", path: "/carriers" },
    { name: carrier.name, path: `/carriers/${slug}` },
  ]);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${carrier.name} insurance through Allsberry Insurance Agency`,
    provider: { "@id": absoluteUrl("/#organization") },
    areaServed: "Southern California",
    serviceType: `${carrier.name} insurance`,
    url: absoluteUrl(`/carriers/${slug}`),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      seller: { "@id": absoluteUrl("/#organization") },
    },
  };

  return (
    <div className="bg-white pt-28 pb-24">
      <StructuredData data={[breadcrumb, serviceSchema]} />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-sm text-gray-500"
        >
          <Link href="/" className="hover:text-blue">
            Home
          </Link>
          <span>/</span>
          <Link href="/carriers" className="hover:text-blue">
            Carriers
          </Link>
          <span>/</span>
          <span className="font-semibold text-navy">{carrier.name}</span>
        </nav>

        <header className="mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <span className="flex h-24 w-36 items-center justify-center rounded-3xl border border-gray-100 bg-gray-50 p-4">
            <Image
              src={carrier.logoSrc}
              alt={`${carrier.name} logo`}
              width={132}
              height={72}
              className="h-14 w-auto object-contain"
            />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue">
              Carrier partner
            </p>
            <h1 className="mt-2 text-4xl font-bold text-navy sm:text-5xl">
              {carrier.name} insurance in Corona &amp; Southern California
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-gray-600">
              As an independent agency, Allsberry places coverage with {carrier.name} when
              it&rsquo;s the right fit — and compares it against 20+ other carriers so
              you&rsquo;re not locked into one quote.
            </p>
          </div>
        </header>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_18px_46px_-36px_rgba(0,32,92,0.25)]">
            <h2 className="text-lg font-bold text-navy">How we use {carrier.name}</h2>
            <p className="mt-3 text-sm text-gray-600">
              Some carriers are strong on homeowners. Others on small business,
              commercial autos, umbrellas, or life. We match your situation to the carrier
              whose underwriting and price make sense for you — and revisit at renewal when
              markets shift.
            </p>
          </section>
          <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_18px_46px_-36px_rgba(0,32,92,0.25)]">
            <h2 className="text-lg font-bold text-navy">Talk to a real person</h2>
            <p className="mt-3 text-sm text-gray-600">
              Call the office at{" "}
              <a href={agency.phoneHref} className="font-semibold text-blue">
                {agency.phone}
              </a>{" "}
              or request a comparison quote online. Either way, you&rsquo;ll get a
              licensed agent — not a call-center script.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={`/quote?carrier=${slug}`}
                className="inline-flex items-center justify-center rounded-full bg-red px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-hover"
              >
                Compare {carrier.name} quote
              </Link>
              <a
                href={agency.phoneHref}
                className="inline-flex items-center justify-center rounded-full border border-navy/20 px-5 py-2.5 text-sm font-semibold text-navy hover:border-navy/40"
              >
                Call {agency.phone}
              </a>
            </div>
          </section>
        </div>

        <section className="mt-14 rounded-3xl bg-navy px-6 py-10 text-white sm:px-10">
          <h2 className="text-2xl font-bold">
            Why go through an independent agent for {carrier.name}?
          </h2>
          <ul className="mt-5 grid gap-3 text-sm text-white/85 sm:grid-cols-2">
            <li>
              One comparison across {carrier.name} and 20+ other carriers — not a single
              direct quote.
            </li>
            <li>
              Local advocacy at claim time; we help you work with the {carrier.name}{" "}
              adjuster directly.
            </li>
            <li>
              Free annual coverage review so your policy keeps up with life changes.
            </li>
            <li>
              No pressure to bundle — if {carrier.name} only makes sense for one line, we
              say so.
            </li>
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-bold text-navy">Other carriers we work with</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {carrierPartners
              .filter((candidate) => candidate.name !== carrier.name)
              .slice(0, 6)
              .map((related) => {
                const relatedSlug = slugify(related.name);
                return (
                  <Link
                    key={related.name}
                    href={`/carriers/${relatedSlug}`}
                    className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 text-sm font-semibold text-navy transition hover:border-blue/40 hover:text-blue"
                  >
                    <Image
                      src={related.logoSrc}
                      alt=""
                      width={36}
                      height={20}
                      className="h-5 w-auto object-contain"
                    />
                    {related.name}
                  </Link>
                );
              })}
          </div>
          <Link
            href="/carriers"
            className="mt-5 inline-flex text-sm font-semibold text-blue hover:text-red"
          >
            See every carrier partner →
          </Link>
        </section>
      </div>
      <div className="mt-16">
        <CtaBanner />
      </div>
    </div>
  );
}
