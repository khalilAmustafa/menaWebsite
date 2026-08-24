import React from 'react';
// Web-optimized copy (512×768, ~45 KB) of the 1024×1536 / ~2.09 MB master
// Both optimized variants are official marks prepared for their respective themes.
// The logo renders at most 112 CSS px wide (Header/Footer `w-28`), so 512 px still
// covers 4x-DPR displays.
import menaLogoSrc from '../assets/images/Mena-logo-web.png';
/**
 * Phase 7: official LIGHT-BACKGROUND variant of the same mark, derived from the official
 * brand asset `LOGOS/4.png` (the stacked logo in brand tan #DBB58F on a flat white plate).
 * The brand sheet `LOGOS/7.png` shows the white-on-dark and tan-on-light lock-ups side by
 * side, so both are officially sanctioned — this is a variant SWAP, not a recolor: the
 * white plate was keyed out to alpha and the mark's own tan is untouched. Framing matches
 * `Mena-logo-web.png` exactly (same 512×768 canvas, same relative bounding box), so the two
 * themes render at identical size and position — no layout difference between themes.
 */
import menaLogoLightSrc from '../assets/images/Mena-logo-light.png';

interface MenaLogoProps {
  className?: string;
  color?: string;
  size?: number | string;
}

/**
 * Renders both official variants and lets CSS pick one by theme (`.mena-logo--dark` /
 * `.mena-logo--light` in index.css, driven by the same `body.light-mode` class that owns
 * the rest of light mode). Doing the swap in CSS rather than JS keeps it consistent with
 * how this project already themes everything, and avoids a flash of the wrong logo.
 */
export default function MenaLogo({ className = '', color = 'currentColor', size = '100%' }: MenaLogoProps) {
  const style = {
    width: typeof size === 'number' ? `${size}px` : size,
    height: 'auto',
    objectFit: 'contain' as const,
  };

  return (
    <>
      <img src={menaLogoSrc} alt="MENA Space Organization Logo" width={512} height={768} className={`mena-logo--dark ${className}`} style={style} />
      {/* Decorative duplicate: the variant above already carries the accessible name. */}
      <img src={menaLogoLightSrc} alt="" aria-hidden="true" width={512} height={768} className={`mena-logo--light ${className}`} style={style} />
    </>
  );
}
