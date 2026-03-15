import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function absoluteUrl(path = "/") {
  return new URL(path, "https://allsberryagency.com").toString();
}
