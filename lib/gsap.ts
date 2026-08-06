"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(useGSAP, CustomEase);

export const DECK_EASE = CustomEase.create("deck", "M0,0 C0.72,0.04 0.28,1 1,1");

export const DECK_DURATION = 1.1;
export const FADE_DURATION = 0.9;

// A screen parked in front of the active one crosses the perspective origin during
// travel, so it scales toward infinity on the way past. These keep it painted for as
// little of that crossing as possible: leave fast, come back late.
export const EXIT_DURATION = 0.34;
export const RETURN_DELAY = 0.62;
export const RETURN_DURATION = 0.48;

export { gsap, useGSAP };
