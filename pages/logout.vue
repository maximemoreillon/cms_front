<template>
    <h2>Logout</h2>

    <template v-if="user">

        <div>Logged in as {{ user.display_name }}</div>
        <button @click="logout()">
            <Icon name="mdi:logout" />
            <span>Logout</span>
        </button>

    </template>
    <div v-else>Not logged in</div>
    
</template>

<script lang="ts" setup>

const cookie = useCookie('jwt')
const router = useRouter()
const user = userUser()

const logout = () => {
    cookie.value = null
    router.push('/')
}


</script>