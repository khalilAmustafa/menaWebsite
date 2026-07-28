/**
 * Scroll a homepage section into view by its element id.
 *
 * Uses an explicit `window.scrollTo` (rather than `element.scrollIntoView`) because the
 * app's root wrapper uses `overflow-x-hidden`, which computes `overflow-y` to `auto` and
 * makes `scrollIntoView`'s "nearest scroll container" ambiguous. Scrolling the window
 * explicitly is deterministic.
 *
 * The fixed-header clearance offset is read from the existing `scroll-padding-top`
 * (index.css), so there is no new/duplicated magic number.
 *
 * @returns true if the target element existed and a scroll was issued.
 */
export function scrollToSection(id: string, behavior: ScrollBehavior = 'smooth'): boolean {
  const el = document.getElementById(id);
  if (!el) return false;

  const paddingTop = parseInt(getComputedStyle(document.documentElement).scrollPaddingTop, 10);
  const offset = Number.isFinite(paddingTop) ? paddingTop : 0;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top, left: 0, behavior });
  return true;
}
