import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        {title}
      </h2>
      {description ? <p className="mt-4 text-lg leading-8 text-gray-600">{description}</p> : null}
    </div>
  );
}
