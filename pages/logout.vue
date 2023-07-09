<template>
  <h2>Logout</h2>

  <template v-if="user">
    <p>Logged in as {{ user.display_name }}</p>
    <p>
      <IconButton icon="mdi:logout" text="Logout" @click="logout()" />
    </p>
  </template>
  <p v-else>Not logged in</p>
</template>

<script lang="ts" setup>
const cookie = useCookie("jwt")
const router = useRouter()
const user = useUser()

const logout = () => {
  cookie.value = null
  router.push("/")
}
</script>
