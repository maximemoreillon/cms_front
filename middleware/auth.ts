import type Author from '~~/types/Author'

export default defineNuxtRouteMiddleware(async (to, from) => {

    const jwt = useCookie('jwt').value

    if(!jwt) return 

    const headers = { authorization: `Bearer ${jwt}` }

    const url = 'https://api.users.maximemoreillon.com/v2/users/self'

    try {
        userUser().value = await $fetch<Author>(url, {headers});
    } catch (error) {
        console.error(error)
        userUser().value = null
    }


})