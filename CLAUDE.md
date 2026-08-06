# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # dev server on :3000 (Turbopack)
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint (flat config, core-web-vitals + typescript)
npx tsc --noEmit # typecheck — tsconfig is noEmit; there is no `typecheck` script
```

No test framework is configured. `npm run build` runs TypeScript itself, so a green build implies a green typecheck.

## Architecture

Portfolio built on Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + React Three Fiber + GSAP. `app/page.tsx` renders one component, `components/Deck.tsx`; `/projects`, `/writing` and `/resume` are separate static routes that share `components/ui/PageShell.tsx`.

**Motion is split deliberately.** GSAP owns *sequenced, interruptible* motion — the deck travel, the screen cross-fade, the hero entrance stagger. CSS `@keyframes` keep the *ambient infinite loops* (`floaty`, `bob`, `pulse-dot`), where the compositor is more efficient and there is nothing to sequence. Don't migrate the ambient loops to GSAP, and don't reintroduce CSS transitions for anything GSAP now drives — two systems writing the same property is the bug this split avoids.

### The deck: one component, two rendering modes

`Deck.tsx` holds the ordered `SCREENS` array — **adding or reordering a section means editing that array plus `SCREEN_IDS` in `lib/deck.ts`**, and the two must stay index-aligned. It renders one of two trees depending on `scrollMode` from `lib/useDeck.ts`:

- **Deck mode (desktop)** — real 3D travel. All seven screens are parked in one `transform-style: preserve-3d` stage at staggered X/Y offsets and `-index * 1500px` on Z (`SCREEN_OFFSETS`, `screenTransform`). Navigation moves *the stage*, not the screens (`stageOffset`), so the browser composites a single transform. A GSAP tween drives that stage with `DECK_EASE`, while each screen tweens `autoAlpha` + `filter` so neighbours sit at 0.04/0.02 opacity and read as distant objects. Body scroll is locked.
- **Scroll mode (≤900px, coarse pointer, or `prefers-reduced-motion`)** — screens flow down the page with `id={SCREEN_IDS[i]}`, and an `IntersectionObserver` syncs the active index back from scroll position.

Screens receive `ScreenProps { scrollMode, goTo }` and must render sensibly in both modes; `components/ui/ScreenBody.tsx` encapsulates the difference (height-capped internal scroll vs. normal flow). Everything imported by `Deck` is in the client bundle — the section components are *not* server components despite lacking `"use client"`.

### Input handling (`lib/useDeck.ts`)

Deliberately more than "wheel → next screen":

- **The URL hash is the source of truth.** `index` comes from `useSyncExternalStore` over a small hash store, not `useState`. Deep links work on first paint and there is no setState-in-effect cascade. `writeHashIndex` must call `emitHashChange()` because `history.replaceState` does not fire `hashchange`.
- **Wheel is accumulated**, not per-event: 110px of delta within a 280ms window advances one screen, then a 1150ms cooldown blocks further moves. Explicit clicks pass `{ immediate: true }` to bypass that cooldown.
- **`scrollableAncestorCanConsume`** walks up from the event target and yields to any ancestor that can still scroll in that direction. Without it, an overflowing screen (Work, Stack) jumps to the next screen instead of scrolling its own content. Both wheel and touch paths use it.

### GSAP (`lib/gsap.ts`)

One registration point exports `gsap`, `useGSAP`, and `DECK_EASE` — a `CustomEase` reproducing the reference's exact `cubic-bezier(.72,.04,.28,1)`. Import GSAP from here, never directly, so plugins are registered exactly once.

- **React must not fight GSAP over the same property.** Screens get their opacity/filter from `initialScreenStyle(i, initialIndex)`, where `initialIndex` is frozen with `useState(index)` — constant across renders, so React never rewrites what GSAP is animating. Deriving it from the live `index` would make React clobber every tween mid-flight.
- Freeze it with `useState`, not a ref: reading `ref.current` during render trips `react-hooks/refs`.
- `useGSAP`'s `revertOnUpdate` defaults to `false`, which is what the deck relies on — dependency changes re-run the tweens without reverting the previous ones. Turning it on would snap the stage back on every navigation.
- The first run uses `duration: 0` (`hasTravelled` ref) so a deep link lands instantly instead of flying in from Home.
- `overwrite: "auto"` keeps rapid navigation from stacking conflicting tweens.
- Reduced motion is handled *in JS* — `gsap.matchMedia` in Hero, the `prefersReducedMotion` flag in Deck. The blanket `@media (prefers-reduced-motion: reduce)` rule in `globals.css` only stops CSS animations; it has no effect on GSAP tweens.

### Gotchas that have already bitten

- Deep links in scroll mode: the browser's native anchor scroll does not survive hydration, so `Deck` scrolls explicitly and gates the `IntersectionObserver` behind a 350ms settle — otherwise the observer reports Home and clobbers the target hash.
- Do not add `scroll-padding-top` to `html`. Each screen carries its own `pt-24` for header clearance; both together double the gap on deep links. Standalone pages use per-element `scroll-mt-*`.
- Never name a `@theme` font token `--font-mono` and point it at a `next/font` variable of the same name — it resolves to nothing. The mono variable is `--font-plex-mono`.

### Scene (`scene/Scene.tsx`)

React Three Fiber. Two shader `Points` starfields with per-star twinkle, plus wireframe icosahedron/octahedron/torus, declared as JSX so R3F owns the renderer lifecycle, resize and disposal. `CameraRig` eases camera Z toward `40 - index * 70` in `useFrame`, so the 3D background travels with the deck. Loaded via `next/dynamic` with `ssr: false` to keep it off the initial bundle and off the server.

- Star buffers are built with a **seeded PRNG (`makeRng`), not `Math.random`** — `useMemo` runs during render, and React 19's `react-hooks/purity` lint rejects impure calls there. It also makes the field deterministic across reloads. Keep the seeds stable or the layout shifts.
- `frameloop` is toggled to `"never"` on `visibilitychange` so a background tab costs nothing.
- `<Canvas fallback={null}>` covers browsers without WebGL.
- Star counts halve on narrow or low-core devices (`scale`).
- `reducedMotion` freezes twinkle and mesh rotation but **not** camera easing — the deck must still be able to move between screens.

### Content and styling

All copy lives in the single `portfolioData` object in `lib/data.ts`, typed by `types/portfolio.ts`. Sections import it directly rather than taking props. `Project.featured` selects which projects appear on the deck's Work screen; `/projects` lists them all.

Tailwind v4 is configured entirely in `app/globals.css` via `@theme` — there is no `tailwind.config`. Use the tokens (`bg-bg`, `text-text`, `text-text-muted`, `text-text-dim`, `text-accent`, `text-accent2`, `border-line`, `border-line-strong`) and the `panel` / `thin-scrollbar` / `no-scrollbar` custom utilities rather than raw values. Fluid heading sizes are tokens too: `text-hero`, `text-section`, `text-contact`. Fonts are `font-sans` (Sora), `font-display` (Space Grotesk), `font-mono` (IBM Plex Mono).

Layout-critical geometry (world transform, per-screen transforms, canvas positioning) is written as inline `style` objects because the values are computed; Tailwind handles everything static. Keep that split.

### Verifying changes

`npm run build` catches types but not layout. To check rendering, drive a real browser at several widths and **look at the screenshots** — deck mode, scroll mode, and the ≤900px boundary between them behave differently. Note that Chrome's `--virtual-time-budget` freezes CSS animations near t=0, which makes the hero's `animate-rise` content look missing and the world transform look unapplied; use a driver that waits in real time instead.
