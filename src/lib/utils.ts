import { clsx, type ClassValue } from "clsx";

export const siteUrl = "https://allsberryagency.com";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}
