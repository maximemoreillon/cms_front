import head from "./appHead"

// PROBLEM: Env vars are read at build time and not runTime
// const {
//   CMS_API_URL,
//   LOGIN_URL,
//   IDENTIFICATION_URL,
//   IMAGE_MANAGER_API_URL,
//   CANONICAL_URL,
// } = process.env

//  using constants in the meantime
// const CMS_API_URL = "http://192.168.1.2:7070"

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
  modules: ["nuxt-icon"],
  app: {
    head,
  },
})
