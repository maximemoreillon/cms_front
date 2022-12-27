<template>
    <h2>Logout</h2>



    <button @click="logout()">
        <Icon name="mdi:logout" />
        <span>Logout</span>
    </button>
    
</template>

<script lang="ts" setup>

const cookie = useCookie('jwt')
const router = useRouter()


const logout = () => {
    cookie.value = null
    router.push('/')
}


</script>