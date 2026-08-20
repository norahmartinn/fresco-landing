import type { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 100 100",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function TomatoDoodle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="50" cy="58" r="30" />
      <path d="M50 28c-6-6-14-8-20-6 2 6 8 11 14 12M50 28c6-6 14-8 20-6-2 6-8 11-14 12M50 28v6" />
      <path d="M38 50c-3 5-3 12 0 17" opacity="0.5" />
    </svg>
  );
}

export function BasilDoodle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M50 88V40" />
      <path d="M50 52c-16 4-24-6-24-18 14-2 22 6 24 18ZM50 46c16 4 24-6 24-18-14-2-22 6-24 18Z" />
      <path d="M50 34c-10 0-16-8-14-18 10 0 15 8 14 18Z" />
    </svg>
  );
}

export function AubergineDoodle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M66 34c10 10 8 30-6 40S30 86 24 74s2-30 16-36 18-10 26-4Z" />
      <path d="M62 30c-4-6-10-9-16-8 1 6 5 11 11 13M62 30l8-8" />
    </svg>
  );
}

export function PotatoDoodle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M24 52c2-16 18-26 34-24s26 14 22 30-18 26-34 24-24-14-22-30Z" />
      <path d="M40 48h.01M56 42h.01M52 62h.01" strokeWidth="6" />
    </svg>
  );
}

export function LemonDoodle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M22 62c-6-14 6-32 24-36s32 6 32 22-14 30-30 30-22-6-26-16Z" />
      <path d="M78 44l8-8M32 66c4 4 10 6 16 5" opacity="0.6" />
    </svg>
  );
}

export function ArrowDoodle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 60" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" {...props}>
      <path d="M4 34c22-22 56-30 92-16" />
      <path d="M84 6c6 5 10 8 12 12-5 2-9 5-13 10" />
    </svg>
  );
}

export function UnderlineDoodle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 16" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" {...props}>
      <path d="M4 10c46-8 106-9 192-3" />
    </svg>
  );
}
