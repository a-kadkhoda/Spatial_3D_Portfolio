"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Project } from "@/types/portfolio";

const MAX_TILT_X = 6;
const MAX_TILT_Y = 8;

export default function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLElement>(null);

  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    const el = cardRef.current;
    if (
      !el ||
      e.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    el.style.transition = "transform .06s linear";
    el.style.transform = `rotateX(${(-y * MAX_TILT_X).toFixed(2)}deg) rotateY(${(
      x * MAX_TILT_Y
    ).toFixed(2)}deg) translateZ(6px)`;
  }

  function onPointerLeave() {
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = "transform .5s cubic-bezier(.2,.7,.2,1)";
    el.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0px)";
  }

  return (
    <article
      ref={cardRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="panel group relative rounded-2xl p-3.5 shadow-[0_24px_60px_rgba(0,0,0,0.35)] transform-3d will-change-transform"
    >
      <div className="relative h-[168px] overflow-hidden rounded-[10px] bg-white/5 [transform:translateZ(24px)]">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            sizes="(max-width: 900px) 100vw, 540px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="grid h-full place-items-center font-mono text-[11px] tracking-[1.5px] text-text-dim">
            {project.title.toUpperCase()}
          </div>
        )}
      </div>

      <div className="mt-3.5 flex items-baseline justify-between gap-3 [transform:translateZ(16px)]">
        <h3 className="text-lg font-semibold sm:text-xl">
          <a
            href={project.url}
            className="text-text transition-colors hover:text-accent"
          >
            <span className="absolute inset-0 rounded-2xl" aria-hidden="true" />
            {project.title}{" "}
            <span aria-hidden="true" className="font-mono text-[11px] text-accent">
              ↗
            </span>
          </a>
        </h3>
        <span className="shrink-0 font-mono text-[11px] text-text-dim">
          {project.year}
        </span>
      </div>

      <p className="mt-2 text-[13.5px] leading-relaxed text-pretty text-text-muted">
        {project.description}
      </p>

      <div className="mt-3 flex items-center justify-between gap-3">
        <ul className="flex flex-wrap gap-[7px]">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line-strong px-2.5 py-[3px] font-mono text-[10.5px] text-text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>

        {project.site && (
          <a
            href={project.site}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 shrink-0 font-mono text-[10.5px] tracking-[1.5px] text-accent transition-opacity hover:opacity-80"
          >
            VISIT ↗
          </a>
        )}
      </div>
    </article>
  );
}
