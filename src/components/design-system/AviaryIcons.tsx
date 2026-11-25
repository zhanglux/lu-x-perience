import type { SVGProps } from 'react';

/** Line icons for the two aviary terms Lucide has no icon for, drawn on Lucide's 24px grid and stroke. */
function Base({ size = 20, children, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

/** Plumage: three feathers fanned from one point. */
export function PlumageIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Base {...props}>
      <path d="M12 21C8.5 17 8.5 8 12 3c3.5 5 3.5 14 0 18Z" />
      <path d="M12 21C7 19.5 3.5 14.5 3 9c3 .5 5 2 6.3 4" />
      <path d="M12 21c5-1.5 8.500-6.500 9-12-3 .5-5 2-6.300 4" />
    </Base>
  );
}

/** Twig: a branch with two side shoots and a leaf. */
export function TwigIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Base {...props}>
      <path d="M3 21 21 3" />
      <path d="M9 15H4" />
      <path d="M13 11V5" />
      <path d="M15 9h3.500a2.500 2.500 0 0 1 2.500 2.500V12h-3.500A2.500 2.500 0 0 1 15 9.500Z" />
    </Base>
  );
}
