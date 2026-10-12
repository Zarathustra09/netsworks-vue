<script setup>
import { computed } from 'vue';

const props = defineProps({
    category: { type: String, required: true },
    label: { type: String, required: true },
    size: { type: String, default: 'badge-sm' },
});

// Complete literal class strings so Tailwind's scanner can see them.
// Shared by ProjectCard and ProjectModal - keep them in sync.
const colorClass = computed(() => {
    switch (props.category) {
        case 'pcb':
            return 'badge-primary';
        case 'mechanical':
            return 'badge-accent';
        case 'clean-room-supplies':
            return 'badge-secondary';
        case 'construction-supplies':
            return 'badge-warning';
        default:
            return 'badge-neutral';
    }
});
</script>

<template>
    <span class="badge w-fit" :class="[colorClass, size]">{{ label }}</span>
</template>
