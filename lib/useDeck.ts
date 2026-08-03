"use client";
import { useEffect, useState, useRef } from "react";

function isEditableTarget(target: EventTarget | null): boolean {
  if (target instanceof HTMLElement) {
    const tagName = target.tagName;
    if (
      tagName === "INPUT" ||
      tagName === "TEXTAREA" ||
      target.isContentEditable
    )
      return true;
  }
  return false;
}

export function useDeck(screenCount: number) {
  const [index, setIndex] = useState(0);
  const isLocked = useRef(false);
  const LOCK_MS = 900;
  const touchStartY = useRef(0);

  function goTo(target: number) {
    if (isLocked.current) return;

    const clamp = Math.max(0, Math.min(target, screenCount - 1));

    if (clamp === index) return;

    isLocked.current = true;

    setIndex(clamp);

    setTimeout(() => {
      isLocked.current = false;
    }, LOCK_MS);
  }

  useEffect(() => {
    function onWheel(e: WheelEvent) {
      if (isEditableTarget(e.target)) return;

      e.preventDefault();

      const deltaY = e.deltaY;
      if (deltaY > 0) {
        goTo(index + 1);
      } else if (deltaY < 0) {
        goTo(index - 1);
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [index]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (isEditableTarget(e.target)) return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goTo(index + 1);
      }

      if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goTo(index - 1);
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [index]);

  useEffect(() => {
    function onTouchStart(e: TouchEvent) {
      touchStartY.current = e.touches[0].clientY;
    }

    function onTouchEnd(e: TouchEvent) {
      const touchEndY = e.changedTouches[0].clientY;
      const delta = touchStartY.current - touchEndY;
      const THRESHOLD = 50;

      if (delta > THRESHOLD) {
        goTo(index + 1);
      }
      if (delta < -THRESHOLD) {
        goTo(index - 1);
      }
    }

    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [index]);

  return { index, goTo };
}
