// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            apiBase: 'https://api.articles.maximemoreillon.com'
        }
    },
    modules: [
        'nuxt-icon',
        '@sidebase/nuxt-auth',

    ]
})
