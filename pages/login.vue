<template>
  <template v-if="!user">
    <h1>Login</h1>

    <form @submit.prevent="login()">
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

      <IconButton
        :loading="loggingIn"
        type="submit"
        icon="mdi:login"
        text="Login"
      />
    </form>

    <Snackbar v-model="snackbar.show" :class="snackbar.class">
      {{ snackbar.message }}
    </Snackbar>
  </template>

  <template v-if="user">
    <h1>Logout</h1>
    <p>Logged in as {{ user.display_name }}</p>
    <p>
      <IconButton icon="mdi:logout" text="Logout" @click="logout()" />
    </p>
  </template>
</template>

<script lang="ts" setup>
const cookie = useCookie("jwt")
const router = useRouter()
const runtimeConfig = useRuntimeConfig()
const user = useUser()
const loggingIn = ref(false)
const credentials = reactive({
  username: "",
  password: "",
})
const snackbar = reactive({
  show: false,
  message: "",
  class: "",
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
    snackbar.show = true
    snackbar.message = "Login failed"
    snackbar.class = ""
  } finally {
    loggingIn.value = false
  }
}

const logout = () => {
  cookie.value = null
  router.push("/")
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
