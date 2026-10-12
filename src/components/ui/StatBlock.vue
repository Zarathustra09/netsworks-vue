<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { animate } from 'animejs';
import { prefersReducedMotion } from '../../composables/useMotion';

const props = defineProps({
    value: { type: [Number, String], required: true }, // numeric part, e.g. 50, 99.9
    suffix: { type: String, default: '' }, // e.g. '+', '%', 'hr'
    label: { type: String, required: true },
    accent: { type: String, default: 'primary' },
    title: { type: String, default: null }, // optional stat-title above the value
    icon: { type: String, default: null }, // optional raw <path d> for a stat-figure icon
});

// Complete literal class strings so Tailwind's scanner can see them.
const toneClass = computed(() => (props.accent === 'secondary' ? 'text-secondary' : 'text-primary'));

const target = computed(() => parseFloat(props.value));
const decimals = computed(() => (String(props.value).split('.')[1] || '').length);
const format = (n) => n.toFixed(decimals.value) + props.suffix;

const display = ref(`0${props.suffix}`);
const valueEl = ref(null);
let observer = null;
let anim = null;

onMounted(() => {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
        display.value = format(target.value);
        return;
    }

    observer = new IntersectionObserver(
        (entries) => {
            if (!entries.some((e) => e.isIntersecting)) return;
            const counter = { value: 0 };
            anim = animate(counter, {
                value: target.value,
                duration: 1400,
                ease: 'outExpo',
                onUpdate: () => {
                    display.value = format(counter.value);
                },
            });
            observer.disconnect();
        },
        { threshold: 0.6 }
    );
    observer.observe(valueEl.value);
});

onBeforeUnmount(() => {
    observer?.disconnect();
    anim?.cancel?.();
});
</script>

<template>
    <div v-reveal="'fade-up'" class="stat place-items-center">
        <div v-if="icon" class="stat-figure" :class="toneClass">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="icon" />
            </svg>
        </div>

        <div v-if="title" class="stat-title">{{ title }}</div>

        <div ref="valueEl" class="stat-value" :class="toneClass">{{ display }}</div>
        <div class="stat-desc text-base-content/60 text-sm mt-1">{{ label }}</div>
    </div>
</template>
