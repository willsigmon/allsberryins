import { clsx, type ClassValue } from "clsx";

export const siteUrl = "https://allsberryagency.vercel.app";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}
