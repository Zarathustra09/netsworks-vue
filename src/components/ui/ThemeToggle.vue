<script setup>
import { computed } from 'vue';
import { useTheme } from '../../composables/useTheme';

const { theme, setTheme } = useTheme();
const isDark = computed({
    get: () => theme.value === 'dark',
    set: (checked) => setTheme(checked ? 'dark' : 'light'),
});
</script>

<template>
    <!-- daisyUI swap sun/moon toggle -->
    <label class="swap swap-rotate btn btn-ghost btn-circle" aria-label="Toggle dark mode">
        <input v-model="isDark" type="checkbox" class="hidden" />

        <svg class="swap-off w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 17.5a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM12 1.5a.5.5 0 01.5.5v2a.5.5 0 01-1 0V2a.5.5 0 01.5-.5zM21 11.5h-2a.5.5 0 010-1h2a.5.5 0 010 1zM5 11.5H3a.5.5 0 010-1h2a.5.5 0 010 1zM18.364 18.364a.5.5 0 01-.707 0l-1.414-1.414a.5.5 0 11.707-.707l1.414 1.414a.5.5 0 010 .707zM7.05 7.05a.5.5 0 01-.707 0L4.929 5.636a.5.5 0 11.707-.707L7.05 6.343a.5.5 0 010 .707zM18.364 5.636a.5.5 0 010 .707l-1.414 1.414a.5.5 0 11-.707-.707l1.414-1.414a.5.5 0 01.707 0zM7.05 16.95a.5.5 0 010 .707l-1.414 1.414a.5.5 0 11-.707-.707l1.414-1.414a.5.5 0 01.707 0zM12 22.5a.5.5 0 01-.5-.5v-2a.5.5 0 011 0v2a.5.5 0 01-.5.5z" />
        </svg>

        <svg class="swap-on w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
    </label>
</template>
