import { clsx, type ClassValue } from "clsx";

export const siteUrl = "https://allsberryagency.com";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
