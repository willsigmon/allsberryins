import Link from "next/link";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#00205c_0%,#00448f_54%,#0066b3_100%)] py-20 text-white">
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 120"
        className="absolute inset-x-0 top-0 h-16 w-full -translate-y-1/2 text-white"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,96L60,90.7C120,85,240,75,360,74.7C480,75,600,85,720,90.7C840,96,960,96,1080,85.3C1200,75,1320,53,1380,42.7L1440,32L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        />
      </svg>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] border border-white/12 bg-white/6 px-6 py-12 backdrop-blur-sm sm:px-10 lg:flex lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/70">Free quote</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/78">
              Get a free quote today and discover how much you could save.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/14 bg-white/8 px-4 py-2 text-sm font-semibold text-white/88">
                Home • Auto • Life • Business
              </span>
              <span className="rounded-full border border-white/14 bg-white/8 px-4 py-2 text-sm font-semibold text-white/88">
                Corona & Inland Empire
              </span>
            </div>
          </div>
          <div className="mt-8 lg:mt-0">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center rounded-full bg-red px-7 py-4 text-base font-bold text-white transition hover:bg-red-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-red"
            >
              Get Your Free Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
