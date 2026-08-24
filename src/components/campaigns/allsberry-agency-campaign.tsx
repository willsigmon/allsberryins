"use client";

import Image from "next/image";
import { Clock3, MapPin, Phone, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Link } from "@/i18n/navigation";
import { agency } from "@/lib/site-data";
import { allsberryCampaign } from "@/lib/allsberry-campaign";

import styles from "./allsberry-agency-campaign.module.css";

declare global {
  interface Navigator {
    readonly globalPrivacyControl?: boolean;
  }

}

type AllsberryAgencyCampaignProps = {
  callRailScriptUrl?: string;
  googleAdsSendTo?: string;
  metaPixelId?: string;
};

type QuoteOption = (typeof allsberryCampaign.quoteOptions)[number] & {
  readonly badge?: string;
};

function allowsCampaignTracking() {
  return navigator.globalPrivacyControl !== true && navigator.doNotTrack !== "1";
}

function reportCallIntent(location: string, googleAdsSendTo?: string) {
  window.gtag?.("event", "campaign_call_click", {
    campaign: "allsberry-agency",
    location,
  });

  if (googleAdsSendTo) {
    window.gtag?.("event", "conversion", { send_to: googleAdsSendTo });
  }
}

function CallAction({
  location,
  googleAdsSendTo,
  sticky = false,
}: {
  location: string;
  googleAdsSendTo?: string;
  sticky?: boolean;
}) {
  return (
    <a
      href={allsberryCampaign.phoneHref}
      data-campaign-call
      data-cta={location}
      onClick={() => reportCallIntent(location, googleAdsSendTo)}
      className={sticky ? styles.heroCta + " " + styles.stickyCta : styles.heroCta}
      aria-label={"Call Allsberry Insurance Agency at " + allsberryCampaign.phone}
    >
      <Phone className={styles.ctaIcon} aria-hidden="true" />
      <span className={styles.ctaText}>
        Call {allsberryCampaign.phone}
        <small className={styles.ctaSubtext}>Free quote · Most calls under 10 minutes</small>
      </span>
    </a>
  );
}

function QuoteIcon({ icon }: { icon: QuoteOption["icon"] }) {
  if (icon === "bundle") {
    return (
      <span className={styles.callIcon + " " + styles.dualIcon} aria-hidden="true">
        <span>🏠</span>
        <span>🚗</span>
      </span>
    );
  }

  return (
    <span className={styles.callIcon} aria-hidden="true">
      {icon === "home" ? "🏠" : "🚗"}
    </span>
  );
}

function QuoteRow({
  option,
  googleAdsSendTo,
}: {
  option: QuoteOption;
  googleAdsSendTo?: string;
}) {
  const trackingLocation = option.icon === "home"
    ? "row-home"
    : option.icon === "auto"
      ? "row-auto"
      : "row-bundle";
  const rowClassName = option.icon === "bundle"
    ? styles.callRow + " " + styles.bundleRow
    : styles.callRow;

  return (
    <a
      href={allsberryCampaign.phoneHref}
      data-campaign-call
      data-cta={trackingLocation}
      onClick={() => reportCallIntent(trackingLocation, googleAdsSendTo)}
      className={rowClassName}
      aria-label={"Call for " + option.title}
    >
      <QuoteIcon icon={option.icon} />
      <span className={styles.callCopy}>
        <strong className={styles.callTitle}>{option.title}</strong>
        <span className={styles.callDescription}>{option.description}</span>
        {option.badge ? <span className={styles.badge}>{option.badge}</span> : null}
      </span>
      <span className={styles.dial}>
        <Phone size={15} aria-hidden="true" />
        Call
      </span>
    </a>
  );
}

export function AllsberryAgencyCampaign({
  callRailScriptUrl,
  googleAdsSendTo,
  metaPixelId,
}: AllsberryAgencyCampaignProps) {
  const currentYear = new Date().getFullYear();
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const [showStickyCall, setShowStickyCall] = useState(false);

  useEffect(() => {
    const target = heroHeadingRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyCall(!entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!callRailScriptUrl || !allowsCampaignTracking()) {
      return;
    }

    const existingScript = document.getElementById("allsberry-callrail");
    if (existingScript) return;

    const script = document.createElement("script");
    script.id = "allsberry-callrail";
    script.async = true;
    script.src = callRailScriptUrl;
    document.head.appendChild(script);

    return () => script.remove();
  }, [callRailScriptUrl]);

  useEffect(() => {
    if (!metaPixelId || !allowsCampaignTracking()) {
      return;
    }

    const existingPixel = document.getElementById("allsberry-meta-pixel");
    if (existingPixel) return;

    const script = document.createElement("script");
    script.id = "allsberry-meta-pixel";
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);

    const pixelQueue = function (...args: unknown[]) {
      pixelQueue.queue.push(args);
    };
    pixelQueue.queue = [] as unknown[][];
    Object.assign(pixelQueue, { loaded: true, version: "2.0" });
    (window as typeof window & { fbq?: typeof pixelQueue }).fbq = pixelQueue;
    pixelQueue("init", metaPixelId);
    pixelQueue("track", "PageView");

    return () => script.remove();
  }, [metaPixelId]);

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo} aria-label="Allsberry Insurance Agency Inc">
          <Image
            src="/media/campaign/allsberry-logo.webp"
            alt="Allsberry Insurance Agency Inc"
            width={77}
            height={44}
            priority
            className={styles.logoMark}
          />
        </Link>
        <a
          href={allsberryCampaign.phoneHref}
          data-campaign-call
          data-cta="header"
          onClick={() => reportCallIntent("header", googleAdsSendTo)}
          className={styles.headerCall}
          aria-label={"Call Allsberry Insurance Agency at " + allsberryCampaign.phone}
        >
          <Phone className={styles.headerCallIcon} size={15} aria-hidden="true" />
          <span className={styles.headerCallFull}>Call an agent</span>
          <span className={styles.headerCallShort}>Call</span>
        </a>
      </header>

      <div id="campaign-main">
        <div className={styles.heroShell}>
          <section className={styles.heroCard} aria-labelledby="campaign-hero-heading">
            <div className={styles.heroCenter}>
              <h1 ref={heroHeadingRef} id="campaign-hero-heading" className={styles.heroTitle}>
                {allsberryCampaign.heroHeadline}
                <span className={styles.heroLocation}>{allsberryCampaign.heroLocation}</span>
              </h1>

              <p className={styles.heroSub}>{allsberryCampaign.heroDescription}</p>

              <CallAction location="hero" googleAdsSendTo={googleAdsSendTo} />

              <p className={styles.heroRating}>
                <span className={styles.ratingStars} aria-hidden="true">★★★★★</span>
                <strong>{allsberryCampaign.rating.value}</strong>
                <span aria-hidden="true">·</span>
                <span>{allsberryCampaign.rating.reviewCount} Google reviews</span>
              </p>

              <p className={styles.heroTrust}>Licensed California agent · No forms, no spam</p>

              <div className={styles.note} aria-label="Campaign savings note">
                <span className={styles.notePin} aria-hidden="true" />
                <p className={styles.noteText}>{allsberryCampaign.heroNote}</p>
              </div>
            </div>
          </section>
        </div>

        <section className={styles.section} aria-labelledby="carrier-heading">
          <div className={styles.wrap}>
            <h2 id="carrier-heading" className="sr-only">Carrier options</h2>
            <p className={styles.carriersText}>
              We shop your home rate with <strong>Top Rated Home Insurance Carriers</strong>.
            </p>
            <div className={styles.carrierStrip}>
              {allsberryCampaign.carrierLogos.map((carrier) => (
                <Image
                  key={carrier.name}
                  src={carrier.src}
                  alt={carrier.name}
                  width={120}
                  height={26}
                  loading="lazy"
                  className={styles.carrierLogo}
                />
              ))}
            </div>
            <p className={styles.carrierNote}>
              Carrier availability and eligibility vary by applicant, property, underwriting, and location.
            </p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="quote-heading">
          <div className={styles.wrap}>
            <h2 id="quote-heading" className={styles.sectionHeading}>What do you need a quote for?</h2>
            <p className={styles.sectionDescription}>Pick one and we&apos;ll pick up.</p>
            <div className={styles.callRows}>
              {allsberryCampaign.quoteOptions.map((option) => (
                <QuoteRow
                  key={option.title}
                  option={option}
                  googleAdsSendTo={googleAdsSendTo}
                />
              ))}
            </div>
          </div>
        </section>

        <div className={styles.band} aria-label="Allsberry campaign trust signals">
          <div className={styles.bandInner}>
            <span className={styles.bandItem}>
              <MapPin size={15} aria-hidden="true" />
              Corona, CA · Serving all of California
            </span>
            <span className={styles.bandItem}>
              <Users size={15} aria-hidden="true" />
              Licensed California agent
            </span>
            <span className={styles.bandItem}>
              <Clock3 size={15} aria-hidden="true" />
              Most calls under 10 minutes
            </span>
          </div>
        </div>

        <section className={styles.section} aria-labelledby="agent-heading">
          <div className={styles.wrap}>
            <h2 id="agent-heading" className="sr-only">Your local Allsberry agent</h2>
            <article className={styles.agentCard}>
              <Image
                src={allsberryCampaign.agent.image}
                alt="Erin Allsberry, licensed insurance agent in Corona, California"
                width={68}
                height={68}
                loading="lazy"
                className={styles.agentImage}
              />
              <div>
                <div className={styles.agentName}>{allsberryCampaign.agent.name}</div>
                <div className={styles.agentRole}>{allsberryCampaign.agent.role}</div>
                <p className={styles.agentCopy}>{allsberryCampaign.agent.description}</p>
              </div>
            </article>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="review-heading">
          <div className={styles.wrap}>
            <h2 id="review-heading" className={styles.sectionHeading}>What clients say</h2>
            <article className={styles.testimonialCard}>
              <div className={styles.stars} aria-label="5 out of 5 stars">★★★★★</div>
              <p className={styles.testimonialQuote}>&quot;{allsberryCampaign.testimonial.quote}&quot;</p>
              <div className={styles.whoRow}>
                <span className={styles.avatar} aria-hidden="true">B</span>
                <span>
                  <strong className={styles.whoName}>{allsberryCampaign.testimonial.author}</strong>
                  <span className={styles.whoRole}>{allsberryCampaign.testimonial.attribution}</span>
                </span>
              </div>
            </article>
          </div>
        </section>
      </div>

      <footer className={styles.footer}>
        <Link href="/" className={styles.logo + " " + styles.footerLogo} aria-label="Allsberry Insurance Agency Inc">
          <Image
            src="/media/campaign/allsberry-logo.webp"
            alt="Allsberry Insurance Agency Inc"
            width={98}
            height={56}
            loading="lazy"
            className={styles.logoMark}
          />
        </Link>
        <div>
          <a
            href={allsberryCampaign.phoneHref}
            data-campaign-call
            data-cta="footer"
            onClick={() => reportCallIntent("footer", googleAdsSendTo)}
            className={styles.footerCall}
          >
            {allsberryCampaign.phone}
          </a>
        </div>
        <div className={styles.footerMeta}>
          Licensed in California · Serving homeowners statewide
          <br />
          {agency.fullAddress}
        </div>
        <div className={styles.footerLegal}>
          *Savings of up to 35% are not guaranteed. Actual savings vary by individual, property, and carrier underwriting, and depend on your current coverage and premium.
          <br />
          © {currentYear} {agency.fullName}. All rights reserved. {agency.fullName} is a Farmers Insurance agency. Coverage is subject to terms, conditions, underwriting eligibility, and availability. Rates and discounts vary by individual and are not guaranteed.
          <br />
          <Link href="/privacy">Privacy Policy</Link>
          <span aria-hidden="true"> · </span>
          <Link href="/terms">Terms of Service</Link>
        </div>
      </footer>

      {showStickyCall ? (
        <div className={styles.stickyCall}>
          <CallAction location="sticky" googleAdsSendTo={googleAdsSendTo} sticky />
        </div>
      ) : null}
    </div>
  );
}
