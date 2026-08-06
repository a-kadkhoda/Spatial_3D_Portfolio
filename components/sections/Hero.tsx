"use client";

import { useRef } from "react";
import { portfolioData } from "@/lib/data";
import type { ScreenProps } from "@/lib/deck";
import { gsap, useGSAP } from "@/lib/gsap";

const CHIP_SLOTS = [
  { depth: 0.07, className: "left-[calc(50%-620px)] top-[24%]", delay: "0s", dur: "6s" },
  { depth: 0.1, className: "right-[calc(50%-630px)] top-[30%]", delay: ".8s", dur: "7.2s" },
  { depth: 0.12, className: "left-[calc(50%-580px)] bottom-[22%]", delay: "1.4s", dur: "6.6s" },
  { depth: 0.08, className: "right-[calc(50%-600px)] bottom-[26%]", delay: ".4s", dur: "5.8s" },
];

export default function Hero({ scrollMode, goTo }: ScreenProps) {
  const { kicker, name, bio, heroChips } = portfolioData;
  const [first, ...rest] = name.split(" ");
  const last = rest.join(" ");
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-rise]", {
          y: 26,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.1,
          stagger: 0.15,
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className="flex h-full w-full items-center justify-center"
    >
      {!scrollMode &&
        heroChips.slice(0, CHIP_SLOTS.length).map((chip, i) => {
          const slot = CHIP_SLOTS[i];
          return (
            <div
              key={chip}
              aria-hidden="true"
              data-depth={slot.depth}
              className={`pointer-events-none absolute z-1 hidden min-[1290px]:block ${slot.className}`}
            >
              <div
                className="flex items-center gap-2 whitespace-nowrap rounded-full border border-line-strong bg-surface/70 px-3.75 py-2.25 font-mono text-xs text-text-muted shadow-[0_10px_34px_rgba(0,0,0,0.4)] animate-floaty"
                style={{ animationDelay: slot.delay, animationDuration: slot.dur }}
              >
                <span
                  className={`size-1.5 rounded-full ${i % 2 === 0 ? "bg-accent" : "bg-accent2"}`}
                />
                {chip}
              </div>
            </div>
          );
        })}

      <div className="relative z-2 max-w-245 text-center">
        <p data-rise
          className="mb-5 font-mono text-[11px] tracking-[2px] text-accent sm:mb-6.5 sm:text-xs sm:tracking-[3px]">
          {kicker}
        </p>

        <h1 data-rise
          className="text-hero font-display font-semibold leading-[0.98] tracking-[-0.03em] text-text">
          {first}
          <br />
          <span className="bg-linear-to-r from-text via-accent to-accent2 bg-clip-text text-transparent">
            {last}
          </span>
        </h1>

        <p data-rise
          className="mx-auto mt-6 max-w-140 text-base leading-relaxed text-pretty text-text-muted sm:mt-7 sm:text-lg">
          {bio}
        </p>

        <div data-rise
          className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-9 sm:gap-3.5">
          <button
            type="button"
            onClick={() => goTo(1)}
            className="cursor-pointer rounded-full bg-accent px-6 py-3.5 font-display text-sm font-semibold text-bg shadow-[0_10px_34px_color-mix(in_oklab,var(--color-accent)_35%,transparent)] transition-transform hover:-translate-y-0.5 hover:brightness-110 sm:px-7 sm:text-[15px]"
          >
            Explore work →
          </button>
          <button
            type="button"
            onClick={() => goTo(6)}
            className="cursor-pointer rounded-full border border-line-strong bg-white/4 px-6 py-3.5 font-display text-sm font-medium text-text-muted transition-colors hover:border-accent/60 hover:text-text sm:px-7 sm:text-[15px]"
          >
            Get in touch
          </button>
        </div>
      </div>

      {!scrollMode && (
        <p
          aria-hidden="true"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 whitespace-nowrap font-mono text-[11px] tracking-[3px] text-text-dim animate-bob lg:block"
        >
          SCROLL TO TRAVEL →
        </p>
      )}
    </div>
  );
}
