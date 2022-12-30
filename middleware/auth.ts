import type Author from "~~/types/Author"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const jwt = useCookie("jwt")
  const user = userUser()

  if (!jwt) {
    user.value = null
    return
  }

  const runtimeConfig = useRuntimeConfig()
  const { idenfiticationUrl } = runtimeConfig.public

  const headers = { authorization: `Bearer ${jwt.value}` }

  try {
    user.value = await $fetch<Author>(idenfiticationUrl, { headers })
  } catch (error) {
    console.error(error)
    user.value = null
  }
})
