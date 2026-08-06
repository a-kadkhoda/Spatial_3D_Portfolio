import { portfolioData } from "@/lib/data";

export default function Hero() {
  const { kicker, name, bio } = portfolioData;
  const [first, last] = name.split(" ");

  return (
    <section
      id="hero"
      className="h-full flex flex-col items-center justify-center text-center px-8 overflow-y-auto no-scrollbar"
    >
      <p className="font-mono text-xs tracking-[1.5px] md:tracking-[3px] text-accent mb-6">
        {kicker}
      </p>
      <h1 className="font-display text-6xl md:text-8xl font-semibold tracking-tight leading-none">
        {first}
        <br />
        <span className="bg-linear-to-r from-text via-accent to-accent2 bg-clip-text text-transparent">
          {last}
        </span>
      </h1>
      <p className="max-w-lg mt-7 text-lg text-text-muted">{bio}</p>
      <div className="flex gap-3 md:gap-3.5 mt-9">
        <button className="font-display font-semibold text-xs md:text-sm bg-accent text-bg px-5 md:px-7 py-3 md:py-3.5 rounded-full whitespace-nowrap">
          Explore work →
        </button>
        <button className="font-display font-medium text-xs md:text-sm bg-white/5 border border-white/15 px-5 md:px-7 py-3 md:py-3.5 rounded-full whitespace-nowrap">
          Get in touch
        </button>
      </div>
    </section>
  );
}
