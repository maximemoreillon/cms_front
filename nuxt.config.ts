import head from "./appHead"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: "",
      loginUrl: "",
      identificationUrl: "",
      imageManagerApiUrl: "",
      canonicalUrl: "",
    },
  },
  modules: ["nuxt-icon", "@nuxtjs/robots"],

  app: {
    head,
  },
})
