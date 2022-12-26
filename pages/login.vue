<template>
    <h2>Login</h2>
    
    <form @submit.prevent="login()" v-if="!cookie">
        <input type="text" v-model="credentials.username">
        <input type="password" v-model="credentials.password">
        <button type="submit">
            <Icon name="mdi:login"/>
            <span>Login</span>
        </button>
    </form>

    <button v-else @click="logout()">
        <Icon name="mdi:logout" />
        <span>Logout</span>
    </button>
    
</template>

<script lang="ts" setup>

const cookie = useCookie('jwt')

const loggingIn = ref(false)
const credentials = reactive({
    username: '',
    password: ''
})

const login = async () => {
    const options = {
        method: 'POST',
        body: credentials,
        // baseURL: runtimeConfig.public.apiBase
    }

    loggingIn.value = true

    try {
        const url = 'https://api.users.maximemoreillon.com/v2/auth/login'
        const { jwt } = await $fetch<{jwt: string}>(url, options)
        cookie.value = jwt
    } catch (error) {
        console.error(error)
    } finally {
        loggingIn.value = false
    }
}

const logout = () => {
    cookie.value = null
}


</script>