import React from 'react';
import menaLogoSrc from '../assets/images/Mena-logo.png';

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
