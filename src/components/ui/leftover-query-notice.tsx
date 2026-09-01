import type { ReactNode } from "react";

type LeftoverQueryNoticeProps = {
  children: ReactNode;
};

export function LeftoverQueryNotice({ children }: LeftoverQueryNoticeProps) {
  return (
    <div
      role="status"
      className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm text-amber-800"
    >
      {children}
    </div>
  );
}
