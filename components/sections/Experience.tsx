import { portfolioData } from "@/lib/data";
import type { ScreenProps } from "@/lib/deck";
import ScreenBody from "@/components/ui/ScreenBody";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Experience({ scrollMode }: ScreenProps) {
  const { experience } = portfolioData;

  return (
    <ScreenBody scrollMode={scrollMode} className="max-w-245">
      <SectionHeading num="03" title="Experience" />

      <ol className="relative flex flex-col gap-8 pl-9">
        <span
          aria-hidden="true"
          className="absolute bottom-1.5 left-2 top-1.5 w-px bg-linear-to-b from-accent via-accent2/60 to-transparent"
        />

        {experience.map((item) => (
          <li key={item.id} className="relative">
            <span
              aria-hidden="true"
              className={`absolute -left-8.5 top-1.5 size-2.25 rounded-full ${
                item.current
                  ? "bg-accent shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-accent)_18%,transparent)]"
                  : "bg-line-strong"
              }`}
            />
            <p
              className={`mb-1.5 font-mono text-xs tracking-[1.5px] ${
                item.current ? "text-accent" : "text-text-dim"
              }`}
            >
              {item.years}
            </p>
            <h3 className="text-lg font-semibold text-text sm:text-xl">
              {item.role}
            </h3>
            <p className="mt-1.75 max-w-155 text-sm leading-relaxed text-pretty text-text-muted">
              {item.blurb}
            </p>
          </li>
        ))}
      </ol>
    </ScreenBody>
  );
}
