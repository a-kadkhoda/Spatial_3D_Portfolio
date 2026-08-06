import type { ReactNode } from "react";

interface SectionHeadingProps {
  num: string;
  title: string;
  action?: ReactNode;
  className?: string;
}

export default function SectionHeading({
  num,
  title,
  action,
  className = "mb-6 sm:mb-[26px]",
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <span className="font-mono text-[13px] text-accent">{num}</span>
        <span aria-hidden="true" className="h-px w-11 bg-line-strong" />
        <h2 className="text-section font-semibold tracking-[-0.02em] text-text">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
