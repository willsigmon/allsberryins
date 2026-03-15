import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-white px-4 pt-32">
      <div className="max-w-xl rounded-[2.5rem] border border-gray-100 bg-gray-50 p-10 text-center shadow-[0_30px_70px_-52px_rgba(0,32,92,0.45)]">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue">Page not found</p>
        <h1 className="mt-5 font-display text-4xl font-extrabold text-gray-900">Looks like this page isn&apos;t here.</h1>
        <p className="mt-4 text-lg leading-8 text-gray-600">
          Let&apos;s get you back to a cleaner path — the homepage, the quote flow, or the team page.
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
            className="inline-flex items-center justify-center rounded-full border border-gray-200 px-6 py-3 text-base font-bold text-navy transition hover:border-blue hover:text-blue"
          >
            Start a Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
