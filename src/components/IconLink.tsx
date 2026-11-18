'use client';

import { useRef } from 'react';

type AnimatedIconHandle = {
  startAnimation: () => void;
  stopAnimation: () => void;
};

export type AnimatedIcon = React.ForwardRefExoticComponent<
  { size?: number; className?: string } & React.RefAttributes<AnimatedIconHandle>
>;

interface IconLinkProps {
  href: string;
  label: string;
  Icon: AnimatedIcon;
  /** `primary` is the filled button; `secondary` is the outlined one. */
  variant?: 'primary' | 'secondary';
  external?: boolean;
  /** Put the icon after the label (for directional icons like an arrow). */
  iconAfter?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const VARIANTS = {
  primary: 'bg-foreground text-background hover:opacity-85',
  secondary: 'border border-foreground/20 text-foreground hover:bg-muted',
};

/**
 * A link styled as a button with an animated icon. The icon plays while the
 * whole button is hovered or focused, not just the glyph.
 */
export function IconLink({
  href,
  label,
  Icon,
  variant = 'secondary',
  external,
  iconAfter,
  onClick,
}: IconLinkProps) {
  const iconRef = useRef<AnimatedIconHandle>(null);
  const icon = <Icon ref={iconRef} size={16} className="shrink-0" />;

  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      onClick={onClick}
      onMouseEnter={() => iconRef.current?.startAnimation()}
      onMouseLeave={() => iconRef.current?.stopAnimation()}
      onFocus={() => iconRef.current?.startAnimation()}
      onBlur={() => iconRef.current?.stopAnimation()}
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${VARIANTS[variant]}`}
    >
      {!iconAfter && icon}
      <span>{label}</span>
      {iconAfter && icon}
    </a>
  );
}
