import { defineConfig } from 'astro/config';

// https://docs.astro.build
export default defineConfig({
  // Replace with the real domain once it is bought.
  site: 'https://theoneconsulting.sk',
  // Small CSS: inline it so nothing blocks the first paint.
  build: { inlineStylesheets: 'always' },
  i18n: {
    defaultLocale: 'en',
    // Add 'sk' here (and src/pages/sk/) when the Slovak version is ready.
    locales: ['en'],
    routing: { prefixDefaultLocale: false },
  },
});
