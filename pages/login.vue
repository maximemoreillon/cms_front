<template>
    <h2>Login</h2>
    
    <form @submit.prevent="login()">
        <input type="text" v-model="credentials.username">
        <input type="password" v-model="credentials.password">
        <button type="submit">login</button>
    </form>
</template>

<script lang="ts" setup>



const credentials = reactive({
    username: '',
    password: ''
})

const login = () => {
    alert('Not implemented')
}


</script>