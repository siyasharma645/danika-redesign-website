import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow, title, children, align = 'left', light = false, className,
}: {
  eyebrow?: string; title: ReactNode; children?: ReactNode; align?: 'left' | 'center'; light?: boolean; className?: string;
}) {
  return (
    <div className={cn('max-w-4xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p className={cn('eyebrow', light && '!text-accent-400', align === 'center' && 'justify-center')}>{eyebrow}</p>
      )}
      <h2 className={cn('h2', light && '!text-white')}>{title}</h2>
      {children && <p className={cn('lead mt-4', light && '!text-brand-100')}>{children}</p>}
    </div>
  );
}
