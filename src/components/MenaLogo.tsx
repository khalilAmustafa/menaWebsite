import React from 'react';
// Web-optimized copy (512×768, ~45 KB) of the 1024×1536 / ~2.09 MB master
// `Mena-logo.png`, which is retained untouched alongside it as the source of truth.
// The logo renders at most 112 CSS px wide (Header/Footer `w-28`), so 512 px still
// covers 4x-DPR displays.
import menaLogoSrc from '../assets/images/Mena-logo-web.png';

interface MenaLogoProps {
  className?: string;
  color?: string;
  size?: number | string;
}

export default function MenaLogo({ className = '', color = 'currentColor', size = '100%' }: MenaLogoProps) {
  return (
    <img
      src={menaLogoSrc}
      alt="MENA Space Organization Logo"
      className={className}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        height: 'auto',
        objectFit: 'contain',
      }}
    />
  );
}
