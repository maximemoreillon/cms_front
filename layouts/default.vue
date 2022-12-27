<template>
    <header>
        <span class="title">Maxime Moreillon</span>
    </header>
    
    <nav>
        <NuxtLink to="/">
            <!-- TODO: find icon -->
            <Icon name="mdi:file-document-outline"/>
            <span>Articles</span>
        </NuxtLink>
        <NuxtLink to="/tags">
            <Icon name="mdi:tag" />
            <span>Tags</span>
        </NuxtLink>
        <NuxtLink to="/authors">
            <Icon name="mdi:account" />
            <span>Auhtors</span>
        </NuxtLink>

        <NuxtLink v-if="user" to="/logout">
            <Icon name="mdi:logout" />
            <span>Logout</span>
        </NuxtLink>
        <NuxtLink v-else to="/login">
            <Icon name="mdi:login" />
            <span>Login</span>
        </NuxtLink>

    </nav>
    
    <main>
        <NuxtPage />
    </main>
</template>

<script lang="ts" setup>
const user = userUser()

</script>