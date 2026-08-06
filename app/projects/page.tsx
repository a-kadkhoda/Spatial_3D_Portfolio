import type { Metadata } from "next";
import { portfolioData } from "@/lib/data";
import PageShell from "@/components/ui/PageShell";
import ProjectCard from "@/components/ui/ProjectCard";

export const metadata: Metadata = {
  title: `Projects — ${portfolioData.name}`,
  description: "Every project, not just the selected few.",
};

export default function ProjectsPage() {
  const { projects } = portfolioData;

  return (
    <PageShell
      num="01"
      title="All projects"
      intro="Everything worth showing — client work, product builds, and the experiments that fed into them."
    >
      <div className="grid gap-5 perspective-[1400px] sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {projects.map((project) => (
          <div key={project.id} id={project.id} className="scroll-mt-24">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </PageShell>
  );
}
