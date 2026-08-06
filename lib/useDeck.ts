"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { SCREEN_IDS } from "./deck";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const COMPACT_QUERY = "(max-width: 900px)";
const COARSE_QUERY = "(pointer: coarse)";

const WHEEL_THRESHOLD = 110;
const WHEEL_RESET_MS = 280;
const COOLDOWN_MS = 1150;
const SWIPE_THRESHOLD = 70;

const hashListeners = new Set<() => void>();

function emitHashChange() {
  for (const listener of hashListeners) listener();
}

function subscribeToHash(callback: () => void) {
  hashListeners.add(callback);
  window.addEventListener("hashchange", callback);
  return () => {
    hashListeners.delete(callback);
    window.removeEventListener("hashchange", callback);
  };
}

export function readHashIndex(): number {
  const id = window.location.hash.slice(1);
  const found = SCREEN_IDS.indexOf(id as (typeof SCREEN_IDS)[number]);
  return found > 0 ? found : 0;
}

function writeHashIndex(target: number) {
  const id = SCREEN_IDS[target];
  if (!id || readHashIndex() === target) return;
  try {
    history.replaceState(null, "", `#${id}`);
  } catch {
  }
  emitHashChange();
}

function subscribeToMediaQuery(query: string) {
  return (callback: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", callback);
    return () => mql.removeEventListener("change", callback);
  };
}

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    subscribeToMediaQuery(query),
    () => window.matchMedia(query).matches,
    () => false,
  );
}

const subscribeNever = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

function scrollableAncestorCanConsume(
  start: EventTarget | null,
  delta: number,
  vertical: boolean,
  boundary: Element | null,
): boolean {
  let node = start instanceof Element ? start : null;

  while (node && node !== boundary && node !== document.body) {
    const scrollSize = vertical ? node.scrollHeight : node.scrollWidth;
    const clientSize = vertical ? node.clientHeight : node.clientWidth;

    if (scrollSize > clientSize + 2) {
      const style = getComputedStyle(node);
      const overflow = vertical ? style.overflowY : style.overflowX;

      if (overflow === "auto" || overflow === "scroll") {
        const position = vertical ? node.scrollTop : node.scrollLeft;
        const atEnd = position + clientSize >= scrollSize - 1;
        const atStart = position <= 1;
        if (delta > 0 ? !atEnd : !atStart) return true;
      }
    }
    node = node.parentElement;
  }
  return false;
}

export function useDeck(screenCount: number) {
  const index = useSyncExternalStore(subscribeToHash, readHashIndex, () => 0);
  const mounted = useMounted();

  const cooldownRef = useRef(false);
  const wheelAccRef = useRef(0);
  const wheelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartRef = useRef<{
    x: number;
    y: number;
    target: EventTarget | null;
  } | null>(null);
  const worldRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const isNarrow = useMediaQuery(COMPACT_QUERY);
  const isCoarsePointer = useMediaQuery(COARSE_QUERY);

  const scrollMode = isNarrow || isCoarsePointer || prefersReducedMotion;

  const goTo = useCallback(
    (target: number, { immediate = false } = {}) => {
      const clamped = Math.max(0, Math.min(target, screenCount - 1));
      if (clamped === readHashIndex()) return;
      if (cooldownRef.current && !immediate) return;

      if (!immediate) {
        cooldownRef.current = true;
        setTimeout(() => {
          cooldownRef.current = false;
        }, COOLDOWN_MS);
      }

      writeHashIndex(clamped);
    },
    [screenCount],
  );

  const setIndex = useCallback((target: number) => {
    writeHashIndex(target);
  }, []);

  useEffect(() => {
    if (scrollMode || !mounted) return;

    function onWheel(e: WheelEvent) {
      if (isEditableTarget(e.target)) return;
      if (scrollableAncestorCanConsume(e.target, e.deltaY, true, worldRef.current)) {
        return;
      }

      e.preventDefault();
      if (cooldownRef.current) return;

      wheelAccRef.current += e.deltaY;
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = setTimeout(() => {
        wheelAccRef.current = 0;
      }, WHEEL_RESET_MS);

      if (Math.abs(wheelAccRef.current) > WHEEL_THRESHOLD) {
        const direction = wheelAccRef.current > 0 ? 1 : -1;
        wheelAccRef.current = 0;
        goTo(readHashIndex() + direction);
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (isEditableTarget(e.target)) return;

      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
        case "PageDown":
          e.preventDefault();
          goTo(readHashIndex() + 1);
          break;
        case "ArrowUp":
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          goTo(readHashIndex() - 1);
          break;
        case "Home":
          e.preventDefault();
          goTo(0, { immediate: true });
          break;
        case "End":
          e.preventDefault();
          goTo(screenCount - 1, { immediate: true });
          break;
      }
    }

    function onTouchStart(e: TouchEvent) {
      const touch = e.touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        target: e.target,
      };
    }

    function onTouchEnd(e: TouchEvent) {
      const start = touchStartRef.current;
      touchStartRef.current = null;
      if (!start || cooldownRef.current) return;

      const touch = e.changedTouches[0];
      const dy = start.y - touch.clientY;
      const dx = start.x - touch.clientX;
      const vertical = Math.abs(dy) > Math.abs(dx);
      const delta = vertical ? dy : dx;

      if (Math.abs(delta) < SWIPE_THRESHOLD) return;
      if (scrollableAncestorCanConsume(start.target, delta, vertical, worldRef.current)) {
        return;
      }

      goTo(readHashIndex() + (delta > 0 ? 1 : -1));
    }

    const timer = wheelTimerRef;

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [scrollMode, mounted, goTo, screenCount]);

  return {
    index,
    setIndex,
    goTo,
    scrollMode,
    prefersReducedMotion,
    mounted,
    worldRef,
  };
}
