import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt'],
  css: ['~/assets/css/style.css'],
  routeRules: {
    // dashboard privat: render di browser saja, data dari API setelah login
    '/dashboard/**': { ssr: false }
  },
  runtimeConfig: {
    // server-only, tidak pernah dikirim ke browser
    xibraApiBase: process.env.XIBRA_API_BASE || 'http://localhost:8000',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    }
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['preline']
    }
  }
})
