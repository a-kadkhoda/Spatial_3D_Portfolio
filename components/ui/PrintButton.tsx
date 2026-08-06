"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="cursor-pointer rounded-full border border-line-strong px-4 py-2 font-mono text-[11px] tracking-[2px] text-text-muted transition-colors hover:border-accent hover:text-accent print:hidden"
    >
      PRINT / SAVE PDF ↓
    </button>
  );
}
