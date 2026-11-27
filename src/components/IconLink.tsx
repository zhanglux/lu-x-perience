'use client';

import { useRef } from 'react';
import { Link } from 'react-aria-components';

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
  /** Gets the native click, so a caller can preventDefault (as the smooth scroll does). */
  onClick?: (event: React.MouseEvent<Element>) => void;
}

const VARIANTS = {
  primary: 'bg-foreground text-background data-hovered:opacity-85',
  secondary: 'border border-line-strong text-foreground data-hovered:bg-muted',
};

/**
 * A link styled as a button with an animated icon, built on React Aria's Link.
 * The icon plays while the whole button is hovered or focused, not just the glyph.
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
    <Link
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      onClick={onClick}
      onHoverStart={() => iconRef.current?.startAnimation()}
      onHoverEnd={() => iconRef.current?.stopAnimation()}
      onFocus={() => iconRef.current?.startAnimation()}
      onBlur={() => iconRef.current?.stopAnimation()}
      className={`inline-flex items-center gap-2 rounded-control px-4 py-2 text-sm font-medium outline-none transition-all data-focus-visible:outline-2 data-focus-visible:outline-solid data-focus-visible:outline-offset-2 data-focus-visible:outline-primary ${VARIANTS[variant]}`}
    >
      {!iconAfter && icon}
      <span>{label}</span>
      {iconAfter && icon}
    </Link>
  );
}
