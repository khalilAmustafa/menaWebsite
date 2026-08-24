import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { MediaItem } from '../../content/types';

interface EventGalleryProps {
  images: MediaItem[];
  isArabic?: boolean;
}

/**
 * Accessible event photo gallery with a keyboard-navigable lightbox. Matches the existing
 * MENA card language (rounded-2xl panels, subtle borders, brand-teal focus rings) and the
 * shared light/dark theme tokens. Images are lazy-loaded; alt text comes from the content
 * layer and never asserts identities or winners.
 */
export default function EventGallery({ images, isArabic = false }: EventGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const alt = (m: MediaItem) => (isArabic && m.alt.ar ? m.alt.ar : m.alt.en);
  // Prefer the richer descriptive caption where the content layer supplies one (the
  // captions migrated from the retired homepage field-archive gallery); otherwise the
  // alt text, which every media item has, stands in.
  const caption = (m: MediaItem) =>
    m.caption ? (isArabic && m.caption.ar ? m.caption.ar : m.caption.en) : alt(m);

  const close = useCallback(() => {
    setActiveIndex((current) => {
      if (current !== null) triggerRefs.current[current]?.focus();
      return null;
    });
  }, []);
  const next = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );
  const prev = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'Tab') {
        const dialog = document.querySelector<HTMLElement>('[role="dialog"]');
        const focusable = dialog?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [activeIndex, close, next, prev]);

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 auto-rows-[42vw] gap-3 sm:grid-cols-3 sm:auto-rows-[28vw] sm:gap-4 lg:grid-cols-4 lg:auto-rows-[22vw]">
        {images.map((image, i) => (
          <button
            key={image.id}
            ref={(el) => {
              triggerRefs.current[i] = el;
            }}
            type="button"
            onClick={() => setActiveIndex(i)}
            aria-label={
              isArabic ? `تكبير الصورة: ${alt(image)}` : `Open image: ${alt(image)}`
            }
            className={`group relative overflow-hidden rounded-xl border border-[var(--page-border)] bg-[var(--page-surface-raised)] transition-[border-color,transform] duration-300 hover:border-brand-teal/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/50 ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
          >
            <img
              src={image.src}
              alt={alt(image)}
              width={image.width}
              height={image.height}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={isArabic ? 'عارض الصور' : 'Image viewer'}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden overscroll-contain bg-black/95 p-2 backdrop-blur-md sm:p-8"
            onClick={close}
          >
            <button
              type="button"
              autoFocus
              onClick={close}
              aria-label={isArabic ? 'إغلاق' : 'Close'}
              className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full border border-neutral-800 bg-neutral-900/80 text-neutral-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/50 sm:right-4 sm:top-4"
            >
              <X className="h-5 w-5" />
            </button>

            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label={isArabic ? 'الصورة السابقة' : 'Previous image'}
                className="absolute left-2 z-10 grid h-11 w-11 place-items-center rounded-full border border-neutral-800 bg-neutral-900/70 text-white transition-colors hover:bg-brand-teal/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/50 sm:left-6"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}

            <figure className="flex max-h-[88dvh] w-full max-w-3xl flex-col items-center px-10 sm:px-0" onClick={(e) => e.stopPropagation()}>
              <img
                src={images[activeIndex].src}
                alt={alt(images[activeIndex])}
                width={images[activeIndex].width}
                height={images[activeIndex].height}
                className="max-h-[76dvh] max-w-full rounded-xl border border-neutral-800 object-contain sm:rounded-2xl"
              />
              <figcaption className="mt-3 max-w-xl text-center font-sans text-xs text-neutral-400">
                {caption(images[activeIndex])}
                <span className="ml-2 font-mono text-[10px] text-neutral-600">
                  {activeIndex + 1} / {images.length}
                </span>
              </figcaption>
            </figure>

            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label={isArabic ? 'الصورة التالية' : 'Next image'}
                className="absolute right-2 z-10 grid h-11 w-11 place-items-center rounded-full border border-neutral-800 bg-neutral-900/70 text-white transition-colors hover:bg-brand-teal/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/50 sm:right-6"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
