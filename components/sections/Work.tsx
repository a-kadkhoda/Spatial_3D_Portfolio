import Link from "next/link";
import { portfolioData } from "@/lib/data";
import type { ScreenProps } from "@/lib/deck";
import ProjectCard from "@/components/ui/ProjectCard";
import ScreenBody from "@/components/ui/ScreenBody";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Work({ scrollMode }: ScreenProps) {
  const featured = portfolioData.projects.filter((p) => p.featured);

  return (
    <ScreenBody scrollMode={scrollMode}>
      <SectionHeading
        num="01"
        title="Selected work"
        action={
          <Link
            href="/projects"
            className="font-mono text-[11px] tracking-[1.5px] text-accent transition-opacity hover:opacity-80"
          >
            ALL PROJECTS ↗
          </Link>
        }
      />

      <div className="grid gap-5 perspective-[1400px] sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {featured.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </ScreenBody>
  );
}
