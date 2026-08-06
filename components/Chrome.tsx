"use client";

import { useEffect, useRef } from "react";
import { portfolioData } from "@/lib/data";

interface ChromeProps {
  index: number;
  count: number;
  labels: string[];
  scrollMode: boolean;
  onNavigate: (target: number) => void;
}

export default function Chrome({
  index,
  count,
  labels,
  scrollMode,
  onNavigate,
}: ChromeProps) {
  const { email, resumeUrl, availability } = portfolioData;
  const railRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!scrollMode) return;
    const rail = railRef.current;
    const active = rail?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!rail || !active) return;

    const target = active.offsetLeft - (rail.clientWidth - active.offsetWidth) / 2;
    rail.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [index, scrollMode]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-60 flex items-center justify-between gap-3 px-5 pb-4 pt-[calc(1rem+env(safe-area-inset-top))] sm:px-8 sm:pb-5 sm:pt-[calc(1.375rem+env(safe-area-inset-top))]">
        <button
          type="button"
          onClick={() => onNavigate(0)}
          className="cursor-pointer font-mono text-sm tracking-[2px] text-text transition-colors hover:text-accent"
        >
          AK<span className="text-accent">∴</span>
        </button>

        <div className="flex items-center gap-3 sm:gap-5">
          <span className="hidden items-center gap-2 font-mono text-[11px] tracking-[2px] text-text-muted xl:flex">
            <span className="size-1.75 shrink-0 rounded-full bg-accent animate-pulse-dot" />
            {availability}
          </span>

          <a
            href={resumeUrl}
            className="hidden rounded-full border border-line-strong px-4 py-2 font-mono text-[11px] tracking-[2px] text-text-muted transition-colors hover:border-accent hover:text-accent sm:block"
          >
            CV ↓
          </a>

          <a
            href={`mailto:${email}`}
            className="rounded-full bg-accent px-4 py-2 font-mono text-[10px] font-medium tracking-[1.5px] text-bg transition-[filter,transform] hover:brightness-110 sm:px-4.5 sm:text-[11px] sm:tracking-[2px]"
          >
            EMAIL ME
          </a>
        </div>
      </header>

      <nav
        ref={railRef}
        aria-label="Sections"
        className={
          scrollMode
            ? "no-scrollbar fixed inset-x-0 bottom-0 z-60 flex flex-row gap-4 overflow-x-auto border-t border-line bg-bg/85 px-4 pb-[calc(0.875rem+env(safe-area-inset-bottom))] pt-3.5 backdrop-blur-xl"
            :
              "fixed left-7.5 top-1/2 z-60 flex -translate-y-1/2 flex-col gap-3.75"
        }
      >
        {labels.map((label, i) => {
          const isActive = i === index;
          return (
            <button
              key={label}
              type="button"
              onClick={() => onNavigate(i)}
              aria-current={isActive ? "true" : undefined}
              className={`flex shrink-0 cursor-pointer items-center gap-2.5 whitespace-nowrap font-mono text-[10px] tracking-[1.5px] transition-colors duration-400 sm:text-[11px] sm:tracking-[2px] ${
                isActive ? "text-accent" : "text-text-dim hover:text-text"
              }`}
            >
              <span
                aria-hidden="true"
                className={`h-px transition-all duration-400 ${
                  isActive ? "w-7.5 bg-accent" : "w-3 bg-text-dim"
                }`}
              />
              {label}
            </button>
          );
        })}
      </nav>

      {!scrollMode && (
        <div className="fixed bottom-6.5 right-7.5 z-60 flex items-center gap-4">
          <button
            type="button"
            onClick={() => onNavigate(index - 1)}
            disabled={index === 0}
            aria-label="Previous section"
            className="grid size-10 cursor-pointer place-items-center rounded-full border border-line-strong bg-surface/55 text-base leading-none text-text-muted transition-colors hover:border-accent hover:text-accent disabled:cursor-default disabled:opacity-30 disabled:hover:border-line-strong disabled:hover:text-text-muted"
          >
            ‹
          </button>
          <span
            aria-hidden="true"
            className="font-mono text-xs tracking-[2px] text-text-dim tabular-nums"
          >
            {String(index).padStart(2, "0")} / {String(count - 1).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => onNavigate(index + 1)}
            disabled={index === count - 1}
            aria-label="Next section"
            className="grid size-10 cursor-pointer place-items-center rounded-full border border-line-strong bg-surface/55 text-base leading-none text-text-muted transition-colors hover:border-accent hover:text-accent disabled:cursor-default disabled:opacity-30 disabled:hover:border-line-strong disabled:hover:text-text-muted"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
