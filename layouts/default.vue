<template>
    <header>
        <h1>
            Maxime Moreillon
        </h1>

        <span>{{user.display_name}}</span>
    </header>
    
    <nav>
        <NuxtLink to="/">Articles</NuxtLink>
        <NuxtLink to="/tags">Tags</NuxtLink>
        <NuxtLink to="/login">Login</NuxtLink>
    </nav>
    
    <main>
        <NuxtPage />
    </main>
</template>

<script lang="ts" setup>
const user = userUser()

</script>