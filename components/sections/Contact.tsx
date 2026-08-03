import { portfolioData } from "@/lib/data";

export default function Contact() {
  const {
    email,
    socials,
    contactHeadline,
    contactHighlight,
    contactSubtext,
    resumeUrl,
    name,
  } = portfolioData;

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center text-center px-8"
    >
      <p className="font-mono text-xs tracking-[3px] text-accent mb-5">
        06 — CONTACT
      </p>

      <h2 className="text-5xl md:text-6xl font-semibold tracking-tight leading-tight max-w-2xl">
        {contactHeadline}{" "}
        <span className="bg-linear-to-r from-accent to-accent2 bg-clip-text text-transparent">
          {contactHighlight}
        </span>
        .
      </h2>

      <p className="max-w-md mt-5 text-text-muted">{contactSubtext}</p>

      <a
        href={`mailto:${email}`}
        className="mt-8 bg-accent text-bg font-semibold text-sm px-7 py-3.5 rounded-full"
      >
        {email}
      </a>

      <div className="flex gap-6 mt-8 flex-wrap justify-center">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs tracking-wide text-text-muted"
          >
            {s.label} ↗
          </a>
        ))}
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs tracking-wide text-accent"
        >
          RÉSUMÉ / CV ↓
        </a>
      </div>

      <p className="font-mono text-[10.5px] tracking-widest text-text-muted/50 mt-14">
        © 2026 {name.toUpperCase()} · BUILT IN THE BROWSER
      </p>
    </section>
  );
}
