"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(useGSAP, CustomEase);

export const DECK_EASE = CustomEase.create("deck", "M0,0 C0.72,0.04 0.28,1 1,1");

export const DECK_DURATION = 1.1;
export const FADE_DURATION = 0.9;

export { gsap, useGSAP };
