import {
  BadgeCheck,
  Briefcase,
  Building2,
  Car,
  HardHat,
  HeartPulse,
  Home,
  KeyRound,
  Shield,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Truck,
  Umbrella,
  Users,
  Warehouse,
} from "lucide-react";

import type { IconName } from "@/lib/site-data";

const iconMap = {
  house: Home,
  car: Car,
  key: KeyRound,
  heartPulse: HeartPulse,
  umbrella: Umbrella,
  building2: Building2,
  shield: Shield,
  hardHat: HardHat,
  warehouse: Warehouse,
  truck: Truck,
  briefcase: Briefcase,
  sparkles: Sparkles,
  shieldCheck: ShieldCheck,
  slidersHorizontal: SlidersHorizontal,
  users: Users,
  star: Star,
  badgeCheck: BadgeCheck,
} as const;

export function getIcon(icon: IconName) {
  return iconMap[icon];
}
