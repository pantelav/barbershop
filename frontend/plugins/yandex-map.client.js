import plugin from 'vue-yandex-maps'
import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app'
const settings = (api) => {
  return {
    apiKey: api,
    lang: 'ru_RU',
    coordorder: 'latlong',
    debug: false,
    version: '2.1'
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  nuxtApp.vueApp.use(plugin, settings(runtimeConfig.public.apiYandex))
})