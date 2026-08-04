"use client";

interface ChromeProps {
  index: number;
  goTo: (target: number) => void;
  labels: string[];
}

export default function Chrome({ index, goTo, labels }: ChromeProps) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "22px 32px",
        }}
      >
        <button
          onClick={() => goTo(0)}
          className="font-mono text-sm tracking-[2px] text-text"
        >
          AK<span className="text-accent">∴</span>
        </button>

        <div className="flex items-center gap-5">
          <span className="flex items-center gap-2 font-mono text-[11px] tracking-[2px] text-text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-[pulse_2.2s_ease-in-out_infinite]" />
            OPEN TO WORK
          </span>

          <a
            href="#"
            className="font-mono text-[11px] tracking-[2px] text-text-muted border border-white/20 px-4 py-2 rounded-full"
          >
            CV ↓
          </a>

          <a
            href="mailto:aliakbarkadkhoda@proton.me"
            className="font-mono text-[11px] tracking-[2px] font-medium text-bg bg-accent px-4.5 py-2 rounded-full"
          >
            EMAIL ME
          </a>
        </div>
      </div>

      {/* nav rail */}
      <div
        style={{
          position: "absolute",
          left: 32,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 60,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        {labels.map((label, i) => {
          const isActive = i === index;
          return (
            <button
              key={label}
              onClick={() => goTo(i)}
              className={`flex items-center gap-2.5 font-mono text-[11px] tracking-[2px] ${isActive ? "text-accent" : "text-text-muted"}`}
            >
              <span
                className={`w-2 h-px ${isActive ? "bg-accent" : "bg-text-muted"}`}
              />

              {label}
            </button>
          );
        })}
      </div>
    </>
  );
}
