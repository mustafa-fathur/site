// Window typings from Preline's Astro guide, trimmed to what this site loads
// (no jQuery, Lodash, Dropzone, noUiSlider, DataTables or Vanilla Calendar).
declare global {
  interface Window {
    HSStaticMethods?: {
      autoInit: (collection?: string[]) => void
    }
  }
};

export {};
