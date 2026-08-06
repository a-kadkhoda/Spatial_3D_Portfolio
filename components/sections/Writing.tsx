import { portfolioData } from "@/lib/data";

export default function Writing() {
  const { writing } = portfolioData;

  return (
    <section
      id="writing"
      className="h-full flex flex-col justify-center px-8 md:px-16"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm text-accent">05</span>
          <span className="w-11 h-px bg-white/20" />
          <h2 className="text-xl md:text-3xl font-semibold">Writing</h2>
        </div>
        <a href="#" className="font-mono text-[11px] tracking-wide text-accent">
          ALL POSTS ↗
        </a>
      </div>
      <div>
        {writing.map((w) => (
          <div
            key={w.id}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-6 py-5 border-b border-white/9"
          >
            <div>
              <div className="text-lg font-semibold">{w.title}</div>
              <div className="text-sm text-text-muted mt-1.5">{w.blurb}</div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <span className="font-mono text-xs text-text-muted">
                {w.date}
              </span>
              <a
                href={w.url}
                className="font-mono text-xs tracking-wide text-accent"
              >
                READ ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
