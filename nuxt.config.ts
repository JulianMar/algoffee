// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  ssr: false,
  app: {
    head: {
      meta: [
        {name: 'viewport', content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"},
        {name: 'apple-mobile-web-app-capable', content: "yes"}
      ]
    }
  }
})