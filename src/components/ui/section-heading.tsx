import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Use h1 for the primary page heading (SEO). Defaults to h2 for section-level headings. */
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: HeadingTag = "h2",
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue">{eyebrow}</p>
      ) : null}
      <HeadingTag className="mt-3 font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        {title}
      </HeadingTag>
      <div className="heading-gradient mx-auto mt-4 h-1 w-16 rounded-full" style={align === "left" ? { marginLeft: 0 } : undefined} />
      {description ? <p className="mt-4 text-lg leading-8 text-gray-600">{description}</p> : null}
    </div>
  );
}
