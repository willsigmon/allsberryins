import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type LeftoverNoticeProps = {
  children: ReactNode;
  className?: string;
};

export function LeftoverNotice({ children, className }: LeftoverNoticeProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm text-amber-800",
        className,
      )}
      role="status"
    >
      {children}
    </div>
  );
}
