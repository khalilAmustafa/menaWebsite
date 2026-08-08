import { useEffect } from 'react';

/**
 * Minimal document-title helper (no SEO framework — that's a later phase). Sets
 * `document.title` while the component is mounted and restores the previous title on
 * unmount / title change, so navigating away doesn't leave a stale page title.
 */
export function useDocumentTitle(title: string): void {
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
