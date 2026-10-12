<script setup>
import SiteHeader from './components/layout/SiteHeader.vue';
import SiteFooter from './components/layout/SiteFooter.vue';
</script>

<template>
    <SiteHeader />
    <main class="min-h-[calc(100vh-var(--header-height-mobile))]">
        <RouterView />
    </main>
    <SiteFooter />
</template>
