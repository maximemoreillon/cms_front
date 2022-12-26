import type Author from '~~/types/Author'

export default defineNuxtRouteMiddleware(async (to, from) => {

    const options = { 
        headers: { authorization: `Bearer ${useCookie('jwt').value}` }
    }

    const url = 'https://api.users.maximemoreillon.com/v2/users/self'

    try {
        userUser().value = await $fetch<Author>(url, options);
    } catch (error) {
        console.error(error)
        userUser().value = null
    }


})