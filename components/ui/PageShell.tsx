import Link from "next/link";
import type { ReactNode } from "react";
import { portfolioData } from "@/lib/data";

interface PageShellProps {
  num: string;
  title: string;
  intro?: string;
  children: ReactNode;
  bare?: boolean;
}

export default function PageShell({
  num,
  title,
  intro,
  children,
  bare = false,
}: PageShellProps) {
  const { name, email } = portfolioData;

  return (
    <div className="min-h-dvh bg-bg">
      <header className="mx-auto flex max-w-280 items-center justify-between gap-4 px-5 pb-8 pt-[calc(1.5rem+env(safe-area-inset-top))] sm:px-8">
        <Link
          href="/"
          className="font-mono text-sm tracking-[2px] text-text transition-colors hover:text-accent"
        >
          AK<span className="text-accent">∴</span>
        </Link>
        <Link
          href="/"
          className="font-mono text-[11px] tracking-[2px] text-text-dim transition-colors hover:text-accent"
        >
          ← BACK TO DECK
        </Link>
      </header>

      <main className="mx-auto max-w-280 px-5 pb-24 sm:px-8">
        <div className="mb-4 flex items-center gap-3 sm:gap-4">
          <span className="font-mono text-[13px] text-accent">{num}</span>
          <span aria-hidden="true" className="h-px w-11 bg-line-strong" />
          <h1 className="text-section font-display font-semibold tracking-[-0.02em] text-text">
            {title}
          </h1>
        </div>

        {intro && (
          <p className="mb-10 max-w-155 text-[15px] leading-relaxed text-pretty text-text-muted">
            {intro}
          </p>
        )}

        {children}
      </main>

      {!bare && (
        <footer className="mx-auto flex max-w-280 flex-wrap items-center justify-between gap-4 border-t border-line px-5 py-8 sm:px-8">
          <p className="font-mono text-[10.5px] tracking-[2px] text-text-dim/60">
            © {new Date().getFullYear()} {name.toUpperCase()}
          </p>
          <a
            href={`mailto:${email}`}
            className="font-mono text-[11px] tracking-[1.5px] text-accent transition-opacity hover:opacity-80"
          >
            {email} ↗
          </a>
        </footer>
      )}
    </div>
  );
}
