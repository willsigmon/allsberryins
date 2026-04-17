import { Star } from "lucide-react";

import { agency } from "@/lib/site-data";

type ReviewRequestProps = {
  /** When shown after a form submission. Defaults to generic site-wide wording. */
  variant?: "post-submit" | "inline";
};

/**
 * Prompts happy clients to leave a Google review. Links straight to the
 * Google Maps listing so the reviewer lands on the agency's profile.
 */
export function ReviewRequest({ variant = "inline" }: ReviewRequestProps) {
  const heading =
    variant === "post-submit"
      ? "Help a neighbor find us."
      : "Happy with our service?";
  const body =
    variant === "post-submit"
      ? "While you wait for us to reply, would you mind sharing a quick review? It helps other Corona families find a real local agency."
      : "A quick Google review helps other Southern California families find us. It takes under a minute and means a lot to the team.";

  return (
    <aside
      className="rounded-3xl border border-blue/15 bg-blue-light/40 p-6 text-left shadow-[0_24px_60px_-50px_rgba(0,32,92,0.4)] sm:p-7"
      aria-label="Leave a Google review"
    >
      <div className="flex items-start gap-4">
        <div className="flex shrink-0 items-center gap-0.5 rounded-full bg-white px-3 py-1.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]"
              aria-hidden="true"
            />
          ))}
        </div>
        <div>
          <h3 className="text-lg font-bold text-navy">{heading}</h3>
          <p className="mt-1.5 text-sm text-gray-600">{body}</p>
          <a
            href={agency.googleReviewUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-red px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-hover"
          >
            Leave a Google review
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
