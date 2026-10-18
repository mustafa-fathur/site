// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import { SITE_URL } from './src/config.ts';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL || undefined,
  // 4321 and 4322 are taken by the portfolio and the blog.
  server: { port: 4323 },
  vite: {
    plugins: [tailwindcss()]
  }
});
