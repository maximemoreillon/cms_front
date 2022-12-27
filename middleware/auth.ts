import type Author from '~~/types/Author'

export default defineNuxtRouteMiddleware(async (to, from) => {

    const jwt = useCookie('jwt').value

    if(!jwt) return 

    const runtimeConfig = useRuntimeConfig()
    const {idenfiticationUrl} = runtimeConfig.public

    const headers = { authorization: `Bearer ${jwt}` }

    try {
        userUser().value = await $fetch<Author>(idenfiticationUrl, {headers})
    } catch (error) {
        console.error(error)
        userUser().value = null
    }


})