<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import ThemeToggle from '../ui/ThemeToggle.vue';

const route = useRoute();
const open = ref(false);
const scrolled = ref(false);

const links = [
    { name: 'welcome', label: 'Home' },
    { name: 'services', label: 'Services' },
    { name: 'capabilities', label: 'Capabilities' },
    { name: 'about', label: 'About' },
];

function setOpen(value) {
    open.value = value;
    document.body.classList.toggle('overflow-hidden', value);
}

const onScroll = () => {
    scrolled.value = window.scrollY > 40;
};
const onResize = () => {
    if (window.innerWidth >= 1024 && open.value) setOpen(false);
};

// Close the drawer whenever navigation happens.
watch(() => route.fullPath, () => setOpen(false));

onMounted(() => {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    document.body.classList.remove('overflow-hidden');
});
</script>

<template>
    <header
        class="site-header bg-base-100/90 backdrop-blur-md border-b border-base-300 transition-colors duration-300"
        :class="{ 'site-header--scrolled': scrolled }"
    >
        <nav class="navbar container mx-auto px-4 md:px-6 h-full">
            <div class="navbar-start">
                <RouterLink :to="{ name: 'welcome' }" class="flex items-center gap-2">
                    <img src="/images/logo.svg" alt="Netsworks Logo" class="w-11 h-11 md:w-12 md:h-12" />
                    <span class="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hidden sm:block">
                        Netsworks
                    </span>
                </RouterLink>
            </div>

            <div class="navbar-center hidden lg:flex">
                <ul class="menu menu-horizontal gap-1 px-1">
                    <li v-for="link in links" :key="link.name">
                        <RouterLink
                            :to="{ name: link.name }"
                            class="rounded-full"
                            exact-active-class="bg-gradient-to-r from-primary to-secondary text-primary-content"
                        >
                            {{ link.label }}
                        </RouterLink>
                    </li>
                </ul>
            </div>

            <div class="navbar-end gap-2">
                <ThemeToggle />

                <RouterLink
                    :to="{ name: 'about', hash: '#contact' }"
                    class="btn btn-sm bg-gradient-to-r from-primary to-secondary text-primary-content border-none rounded-full hidden lg:inline-flex"
                >
                    Contact Us
                </RouterLink>

                <button class="btn btn-ghost btn-circle lg:hidden" aria-label="Open menu" @click="setOpen(true)">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </nav>
    </header>

    <!--
        Mobile menu overlay - a SIBLING of <header>, not a descendant.

        <header> has backdrop-blur-md, and per the Filter Effects spec an element
        with backdrop-filter != none becomes the containing block for its
        fixed/absolute descendants. Inside <header>, "fixed inset-0" would resolve
        against the header's own 80px box instead of the viewport, painting only
        a strip while the nav links overflow onto page content.
        z-[60] (> the header's z-50) so the opened drawer covers the bar.
    -->
    <div class="mobile-menu fixed inset-0 bg-base-100 z-[60] lg:hidden" :class="{ 'menu-open': open }">
        <div class="flex flex-col h-full">
            <div class="flex items-center justify-between p-6 border-b border-base-300">
                <span class="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Netsworks</span>
                <button class="btn btn-ghost btn-circle" aria-label="Close menu" @click="setOpen(false)">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <ul class="menu p-6 gap-2 text-lg flex-1">
                <li v-for="link in links" :key="link.name">
                    <RouterLink :to="{ name: link.name }" exact-active-class="active text-primary">
                        {{ link.label }}
                    </RouterLink>
                </li>
            </ul>
            <div class="p-6 border-t border-base-300">
                <RouterLink
                    :to="{ name: 'about', hash: '#contact' }"
                    class="btn w-full bg-gradient-to-r from-primary to-secondary text-primary-content border-none rounded-full"
                >
                    Contact Us
                </RouterLink>
            </div>
        </div>
    </div>
</template>
