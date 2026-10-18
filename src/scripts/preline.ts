/**
 * Preline loader, per https://preline.co/docs/frameworks-astro.html.
 *
 * The optional third-party libraries from the guide (jQuery, Lodash, Dropzone,
 * noUiSlider, DataTables, Vanilla Calendar) are left out: nothing on this site
 * uses the plugins that need them. Add them back here, and their types in
 * `src/global.d.ts`, if one of those plugins is ever used.
 */

async function initPreline() {
  try {
    const { HSStaticMethods } = await import('preline/non-auto');
    HSStaticMethods.autoInit();
  } catch (e) {
    console.warn('[preline] initialization error:', e);
  }
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPreline);
else initPreline();

document.addEventListener('astro:page-load', initPreline);
