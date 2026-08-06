import { portfolioData } from "@/lib/data";

export default function About() {
  const { aboutParagraphs, location, focus, status } = portfolioData;

  return (
    <section
      id="about"
      className="h-full flex flex-col justify-center px-8 md:px-16"
    >
      <div className="flex items-center gap-4 mb-8">
        <span className="font-mono text-sm text-accent">04</span>
        <span className="w-11 h-px bg-white/20" />
        <h2 className="text-xl md:text-3xl font-semibold">About</h2>
      </div>

      <div className="grid gap-11 items-center grid-cols-1 md:grid-cols-[340px_1fr]">
        <div className="h-100 max-w-85 w-full mx-auto rounded-[18px] bg-white/5 flex items-center justify-center text-xs text-text-muted">
          Portrait
        </div>

        <div>
          <p className="text-[17px] leading-relaxed text-text/85">
            {aboutParagraphs[0]}
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-text-muted/90">
            {aboutParagraphs[1]}
          </p>

          <div className="flex gap-11 mt-7.5 pt-6 border-t border-white/10">
            <div>
              <div className="font-mono text-[10.5px] tracking-[2px] text-text-muted/60 mb-1.5">
                LOCATION
              </div>
              <div className="text-[15px]">{location}</div>
            </div>
            <div>
              <div className="font-mono text-[10.5px] tracking-[2px] text-text-muted/60 mb-1.5">
                FOCUS
              </div>
              <div className="text-[15px]">{focus}</div>
            </div>
            <div>
              <div className="font-mono text-[10.5px] tracking-[2px] text-text-muted/60 mb-1.5">
                STATUS
              </div>
              <div className="text-[15px] text-accent">{status}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
