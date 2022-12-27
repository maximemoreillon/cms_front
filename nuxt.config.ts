// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        // TODO: use environment variables
        public: {
            apiBase: 'https://api.articles.maximemoreillon.com',
            loginUrl: 'https://api.users.maximemoreillon.com/v2/auth/login',
            idenfiticationUrl: 'https://api.users.maximemoreillon.com/v2/users/self'
        }
    },
    modules: [
        'nuxt-icon',
    ]
})
