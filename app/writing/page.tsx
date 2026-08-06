import type { Metadata } from "next";
import Link from "next/link";
import { portfolioData } from "@/lib/data";
import PageShell from "@/components/ui/PageShell";

export const metadata: Metadata = {
  title: `Writing — ${portfolioData.name}`,
  description: "Notes on front-end engineering, 3D on the web, and motion.",
};

export default function WritingPage() {
  const { writing } = portfolioData;

  return (
    <PageShell
      num="05"
      title="Writing"
      intro="Notes on front-end engineering, 3D on the web, and the parts of shipping that nobody blogs about."
    >
      <ul className="max-w-220">
        {writing.map((post) => (
          <li
            key={post.id}
            id={post.id}
            className="flex scroll-mt-24 flex-col justify-between gap-2.5 border-b border-line py-6 sm:flex-row sm:items-center sm:gap-6"
          >
            <div>
              <h2 className="text-[17px] font-semibold text-text sm:text-[19px]">
                <Link
                  href={post.url}
                  className="transition-colors hover:text-accent"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-1.5 text-[13.5px] text-pretty text-text-dim">
                {post.blurb}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-4 sm:gap-4.5">
              <span className="font-mono text-[11px] text-text-dim">
                {post.date}
              </span>
              <Link
                href={post.url}
                aria-label={`Read: ${post.title}`}
                className="font-mono text-[11px] tracking-[1.5px] text-accent transition-opacity hover:opacity-80"
              >
                READ ↗
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
