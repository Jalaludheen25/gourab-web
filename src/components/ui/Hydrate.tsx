import { Suspense, type ReactNode } from "react";

/**
 * Hydration boundary. Content is fully server-rendered, but each boundary
 * lets React hydrate the page in smaller, interruptible chunks (selective
 * hydration) instead of one long main-thread task.
 *
 * `offscreen` additionally lets phones skip layout and paint for the chapter
 * until it nears the viewport (content-visibility). Desktop is excluded so
 * pinned ScrollTriggers always measure real layout.
 */
export function Hydrate({ children, offscreen = false }: { children: ReactNode; offscreen?: boolean }) {
  const content = <Suspense fallback={null}>{children}</Suspense>;
  if (!offscreen) return content;
  return <div className="max-lg:[contain-intrinsic-size:auto_1400px] max-lg:[content-visibility:auto]">{content}</div>;
}
