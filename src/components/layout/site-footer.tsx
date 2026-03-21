import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Lock, Mail, MapPin, MessageSquare, Phone, ShieldCheck } from "lucide-react";

import { agency, footerProducts, quickLinks } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/media/brand/aia-logo.png"
              alt="Allsberry Insurance Agency logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain brightness-0 invert"
            />
            <h2 className="font-display text-2xl font-extrabold tracking-tight">Allsberry Insurance Agency</h2>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/75">
            Personalized home, auto, life, and business insurance solutions for families and companies across Southern California.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <SocialLink href={agency.socials.facebook} label="Facebook">
              <Facebook className="h-4 w-4" />
            </SocialLink>
            <SocialLink href={agency.socials.instagram} label="Instagram">
              <Instagram className="h-4 w-4" />
            </SocialLink>
            <SocialLink href={agency.socials.linkedin} label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </SocialLink>
          </div>
        </div>

        <FooterColumn title="Quick Links">
          {quickLinks.map((link) => (
            <FooterTextLink key={link.label} href={link.href}>
              {link.label}
            </FooterTextLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Products">
          {footerProducts.map((link) => (
            <FooterTextLink key={link.label} href={link.href}>
              {link.label}
            </FooterTextLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Contact Info">
          <div className="space-y-4 text-sm text-white/75">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white" />
              <div>
                <p>{agency.addressLine1}</p>
                <p>{agency.cityStateZip}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-white" />
              <div>
                <Link href={agency.phoneHref} className="transition hover:text-white">
                  {agency.phone}
                </Link>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-white/60">
                  <MessageSquare className="h-3 w-3" />
                  Calls & texts accepted
                </div>
                <p className="mt-1">{agency.hours}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white" />
              <Link href={agency.emailHref} className="transition hover:text-white">
                Email us
              </Link>
            </div>
          </div>
        </FooterColumn>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Allsberry Insurance Agency. All rights reserved.</p>
            <p>{agency.ownerLicense} • {agency.agencyLicense}</p>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-white/50">
            <Link
              href="https://www.farmers.com/privacy-center/?Agent_Code=993005&Source_Indicator=AP"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="https://www.farmers.com/accessibility/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
            >
              Accessibility
            </Link>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="inline-flex items-center gap-1.5 text-white/45">
              <Lock className="h-3 w-3" />
              SSL Encrypted
            </span>
            <span className="inline-flex items-center gap-1.5 text-white/45">
              <ShieldCheck className="h-3 w-3" />
              WCAG Accessible
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
};

function FooterColumn({ title, children }: FooterColumnProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-white/60">{title}</h3>
      <div className="mt-5 grid gap-3">{children}</div>
    </div>
  );
}

function FooterTextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm text-white/75 transition hover:text-white">
      {children}
    </Link>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-white/30 hover:bg-white/8 hover:text-white"
    >
      {children}
    </Link>
  );
}
