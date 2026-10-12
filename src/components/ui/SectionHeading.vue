<script setup>
import { computed } from 'vue';

const props = defineProps({
    eyebrow: { type: String, default: null },
    title: { type: String, default: null },
    lede: { type: String, default: null },
    align: { type: String, default: 'center' }, // center | left
    accent: { type: String, default: 'primary' }, // primary | secondary
});

// Complete literal class strings so Tailwind's scanner can see them.
const wrap = computed(() => (props.align === 'left' ? 'text-left' : 'text-center mx-auto'));
const badgeClass = computed(() =>
    props.accent === 'secondary' ? 'badge-outline badge-secondary' : 'badge-outline badge-primary'
);
</script>

<template>
    <div v-reveal="'fade-up'" class="max-w-3xl mb-16" :class="wrap">
        <span v-if="eyebrow" class="badge mb-4" :class="badgeClass">{{ eyebrow }}</span>
        <h2 v-if="title" class="text-4xl md:text-5xl font-bold mb-4 text-base-content">{{ title }}</h2>
        <p v-if="lede" class="text-lg text-base-content/70 leading-relaxed">{{ lede }}</p>
        <slot />
    </div>
</template>
