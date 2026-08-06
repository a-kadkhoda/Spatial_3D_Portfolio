import Image from "next/image";
import { portfolioData } from "@/lib/data";
import type { ScreenProps } from "@/lib/deck";
import ScreenBody from "@/components/ui/ScreenBody";
import SectionHeading from "@/components/ui/SectionHeading";

const PORTRAIT = "/images/portrait.jpg";
const HAS_PORTRAIT = false;

export default function About({ scrollMode }: ScreenProps) {
  const { aboutParagraphs, location, focus, status } = portfolioData;
  const [lead, detail] = aboutParagraphs;

  return (
    <ScreenBody scrollMode={scrollMode} className="max-w-260">
      <SectionHeading num="04" title="About" className="mb-8 sm:mb-8.5" />

      <div className="grid items-center gap-8 sm:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] sm:gap-11">
        <div className="relative mx-auto h-70 w-full max-w-85 overflow-hidden rounded-[18px] border border-line bg-white/4 sm:h-100">
          {HAS_PORTRAIT ? (
            <Image
              src={PORTRAIT}
              alt="Portrait of Aliakbar Kadkhoda"
              fill
              sizes="(max-width: 900px) 100vw, 340px"
              className="object-cover"
            />
          ) : (
            <div className="grid h-full place-items-center font-mono text-[11px] tracking-[2px] text-text-dim">
              PORTRAIT
            </div>
          )}
        </div>

        <div>
          <p className="text-base leading-relaxed text-pretty text-text-muted sm:text-[17px]">
            {lead}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-pretty text-text-dim sm:text-[15px]">
            {detail}
          </p>

          <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-5 border-t border-line pt-6">
            {[
              { term: "LOCATION", value: location, accent: false },
              { term: "FOCUS", value: focus, accent: false },
              { term: "STATUS", value: status, accent: true },
            ].map(({ term, value, accent }) => (
              <div key={term}>
                <dt className="mb-1.5 font-mono text-[10.5px] tracking-[2px] text-text-dim">
                  {term}
                </dt>
                <dd
                  className={`text-[15px] ${accent ? "text-accent" : "text-text"}`}
                >
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </ScreenBody>
  );
}
