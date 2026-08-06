import Link from "next/link";
import { portfolioData } from "@/lib/data";
import type { ScreenProps } from "@/lib/deck";

export default function Contact({ scrollMode }: ScreenProps) {
  const {
    email,
    socials,
    contactHeadline,
    contactHighlight,
    contactSubtext,
    resumeUrl,
    name,
  } = portfolioData;

  return (
    <div
      className={`flex w-full items-center justify-center ${scrollMode ? "" : "h-full"}`}
    >
      <div className="max-w-200 text-center">
        <p className="mb-5 font-mono text-[11px] tracking-[3px] text-accent sm:text-xs">
          06 — CONTACT
        </p>

        <h2 className="text-contact font-display font-semibold leading-[1.04] tracking-[-0.02em] text-pretty text-text">
          {contactHeadline}{" "}
          <span className="bg-linear-to-r from-accent to-accent2 bg-clip-text text-transparent">
            {contactHighlight}
          </span>
          .
        </h2>

        <p className="mx-auto mt-5 max-w-120 text-[15px] leading-relaxed text-pretty text-text-muted sm:text-base">
          {contactSubtext}
        </p>

        <div className="mt-8 flex justify-center">
          <a
            href={`mailto:${email}`}
            className="rounded-full bg-accent px-6 py-3.5 font-display text-sm font-semibold text-bg shadow-[0_10px_34px_color-mix(in_oklab,var(--color-accent)_35%,transparent)] transition-transform hover:-translate-y-0.5 hover:brightness-110 sm:px-7.5 sm:text-[15px]"
          >
            {email}
          </a>
        </div>

        <nav
          aria-label="Elsewhere"
          className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3"
        >
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-[1.5px] text-text-muted transition-colors hover:text-accent"
            >
              {social.label} ↗
            </a>
          ))}
          <Link
            href={resumeUrl}
            className="font-mono text-[11px] tracking-[1.5px] text-accent transition-opacity hover:opacity-80"
          >
            RÉSUMÉ / CV ↓
          </Link>
        </nav>

        <p className="mt-14 font-mono text-[10.5px] tracking-[2px] text-text-dim/60">
          © {new Date().getFullYear()} {name.toUpperCase()} · BUILT IN THE
          BROWSER
        </p>
      </div>
    </div>
  );
}
