import type { SVGProps } from 'react';

export function SriDevLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="1em"
      height="1em"
      {...props}
    >
      <defs>
        <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#FDF17C', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#D4AF37', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        fill="url(#gold-gradient)"
        d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.45,142.22a8,8,0,0,1-11.31,0L128,132.11l-34.14,34.11a8,8,0,0,1-11.32-11.31L116.69,128,82.55,93.86a8,8,0,0,1,11.32-11.31L128,116.69l34.14-34.14a8,8,0,0,1,11.31,11.31L139.31,128Z"
      />
    </svg>
  );
}