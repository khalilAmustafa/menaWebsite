import { useEffect } from 'react';

/**
 * Minimal document metadata helper. No SEO framework and no new dependency — this project is a
 * client-only Vite SPA, so route-level tags are applied at runtime after hydration.
 *
 * IMPORTANT LIMITATION (documented, not worked around): crawlers and social-media unfurlers that
 * do not execute JavaScript will only ever see the static tags in index.html. Per-route Open
 * Graph previews would require pre-rendering or SSR, which is a build-architecture change well
 * beyond a QA pass. The static index.html tags are therefore the ones that must be safe and
 * accurate for sharing; these runtime tags improve the in-browser experience.
 */

const SITE_SUFFIX = 'MENA';

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Sets `document.title` (and optionally the description / og:title / og:description) while the
 * component is mounted, restoring the previous values on unmount so navigating away never leaves
 * stale metadata behind.
 *
 * @param title Full title including the "| MENA" suffix, or a bare page name.
 * @param description Optional. Must be grounded in confirmed copy — never write a claim here
 *                    that the page itself does not already support.
 */
export function useDocumentTitle(title: string, description?: string): void {
  useEffect(() => {
    const previousTitle = document.title;
    const descEl = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDesc = descEl?.getAttribute('content') ?? '';

    const fullTitle = title.includes(SITE_SUFFIX) ? title : `${title} | ${SITE_SUFFIX}`;
    document.title = fullTitle;
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);

    if (description) {
      setMeta('meta[name="description"]', 'name', 'description', description);
      setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    }

    return () => {
      document.title = previousTitle;
      if (description && previousDesc) {
        setMeta('meta[name="description"]', 'name', 'description', previousDesc);
        setMeta('meta[property="og:description"]', 'property', 'og:description', previousDesc);
      }
    };
  }, [title, description]);
}
