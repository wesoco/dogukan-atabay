import type { ComponentType, SVGProps } from "react";

const svgProps: SVGProps<SVGSVGElement> = { viewBox: "0 0 64 64", fill: "none" };

/** Her hizmet için özel ikon (stroke tabanlı, 64x64) */
export const SERVICE_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  "ameliyatsiz-varis-tedavisi": (p) => (
    <svg {...svgProps} {...p}>
      <path d="M20 48v-32M32 16l-12 12 12 12M44 28l-12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="32" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
  "tiroid-nodul-tedavisi": (p) => (
    <svg {...svgProps} {...p}>
      <ellipse cx="32" cy="28" rx="12" ry="10" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M20 38v8M32 38v12M44 38v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="26" r="4" fill="currentColor" opacity="0.4" />
    </svg>
  ),
  "girisimsel-radyoloji": (p) => (
    <svg {...svgProps} {...p}>
      <rect x="12" y="14" width="40" height="36" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M32 22v20M22 32h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
  "biyopsi": (p) => (
    <svg {...svgProps} {...p}>
      <path d="M32 12v40M28 16h8M26 48h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 20l-6 8h12l-6-8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" />
      <circle cx="32" cy="38" r="3" fill="currentColor" opacity="0.3" />
    </svg>
  ),
  "lazerle-varis-tedavisi": (p) => (
    <svg {...svgProps} {...p}>
      <path d="M32 8l8 24-8 24-8-24 8-24z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" />
      <path d="M20 32h24M32 20v24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.3" />
    </svg>
  ),
  "radyofrekansla-varis-tedavisi": (p) => (
    <svg {...svgProps} {...p}>
      <path d="M16 32c4-8 8-8 16-8s12 0 16 8M16 32c4 8 8 8 16 8s12 0 16-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 32c2-4 4-4 8-4s6 0 8 4M36 32c2-4 4-4 8-4s6 0 8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      <circle cx="32" cy="32" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
  "kopuk-skleroterapi": (p) => (
    <svg {...svgProps} {...p}>
      <circle cx="24" cy="28" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="40" cy="36" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="32" cy="22" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M28 26l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
    </svg>
  ),
  "4d-gebe-ultrasonu": (p) => (
    <svg {...svgProps} {...p}>
      <ellipse cx="32" cy="36" rx="14" ry="16" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M32 18v6M32 46v6M18 32h-6M46 32h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  "port-takilmasi": (p) => (
    <svg {...svgProps} {...p}>
      <rect x="24" y="20" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M32 32v16M28 48h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 20V12M26 14l6-2 6 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="26" r="2" fill="currentColor" opacity="0.4" />
    </svg>
  ),
  "kist-abse-drenaji": (p) => (
    <svg {...svgProps} {...p}>
      <circle cx="32" cy="32" r="14" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M32 22v20M26 32h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M28 28l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "bilgisayarli-tomografi": (p) => (
    <svg {...svgProps} {...p}>
      <rect x="14" y="12" width="36" height="40" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M22 22h20M22 32h20M22 42h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="32" cy="28" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.7" />
    </svg>
  ),
  "mr-goruntuleme": (p) => (
    <svg {...svgProps} {...p}>
      <path d="M20 16h24a4 4 0 014 4v24a4 4 0 01-4 4H20a4 4 0 01-4-4V20a4 4 0 014-4z" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M32 24v16M26 32h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  ),
  "xray-goruntuleme": (p) => (
    <svg {...svgProps} {...p}>
      <path d="M16 20l16 24 16-24M16 44l16-24 16 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.3" />
    </svg>
  ),
  "mamografi": (p) => (
    <svg {...svgProps} {...p}>
      <ellipse cx="32" cy="34" rx="12" ry="14" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M24 24c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="32" cy="34" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
    </svg>
  ),
};

const DEFAULT_ICON: ComponentType<SVGProps<SVGSVGElement>> = (p) => (
  <svg viewBox="0 0 64 64" fill="none" {...p}>
    <path d="M32 8v48M20 20l12-12 12 12M20 44l12 12 12-12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.3" />
  </svg>
);

export function getServiceIcon(slug: string): ComponentType<SVGProps<SVGSVGElement>> {
  return SERVICE_ICONS[slug] ?? DEFAULT_ICON;
}
