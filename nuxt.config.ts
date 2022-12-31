import head from "./appHead"

const {
  CMS_API_URL,
  LOGIN_URL,
  IDENTIFICATION_URL,
  IMAGE_MANAGER_API_URL,
  CANONICAL_URL,
  //} = process.env
  // debugging
} = {
  CMS_API_URL: "https://api.articles.maximemoreillon.com",
  LOGIN_URL: "https://api.users.maximemoreillon.com/v2/auth/login",
  IDENTIFICATION_URL: "https://api.users.maximemoreillon.com/v2/users/self",
  IMAGE_MANAGER_API_URL: "https://img.maximemoreillon.com",
  CANONICAL_URL: "https://articles.maximemoreillon.com",
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // TODO: use environment variables
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
