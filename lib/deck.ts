import type { CSSProperties } from "react";

export const DEPTH_STEP = 1500;

export const SCREEN_OFFSETS: readonly (readonly [number, number])[] = [
  [0, 0],
  [170, -50],
  [-150, 40],
  [130, -40],
  [-170, 50],
  [150, -30],
  [0, 0],
];

export const SCREEN_IDS = [
  "home",
  "work",
  "stack",
  "experience",
  "about",
  "writing",
  "contact",
] as const;

export type ScreenId = (typeof SCREEN_IDS)[number];

export interface ScreenProps {
  scrollMode: boolean;
  goTo: (target: number) => void;
}

export function screenTransform(screenIndex: number): string {
  const [x, y] = SCREEN_OFFSETS[screenIndex] ?? [0, 0];
  return `translate3d(${x}px, ${y}px, ${-screenIndex * DEPTH_STEP}px)`;
}

export function stageOffset(activeIndex: number): {
  x: number;
  y: number;
  z: number;
} {
  const [x, y] = SCREEN_OFFSETS[activeIndex] ?? [0, 0];
  return { x: -x, y: -y, z: activeIndex * DEPTH_STEP };
}

export function screenOpacity(screenIndex: number, activeIndex: number): number {
  const distance = screenIndex - activeIndex;
  return distance === 0 ? 1 : distance === 1 ? 0.04 : distance === 2 ? 0.02 : 0;
}

export function screenBlur(screenIndex: number, activeIndex: number): string {
  return screenIndex === activeIndex ? "blur(0px)" : "blur(2px)";
}

export function initialScreenStyle(
  screenIndex: number,
  activeIndex: number,
): CSSProperties {
  const opacity = screenOpacity(screenIndex, activeIndex);

  return {
    transform: screenTransform(screenIndex),
    opacity,
    filter: screenBlur(screenIndex, activeIndex),
    visibility: opacity === 0 ? "hidden" : "visible",
  };
}
