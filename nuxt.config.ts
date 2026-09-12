export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  // `nuxt generate` prerenders what it can crawl from your links. A route
  // reachable only by a form submit or a dynamic parameter is missed, and the
  // symptom is a 404 on a page that works in development — list those here.
  nitro: {
    prerender: { routes: ['/about'] },
  },
});
