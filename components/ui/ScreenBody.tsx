import type { ReactNode } from "react";

interface ScreenBodyProps {
  scrollMode: boolean;
  className?: string;
  children: ReactNode;
}

export default function ScreenBody({
  scrollMode,
  className = "max-w-[1120px]",
  children,
}: ScreenBodyProps) {
  return (
    <div
      className={`w-full ${className} ${
        scrollMode ? "" : "thin-scrollbar max-h-full overflow-y-auto px-3 pb-5 pt-2"
      }`}
    >
      {children}
    </div>
  );
}
