import { portfolioData } from "@/lib/data";

export default function Stack() {
  const { stack } = portfolioData;

  return (
    <section
      id="stack"
      className="min-h-screen flex flex-col justify-center px-8 md:px-16"
    >
      <div className="flex items-center gap-4 mb-6">
        <span className="font-mono text-sm text-accent">02</span>
        <span className="w-11 h-px bg-white/20" />
        <h2 className="text-3xl font-semibold">Stack</h2>
      </div>

      <div className="flex flex-col gap-4">
        {stack.map((group) => (
          <div
            key={group.label}
            className="grid grid-cols-[140px_1fr] gap-5 items-baseline p-5 rounded-2xl bg-white/3 border border-white/9"
          >
            <h3 className="font-mono text-xs tracking-[2.5px] font-medium text-accent">
              {group.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 text-sm border border-white/10 rounded-full px-3.5 py-1.5"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: group.dot }}
                  />
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
