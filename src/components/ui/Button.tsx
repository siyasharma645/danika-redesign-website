import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'outline-light' | 'brand' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-btn font-bold leading-none whitespace-nowrap select-none transition duration-200 ease-out active:translate-y-px';
const variants: Record<Variant, string> = {
  primary: 'bg-accent-500 text-ink hover:bg-accent-400',
  secondary: 'border border-line bg-white text-brand-800 hover:border-brand-700',
  'outline-light': 'border border-white/50 text-white hover:bg-white hover:text-brand-700',
  brand: 'bg-brand-700 text-white hover:bg-brand-800',
  ghost: 'text-brand-700 hover:bg-brand-50',
};
const sizes: Record<Size, string> = {
  md: 'min-h-[48px] px-5 py-3 text-[0.95rem]',
  lg: 'min-h-[56px] px-7 py-4 text-base',
};

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

/** Anchor styled as a button. All CTAs on this page are real links (tel:, #anchor or original-site URLs). */
export function ButtonLink({ variant = 'primary', size = 'md', className, children, ...rest }: Props) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </a>
  );
}

export function buttonClasses(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}
