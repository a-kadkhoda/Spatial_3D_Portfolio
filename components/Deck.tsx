"use client";

import { useDeck } from "@/lib/useDeck";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Stack from "@/components/sections/Stack";
import Experience from "@/components/sections/Experience";
import Writing from "@/components/sections/Writing";
import Contact from "@/components/sections/Contact";
import { getScreenStyle } from "@/lib/screenStyle";
import Chrome from "./Chrome";
import { useEffect } from "react";

const screens = [
  { screen: Hero, label: "00 HOME" },
  { screen: Work, label: "01 WORK" },
  { screen: Stack, label: "02 STACK" },
  { screen: Experience, label: "03 EXPERIENCE" },
  { screen: About, label: "04 ABOUT" },
  { screen: Writing, label: "05 WRITING" },
  { screen: Contact, label: "06 CONTACT" },
];

export default function Deck() {
  const { index, goTo, hijackDisabled, setIndex } = useDeck(screens.length);

  useEffect(() => {
    if (!hijackDisabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetIndex = parseInt(entry.target.id.split("-")[1], 10);
            setIndex(targetIndex);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "-45% 0px -45% 0px",
      },
    );
    for (let i = 0; i < screens.length; i++) {
      const el = document.getElementById(`screen-${i}`);
      if (el) observer.observe(el);
    }
    return () => {
      observer.disconnect();
    };
  }, [hijackDisabled]);

  if (hijackDisabled) {
    return (
      <div>
        <Chrome
          goTo={goTo}
          index={index}
          labels={screens.map((s) => s.label)}
          hijackDisabled={hijackDisabled}
        />
        {screens.map(({ screen: Screen, label }, i) => (
          <div
            key={i}
            id={`screen-${i}`}
            style={{
              padding: "96px 20px 110px",
              height:
                label === "00 HOME" || label === "06 CONTACT"
                  ? "100vh"
                  : "auto",
            }}
          >
            <Screen />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <Chrome
        goTo={goTo}
        index={index}
        labels={screens.map((s) => s.label)}
        hijackDisabled={hijackDisabled}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          perspective: "1500px",
          overflow: "hidden",
        }}
      >
        {screens.map(({ screen: Screen }, i) => (
          <div
            key={i}
            style={{
              ...getScreenStyle(i, index),
              position: "absolute",
              inset: 0,
              padding: "96px 176px 56px 200px",
            }}
          >
            <Screen />
          </div>
        ))}
      </div>
    </div>
  );
}
