import { portfolioData } from "@/lib/data";

export default function Experience() {
  const { experience } = portfolioData;

  return (
    <section
      id="experience"
      className="min-h-screen flex flex-col justify-center px-8 md:px-16"
    >
      <div className="flex items-center gap-4 mb-7">
        <span className="font-mono text-sm text-accent">03</span>
        <span className="w-11 h-px bg-white/20" />
        <h2 className="text-3xl font-semibold">Experience</h2>
      </div>

      <div className="relative pl-10 flex flex-col gap-8">
        <span className="absolute left-2 top-1.5 bottom-1.5 w-px bg-linear-to-b from-accent via-accent2/60 to-transparent" />
        {experience.map((x) => (
          <div key={x.id} className="relative">
            <span className="absolute -left-8.5 top-1.5 w-2.5 h-2.5 rounded-full bg-accent" />
            <div className="font-mono text-xs tracking-wide text-accent mb-1.5">
              {x.years}
            </div>
            <div className="text-xl font-semibold">{x.role}</div>
            <p className="max-w-xl text-sm text-text-muted mt-1.5">{x.blurb}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
