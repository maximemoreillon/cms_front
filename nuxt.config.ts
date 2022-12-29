// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // TODO: use environment variables
    public: {
      apiBase: "https://api.articles.maximemoreillon.com",
      loginUrl: "https://api.users.maximemoreillon.com/v2/auth/login",
      idenfiticationUrl: "https://api.users.maximemoreillon.com/v2/users/self",
      imageManagerApiUrl: "https://img.maximemoreillon.com",
    },
  },
  app: {
    head: {
      title: "Articles | Maxime Moreillon",
      meta: [
        { name: "description", content: "Articles | Maxime Moreillon" },

        // Twitter
        { name: "twitter:card", content: "summary" },
        { name: "twitter:site", content: "@m_moreillon" },
        { name: "twitter:title", content: "Articles | Maxime Moreillon" },
        {
          name: "twitter:description",
          content: "An article management system",
        },
        {
          name: "twitter:image",
          content: "https://cdn.maximemoreillon.com/logo/thick/logo.png",
        },
        { name: "twitter:image:alt", content: "Moreillon logo" },

        // OpenGraph
        { name: "og:title", content: "An article management system" },
        { name: "og:description", content: "Articles | Maxime Moreillon" },
        {
          name: "og:image",
          content: "https://cdn.maximemoreillon.com/logo/thick/logo.png",
        },
        // TODO: fix this
        // { name: "og:url", content: `${article.value?.title} thumbnail` },
        { name: "og:type", content: "article" },
        { name: "og:locale", content: "en_US" },
      ],
    },
  },
  modules: ["nuxt-icon"],
})
