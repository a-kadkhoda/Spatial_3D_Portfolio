import { portfolioData } from "@/lib/data";
import ProjectCard from "@/components/ui/ProjectCard";

export default function Work() {
  const { projects } = portfolioData;

  return (
    <section
      id="work"
      className="h-full flex flex-col justify-center px-8 md:px-16"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-6">
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm text-accent">01</span>
          <span className="w-11 h-px bg-white/20" />
          <h2 className="text-xl md:text-3xl font-semibold">Selected work</h2>
        </div>
        <a href="#" className="font-mono text-[11px] tracking-wide text-accent">
          ALL PROJECTS ↗
        </a>
      </div>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
