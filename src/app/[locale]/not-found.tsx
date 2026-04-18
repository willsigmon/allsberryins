import Link from "next/link";

import { agency } from "@/lib/site-data";

const popularLinks = [
  { label: "Get a quote", href: "/quote", desc: "Home, auto, business, life" },
  { label: "Meet the team", href: "/about", desc: "Our Corona, CA agents" },
  { label: "Proof of insurance", href: "/evidence-of-insurance", desc: "Certificates & COIs" },
  { label: "Carrier partners", href: "/carriers", desc: "20+ carriers shopped" },
  { label: "Blog & guides", href: "/blog", desc: "Coverage insights" },
  { label: "Contact us", href: "/contact", desc: "Talk to a person" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-white px-4 pt-32 pb-16">
      <div className="w-full max-w-3xl rounded-[2.5rem] border border-gray-100 bg-gray-50 p-10 text-center shadow-[0_30px_70px_-52px_rgba(0,32,92,0.45)]">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue">
          Page not found
        </p>
        <h1 className="mt-5 font-display text-4xl font-extrabold text-gray-900">
          Looks like this page isn&apos;t here.
        </h1>
        <p className="mt-4 text-lg leading-8 text-gray-600">
          The link might be outdated, or it may have moved. Here&apos;s where most visitors
          head next — or give us a call at{" "}
          <a href={agency.phoneHref} className="font-semibold text-blue">
            {agency.phone}
          </a>
          .
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-red px-6 py-3 text-base font-bold text-white transition hover:bg-red-hover"
          >
            Go Home
          </Link>
          <Link
            href="/quote"
            className="inline-flex items-center justify-center rounded-full border border-gray-200 px-6 py-3 text-base font-bold text-gray-900 transition hover:border-blue hover:text-blue"
          >
            Start a Quote
          </Link>
        </div>

        <div className="mt-10 grid gap-3 text-left sm:grid-cols-2">
          {popularLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-start gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 transition hover:border-blue/40 hover:bg-blue/5"
            >
              <span className="mt-1 h-2 w-2 rounded-full bg-blue group-hover:bg-red" />
              <span className="flex flex-col">
                <span className="text-sm font-semibold text-navy group-hover:text-blue">
                  {item.label}
                </span>
                <span className="text-xs text-gray-500">{item.desc}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
