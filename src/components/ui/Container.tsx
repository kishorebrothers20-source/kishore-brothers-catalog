import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  as?: React.ElementType;
}

export function Container({
  children,
  size = 'lg',
  as: Component = 'div',
  className,
  ...props
}: ContainerProps) {
  const sizes = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-8xl',
    full: 'max-w-full',
  };

  return (
    <Component
      className={cn('mx-auto px-4 sm:px-6 lg:px-8 w-full', sizes[size], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
