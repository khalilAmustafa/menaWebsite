import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Consistent page-width wrapper using the site's existing container pattern
 * (`w-[90%] mx-auto`, the same width used by every homepage section). It does not
 * introduce a new spacing scale — callers add their own vertical padding via className.
 */
export default function PageContainer({ children, className = '' }: PageContainerProps) {
  return <div className={`page-container ${className}`.trim()}>{children}</div>;
}
