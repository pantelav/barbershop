// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {
    '/admin': { redirect: '/admin/orders' }
  },
  runtimeConfig: {
    public: {
      apiYandex: '',
      api: '',
    }
  },
  css: [
    '~/assets/styles/main.scss',
    '~/assets/styles/admin.scss',
    "primevue/resources/themes/arya-orange/theme.css",
    "primevue/resources/primevue.css",
    "primeicons/primeicons.css"
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  modules: [
    '@nuxt/image-edge',
  ],
  build: {
    transpile: ["primevue"]
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/colors.scss" as *;'
        }
      }
    }
  }
})
