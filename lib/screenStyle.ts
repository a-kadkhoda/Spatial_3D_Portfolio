export function getScreenStyle(screenIndex: number, activeIndex: number) {
  const distance = screenIndex - activeIndex;
  const isActive = distance === 0;

  const z = distance * -1500;

  const opacity = isActive ? 1 : 0;

  const pointerEvents: "auto" | "none" = isActive ? "auto" : "none";

  return {
    transform: `translate3d(0px, 0px, ${z}px)`,
    opacity,
    pointerEvents,
    transition: "opacity .9s ease, filter .9s ease",
  };
}
