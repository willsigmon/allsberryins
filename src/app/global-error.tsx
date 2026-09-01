"use client";

import { agency } from "@/lib/site-data";

import "./globals.css";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue">
            Something broke
          </p>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-navy">
            This page did not load.
          </h1>
          <p className="mt-4 text-base leading-7 text-gray-600">
            We do not invent a ticket number. Try again, go home, or call or email
            the office.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-blue"
            >
              Try again
            </button>
            <button
              type="button"
              onClick={() => {
                window.location.assign("/");
              }}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-gray-200 px-5 py-3 text-sm font-bold text-gray-900 transition hover:border-blue hover:text-blue"
            >
              Go home
            </button>
            <a
              href={agency.phoneHref}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-gray-200 px-5 py-3 text-sm font-bold text-gray-900 transition hover:border-blue hover:text-blue"
            >
              Call {agency.phone}
            </a>
            <a
              href={agency.emailHref}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-gray-200 px-5 py-3 text-sm font-bold text-gray-900 transition hover:border-blue hover:text-blue"
            >
              Email {agency.email}
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
