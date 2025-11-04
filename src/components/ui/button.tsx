'use client';

import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'default' | 'outline' | 'ghost' | 'warning';
type Size = 'default' | 'sm' | 'lg' | 'icon';

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: Variant;
  size?: Size;
};

const baseClasses =
  'inline-flex items-center justify-center rounded-full font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60';

const variantClasses: Record<Variant, string> = {
  default: 'bg-purple-600 text-white hover:bg-purple-700',
  outline:
    'border border-purple-200 bg-white text-purple-700 hover:bg-purple-50',
  ghost: 'bg-transparent text-purple-600 hover:bg-purple-50 border border-transparent',
  warning: 'bg-orange-500 text-white hover:bg-orange-500/90',
};

const sizeClasses: Record<Size, string> = {
  default: 'px-6 py-3 text-base',
  sm: 'px-4 py-2 text-sm',
  lg: 'px-8 py-4 text-lg',
  icon: 'h-10 w-10 p-0',
};

export function Button({
  className,
  variant = 'default',
  size = 'default',
  type = 'button',
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      type={type}
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    />
  );
}
