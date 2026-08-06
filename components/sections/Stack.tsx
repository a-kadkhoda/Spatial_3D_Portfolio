import { portfolioData } from "@/lib/data";
import type { ScreenProps } from "@/lib/deck";
import ScreenBody from "@/components/ui/ScreenBody";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Stack({ scrollMode }: ScreenProps) {
  const { stack } = portfolioData;

  return (
    <ScreenBody scrollMode={scrollMode}>
      <SectionHeading num="02" title="Stack" />

      <div className="flex flex-col gap-4">
        {stack.map((group) => (
          <div
            key={group.label}
            className="panel grid items-baseline gap-3 rounded-2xl px-5 py-5 sm:grid-cols-[150px_1fr] sm:gap-5.5 sm:px-5.5"
          >
            <h3 className="font-mono text-xs font-medium tracking-[2.5px] text-accent">
              {group.label}
            </h3>
            <ul className="flex flex-wrap gap-2.25">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 rounded-full border border-line-strong bg-white/3 px-3.5 py-1.75 text-[13px] text-text-muted transition-colors hover:border-accent/50 sm:text-sm"
                >
                  <span
                    aria-hidden="true"
                    className="size-1.25 shrink-0 rounded-full"
                    style={{
                      background: `color-mix(in oklab, ${group.dot} 75%, transparent)`,
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </ScreenBody>
  );
}
