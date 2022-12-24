<template>
    <h2>Login</h2>
    
    <form @submit.prevent="signIn('credentials', credentials)">
        <input type="text" v-model="credentials.username">
        <input type="password" v-model="credentials.password">
        <button type="submit">login</button>
    </form>
</template>

<script lang="ts" setup>

import { reactive } from 'vue';

definePageMeta({ auth: false })
const { signIn } = useSession()

const credentials = reactive({
    username: '',
    password: ''
})


</script>