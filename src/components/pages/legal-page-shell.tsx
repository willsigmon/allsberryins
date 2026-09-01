import type { ReactNode } from "react";

import { Link } from "@/i18n/navigation";

type LegalPageShellProps = {
  title: string;
  updatedOn: string;
  children: ReactNode;
};

export function LegalPageShell({ title, updatedOn, children }: LegalPageShellProps) {
  return (
    <div className="bg-white pt-32">
      <div className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm font-semibold text-blue hover:text-navy">
          &larr; Back
        </Link>
        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-gray-500">{updatedOn}</p>
        <div className="mt-8 space-y-8 text-base leading-8 text-gray-600">{children}</div>
      </div>
    </div>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-lg font-bold text-gray-900">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
