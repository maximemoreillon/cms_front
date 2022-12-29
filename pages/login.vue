<template>
  <h1>Login</h1>

  <form @submit.prevent="login()" v-if="!user">
    <div class="field">
      <label for="username">
        <Icon name="mdi:account" />
      </label>
      <input
        class="text_input"
        id="username"
        type="text"
        v-model="credentials.username"
        placeholder="Username"
      />
    </div>

    <div class="field">
      <label for="password">
        <Icon name="mdi:key" />
      </label>
      <input
        class="text_input"
        id="password"
        type="password"
        v-model="credentials.password"
        placeholder="Password"
      />
    </div>

    <button type="submit" class="button">
      <Icon name="mdi:login" />
      <span>Login</span>
    </button>
  </form>

  <div v-else>
    Already logged in. Click <NuxtLink to="/logout">here</NuxtLink> to log out.
  </div>
</template>

<script lang="ts" setup>
const cookie = useCookie("jwt")
const router = useRouter()
const runtimeConfig = useRuntimeConfig()
const user = userUser()
const loggingIn = ref(false)
const credentials = reactive({
  username: "",
  password: "",
})

const login = async () => {
  const options = {
    method: "POST",
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

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;
}

/* TODO: Improve selector */
.field {
  display: flex;
  gap: 0.5em;
  align-items: center;
}

input {
  flex-grow: 1;
}
</style>
