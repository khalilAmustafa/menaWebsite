import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToSection } from '../lib/scrollToSection';

/**
 * Centralised route-scroll behaviour (single source, so there is no race between
 * "scroll to top" and "scroll to hash section"):
 *
 *  - No hash  → scroll to the top on route change (also on browser back/forward).
 *  - Has hash (e.g. `/#about`, direct-load, refresh, or cross-route navigation) → keep
 *    the target section pinned at the fixed-header offset for a short bounded window of
 *    animation frames. Re-pinning each frame overrides the browser's native fragment
 *    scroll and corrects for the tall homepage's late layout shifts (mount, web-font
 *    reflow, images/motion) without an arbitrary timeout. The offset comes from the
 *    existing `scroll-padding-top` (index.css), so there is no new magic number.
 *
 * Uses `useLocation`, so it also runs on browser back/forward navigation.
 * Scroll restoration is set to `manual` in `main.tsx` so the browser cannot override this.
 */
export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    }

    const id = hash.slice(1);
    let raf = 0;
    let frames = 0;

    const offset = () => {
      const p = parseInt(getComputedStyle(document.documentElement).scrollPaddingTop, 10);
      return Number.isFinite(p) ? p : 0;
    };

    const correct = () => {
      const el = document.getElementById(id);
      if (el && Math.abs(Math.round(el.getBoundingClientRect().top) - offset()) > 2) {
        // instant correction ('auto' overrides the CSS smooth-scroll during settling)
        scrollToSection(id, 'auto');
      }
      if (frames < 90) {
        frames += 1;
        raf = requestAnimationFrame(correct);
      }
    };

    raf = requestAnimationFrame(correct);
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash, key]);

  return null;
}
