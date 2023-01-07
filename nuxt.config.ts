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
const CMS_API_URL = "https://api.articles.maximemoreillon.com"
// const CMS_API_URL = "https://api.articles.maximemoreillon.com"
const LOGIN_URL = "https://api.users.maximemoreillon.com/v2/auth/login"
const IDENTIFICATION_URL = "https://api.users.maximemoreillon.com/v2/users/self"
const IMAGE_MANAGER_API_URL = "https://img.maximemoreillon.com"
const CANONICAL_URL = "https://articles.maximemoreillon.com"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: CMS_API_URL,
      loginUrl: LOGIN_URL,
      idenfiticationUrl: IDENTIFICATION_URL,
      imageManagerApiUrl: IMAGE_MANAGER_API_URL,
      canonicalUrl: CANONICAL_URL,
    },
  },
  modules: ["nuxt-icon"],
  app: {
    head,
  },
})
