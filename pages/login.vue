<template>
    <h2>Login</h2>

    <form @submit.prevent="login()" v-if="!user">

        <Icon name="mdi:account" />
        <input type="text" v-model="credentials.username">

        <Icon name="mdi:key" />
        <input type="password" v-model="credentials.password">

        <button type="submit">
            <Icon name="mdi:login"/>
            <span>Login</span>
        </button>
    </form>

    <div v-else>
        Already logged in. Click <NuxtLink to="/logout">here</NuxtLink> to log out.
    </div>
    
</template>

<script lang="ts" setup>

const cookie = useCookie('jwt')
const router = useRouter()
const runtimeConfig = useRuntimeConfig()
const user = userUser()
const loggingIn = ref(false)
const credentials = reactive({
    username: '',
    password: ''
})


const login = async () => {

    const options = {
        method: 'POST',
        body: credentials,
    }

    const { loginUrl } = runtimeConfig.public

    loggingIn.value = true

    try {
        const { jwt } = await $fetch<{ jwt: string }>(loginUrl, options)
        cookie.value = jwt
        router.back()
    } catch (error) {
        console.error(error)
    } finally {
        loggingIn.value = false
    }
}



</script>