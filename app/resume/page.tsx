import type { Metadata } from "next";
import Link from "next/link";
import { portfolioData } from "@/lib/data";
import PrintButton from "@/components/ui/PrintButton";

export const metadata: Metadata = {
  title: `Résumé — ${portfolioData.name}`,
  description: `${portfolioData.role} — résumé and experience.`,
};

export default function ResumePage() {
  const {
    name,
    role,
    email,
    location,
    socials,
    aboutParagraphs,
    experience,
    stack,
    projects,
  } = portfolioData;

  return (
    <div className="min-h-dvh bg-bg print:bg-white">
      <div className="mx-auto max-w-200 px-5 py-12 sm:px-8 print:max-w-none print:px-0 print:py-0">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-[-0.02em] text-text print:text-black">
              {name}
            </h1>
            <p className="mt-1 font-mono text-xs tracking-[2px] text-accent print:text-black">
              {role.toUpperCase()}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="font-mono text-[11px] tracking-[2px] text-text-dim transition-colors hover:text-accent print:hidden"
            >
              ← BACK
            </Link>
            <PrintButton />
          </div>
        </div>

        <dl className="mb-9 flex flex-wrap gap-x-8 gap-y-2 border-y border-line py-4 print:border-neutral-300">
          {[
            { term: "EMAIL", value: email, href: `mailto:${email}` },
            { term: "LOCATION", value: location },
            ...socials.map((s) => ({
              term: s.label,
              value: s.url.replace(/^https?:\/\//, ""),
              href: s.url,
            })),
          ].map(({ term, value, href }) => (
            <div key={term}>
              <dt className="font-mono text-[10px] tracking-[2px] text-text-dim print:text-neutral-500">
                {term}
              </dt>
              <dd className="text-[13.5px] text-text print:text-black">
                {href ? (
                  <a href={href} className="hover:text-accent">
                    {value}
                  </a>
                ) : (
                  value
                )}
              </dd>
            </div>
          ))}
        </dl>

        <ResumeSection title="Profile">
          <p className="text-sm leading-relaxed text-pretty text-text-muted print:text-neutral-800">
            {aboutParagraphs[0]}
          </p>
        </ResumeSection>

        <ResumeSection title="Experience">
          <ol className="flex flex-col gap-5">
            {experience.map((item) => (
              <li key={item.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-[15px] font-semibold text-text print:text-black">
                    {item.role}
                  </h3>
                  <span className="font-mono text-[11px] tracking-[1.5px] text-text-dim print:text-neutral-600">
                    {item.years}
                  </span>
                </div>
                <p className="mt-1 text-[13.5px] leading-relaxed text-pretty text-text-muted print:text-neutral-800">
                  {item.blurb}
                </p>
              </li>
            ))}
          </ol>
        </ResumeSection>

        <ResumeSection title="Stack">
          <div className="flex flex-col gap-2.5">
            {stack.map((group) => (
              <div
                key={group.label}
                className="grid gap-1 sm:grid-cols-[130px_1fr] sm:gap-4"
              >
                <span className="font-mono text-[11px] tracking-[2px] text-accent print:text-neutral-600">
                  {group.label}
                </span>
                <span className="text-[13.5px] text-text-muted print:text-neutral-800">
                  {group.items.join(" · ")}
                </span>
              </div>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection title="Selected projects">
          <ul className="flex flex-col gap-4">
            {projects.slice(0, 4).map((project) => (
              <li key={project.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-[15px] font-semibold text-text print:text-black">
                    {project.title}
                  </h3>
                  <span className="font-mono text-[11px] text-text-dim print:text-neutral-600">
                    {project.year}
                  </span>
                </div>
                <p className="mt-1 text-[13.5px] leading-relaxed text-pretty text-text-muted print:text-neutral-800">
                  {project.description}
                </p>
                <p className="mt-1 font-mono text-[10.5px] tracking-[1.5px] text-text-dim print:text-neutral-600">
                  {project.tags.join(" / ")}
                </p>
              </li>
            ))}
          </ul>
        </ResumeSection>
      </div>
    </div>
  );
}

function ResumeSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8 break-inside-avoid">
      <h2 className="mb-3 font-mono text-[11px] tracking-[2.5px] text-accent print:text-neutral-500">
        {title.toUpperCase()}
      </h2>
      {children}
    </section>
  );
}
