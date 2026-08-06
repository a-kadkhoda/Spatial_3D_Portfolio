"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";

import Chrome from "@/components/Chrome";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Stack from "@/components/sections/Stack";
import Work from "@/components/sections/Work";
import Writing from "@/components/sections/Writing";
import {
  SCREEN_IDS,
  initialScreenStyle,
  screenBlur,
  screenOpacity,
  stageOffset,
} from "@/lib/deck";
import type { ScreenProps } from "@/lib/deck";
import {
  DECK_DURATION,
  DECK_EASE,
  EXIT_DURATION,
  FADE_DURATION,
  RETURN_DELAY,
  RETURN_DURATION,
  gsap,
  useGSAP,
} from "@/lib/gsap";
import { readHashIndex, useDeck } from "@/lib/useDeck";

const Scene = dynamic(() => import("@/scene/Scene"), { ssr: false });

const SCREENS: { component: ComponentType<ScreenProps>; label: string }[] = [
  { component: Hero, label: "00 HOME" },
  { component: Work, label: "01 WORK" },
  { component: Stack, label: "02 STACK" },
  { component: Experience, label: "03 EXPERIENCE" },
  { component: About, label: "04 ABOUT" },
  { component: Writing, label: "05 WRITING" },
  { component: Contact, label: "06 CONTACT" },
];

const FULL_HEIGHT_IN_SCROLL = new Set(["home", "contact"]);

const LABELS = SCREENS.map((s) => s.label);

export default function Deck() {
  const { index, setIndex, goTo, scrollMode, prefersReducedMotion, mounted, worldRef } =
    useDeck(SCREENS.length);

  const pointerRef = useRef({ x: 0, y: 0 });
  const rootRef = useRef<HTMLDivElement>(null);
  const parallaxFrame = useRef<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const screenRefs = useRef<(HTMLElement | null)[]>([]);
  const hasTravelled = useRef(false);
  const previousIndex = useRef(index);
  const [initialIndex] = useState(index);

  useGSAP(
    () => {
      const stage = stageRef.current;
      if (scrollMode || !stage) return;

      const previous = previousIndex.current;
      previousIndex.current = index;

      const animate = hasTravelled.current && !prefersReducedMotion;
      hasTravelled.current = true;

      gsap.to(stage, {
        ...stageOffset(index),
        duration: animate ? DECK_DURATION : 0,
        ease: DECK_EASE,
        force3D: true,
        overwrite: "auto",
      });

      screenRefs.current.forEach((screen, i) => {
        if (!screen) return;

        // The blur is snapped, never tweened. Animating a filter on a screen that is
        // simultaneously scaling past the camera re-rasterises the whole layer, text
        // included, on every frame — that is the cost, not the transform.
        gsap.set(screen, { filter: screenBlur(i, index) });

        const autoAlpha = screenOpacity(i, index);
        if (!animate) {
          gsap.set(screen, { autoAlpha });
          return;
        }

        // Screens with a lower index than the active one are parked between the camera
        // and the stage, so travel drags them through the perspective origin at runaway
        // scale. Drop them before they blow up; bring them back once they have shrunk.
        const wasNearCamera = i < previous;
        const isNearCamera = i < index;

        gsap.to(screen, {
          autoAlpha,
          duration: isNearCamera
            ? EXIT_DURATION
            : wasNearCamera
              ? RETURN_DURATION
              : FADE_DURATION,
          delay: wasNearCamera && !isNearCamera ? RETURN_DELAY : 0,
          ease: "power2.out",
          // Not "auto": a delayed tween has not rendered yet, so an auto-overwriting
          // successor would leave it queued and let it win after the fact.
          overwrite: true,
        });
      });
    },
    { dependencies: [index, scrollMode, prefersReducedMotion] },
  );

  const navigate = useCallback(
    (target: number) => {
      const clamped = Math.max(0, Math.min(target, SCREENS.length - 1));
      if (scrollMode) {
        document
          .getElementById(SCREEN_IDS[clamped])
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        goTo(clamped, { immediate: true });
      }
    },
    [scrollMode, goTo],
  );

  useEffect(() => {
    if (scrollMode) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [scrollMode]);

  useEffect(() => {
    if (scrollMode || prefersReducedMotion) return;

    function onPointerMove(e: PointerEvent) {
      pointerRef.current = {
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      };
      if (parallaxFrame.current !== null) return;

      parallaxFrame.current = requestAnimationFrame(() => {
        parallaxFrame.current = null;
        const { x, y } = pointerRef.current;
        rootRef.current?.querySelectorAll<HTMLElement>("[data-depth]").forEach((el) => {
          const depth = parseFloat(el.dataset.depth ?? "0");
          el.style.translate = `${(-x * depth * 220).toFixed(1)}px ${(
            -y * depth * 160
          ).toFixed(1)}px`;
        });
      });
    }

    window.addEventListener("pointermove", onPointerMove);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (parallaxFrame.current !== null) cancelAnimationFrame(parallaxFrame.current);
    };
  }, [scrollMode, prefersReducedMotion]);

  useEffect(() => {
    if (!scrollMode || !mounted) return;

    const deepLink = readHashIndex();
    if (deepLink > 0) {
      document
        .getElementById(SCREEN_IDS[deepLink])
        ?.scrollIntoView({ behavior: "instant", block: "start" });
    }

    let ready = false;
    const settle = setTimeout(() => {
      ready = true;
    }, 350);

    const observer = new IntersectionObserver(
      (entries) => {
        if (!ready) return;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const target = SCREEN_IDS.indexOf(
            entry.target.id as (typeof SCREEN_IDS)[number],
          );
          if (target >= 0) setIndex(target);
        }
      },
      { threshold: 0, rootMargin: "-45% 0px -45% 0px" },
    );

    for (const id of SCREEN_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => {
      clearTimeout(settle);
      observer.disconnect();
    };
  }, [scrollMode, mounted, setIndex]);

  const chrome = (
    <Chrome
      index={index}
      count={SCREENS.length}
      labels={LABELS}
      scrollMode={scrollMode}
      onNavigate={navigate}
    />
  );

  return (
    <div
      ref={rootRef}
      className="transition-opacity duration-500"
      style={{ opacity: mounted ? 1 : 0 }}
    >
      <a
        href={`#${SCREEN_IDS[1]}`}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-bg"
      >
        Skip to content
      </a>

      {mounted && (
        <Scene
          index={index}
          pointerRef={pointerRef}
          opacity={0.5}
          reducedMotion={prefersReducedMotion}
        />
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-1 bg-[radial-gradient(ellipse_at_50%_42%,transparent_52%,rgba(2,3,7,0.72)_100%)]"
      />

      {chrome}

      {scrollMode ? (
        <main className="relative z-10">
          {SCREENS.map(({ component: Screen }, i) => (
            <section
              key={SCREEN_IDS[i]}
              id={SCREEN_IDS[i]}
              className={`flex w-full items-center justify-center px-5 pb-24 pt-24 sm:px-8 ${
                FULL_HEIGHT_IN_SCROLL.has(SCREEN_IDS[i]) ? "min-h-dvh" : ""
              }`}
            >
              <Screen scrollMode goTo={navigate} />
            </section>
          ))}
        </main>
      ) : (
        <main
          ref={worldRef}
          className="fixed inset-0 z-10 h-dvh overflow-hidden perspective-[1500px] perspective-origin-[50%_45%]"
        >
          <div
            ref={stageRef}
            className="absolute inset-0 transform-3d will-change-transform"
          >
            {SCREENS.map(({ component: Screen }, i) => (
              <section
                key={SCREEN_IDS[i]}
                id={SCREEN_IDS[i]}
                ref={(el) => {
                  screenRefs.current[i] = el;
                }}
                aria-hidden={i !== index}
                className="absolute inset-0 flex items-center justify-center pb-14 pl-[clamp(96px,14vw,200px)] pr-[clamp(72px,12vw,176px)] pt-24"
                style={{
                  ...initialScreenStyle(i, initialIndex),
                  pointerEvents: i === index ? "auto" : "none",
                }}
              >
                <Screen scrollMode={false} goTo={navigate} />
              </section>
            ))}
          </div>
        </main>
      )}
    </div>
  );
}
