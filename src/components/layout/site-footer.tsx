"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Lock, Mail, MapPin, MessageSquare, Phone, ShieldCheck } from "lucide-react";

import { tap } from "@/lib/haptics";
import { agency, footerProducts, quickLinks } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="footer-mesh text-white">
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
            Corona-based home, auto, life, and business insurance guidance for families and companies across Southern California.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <SocialLink href={agency.socials.facebook} label="Facebook">
              <Facebook className="h-4 w-4" />
            </SocialLink>
            <SocialLink href={agency.socials.instagram} label="Instagram">
              <Instagram className="h-4 w-4" />
            </SocialLink>
            <SocialLink href={agency.socials.google} label="Google Reviews">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
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
              <Link
                href="https://www.google.com/maps/search/?api=1&query=355+N+Sheridan+St+Ste+100+Corona+CA+92878"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-white"
              >
                <p>{agency.addressLine1}</p>
                <p>{agency.cityStateZip}</p>
              </Link>
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

      <div className="border-t border-white/10" style={{ borderImage: "linear-gradient(90deg, transparent 0%, rgba(0,102,179,0.3) 25%, rgba(218,41,28,0.2) 50%, rgba(245,197,24,0.25) 75%, transparent 100%) 1" }}>
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
      onClick={() => { tap(); }}
      className="social-glow inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:text-white"
    >
      {children}
    </Link>
  );
}
