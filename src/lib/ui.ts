/** Class strings shared across components. */

/** Text link: underlined, muted, darkening on hover. Used in content and in the footer. */
export const link = "underline underline-offset-2 text-muted-foreground-1 hover:text-foreground";

// Buttons, built from Preline's button variants. Only the "Get in touch" section
// uses them, and that section is switched off for now (see src/pages/index.astro).

const base =
  "inline-flex items-center justify-center gap-x-2 border text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary:
    "border-primary-line bg-primary text-primary-foreground hover:bg-primary-hover focus:bg-primary-focus",
  white:
    "border-layer-line bg-layer text-layer-foreground shadow-2xs hover:bg-layer-hover focus:bg-layer-focus",
};

const sizes = {
  sm: "px-3 py-2",
  md: "px-4 py-2.5",
};

export interface ButtonOptions {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  /** Fully rounded, for chip-like links. */
  pill?: boolean;
}

export function button({ variant = "white", size = "md", pill = false }: ButtonOptions = {}): string {
  return [base, variants[variant], sizes[size], pill ? "rounded-full" : "rounded-lg"].join(" ");
}
