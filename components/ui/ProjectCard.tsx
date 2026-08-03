// components/ui/ProjectCard.tsx
import type { Project } from "@/types/portfolio";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-2xl p-3.5 bg-white/3 border border-white/9">
      <div className="h-42 rounded-lg bg-white/5 flex items-center justify-center text-xs text-text-muted">
        {project.title} image
      </div>
      <div className="flex items-baseline justify-between mt-3.5">
        <a href={project.url} className="text-lg font-semibold">
          {project.title}{" "}
          <span className="text-accent font-mono text-xs">↗</span>
        </a>
        <span className="font-mono text-xs text-text-muted">
          {project.year}
        </span>
      </div>
      <p className="text-sm text-text-muted mt-2">{project.description}</p>
      <div className="flex items-center justify-between gap-3 mt-3">
        <div className="flex gap-1.5 flex-wrap">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10.5px] border border-white/10 rounded-full px-2.5 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
        {project.site && (
          <a
            href={project.site}
            target="_blank"
            className="font-mono text-[10.5px] tracking-wide text-accent shrink-0"
          >
            VISIT ↗
          </a>
        )}
      </div>
    </div>
  );
}
