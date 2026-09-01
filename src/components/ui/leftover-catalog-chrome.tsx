import type { ReactNode } from "react";

type LeftoverCatalogNoticeProps = {
  children: ReactNode;
};

export function LeftoverCatalogNotice({ children }: LeftoverCatalogNoticeProps) {
  return (
    <div
      role="status"
      className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm text-amber-800"
    >
      {children}
    </div>
  );
}

type LeftoverCatalogContextProps = {
  children: ReactNode;
};

export function LeftoverCatalogContext({ children }: LeftoverCatalogContextProps) {
  return (
    <div className="rounded-2xl border border-blue/12 bg-blue-light px-4 py-3 text-sm font-semibold text-gray-900">
      {children}
    </div>
  );
}

type LeftoverCatalogEmptyProps = {
  children: ReactNode;
  title: string;
};

export function LeftoverCatalogEmpty({ children, title }: LeftoverCatalogEmptyProps) {
  return (
    <div className="rounded-[1.75rem] border border-gray-100 bg-white px-6 py-10 text-center shadow-[0_18px_46px_-36px_rgba(0,32,92,0.25)]">
      <p className="font-display text-xl font-bold text-navy">{title}</p>
      <p className="mt-3 text-sm leading-7 text-gray-600">{children}</p>
    </div>
  );
}
