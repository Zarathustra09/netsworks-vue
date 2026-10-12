import { ref } from 'vue';

// Module-level so every <ThemeToggle> instance shares one source of truth.
// The inline script in index.html already set data-theme before first paint;
// this only reads it back and keeps it in sync afterwards.
const theme = ref(
    typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'dark'
        ? 'dark'
        : 'light'
);

export function useTheme() {
    function setTheme(next) {
        theme.value = next;
        document.documentElement.setAttribute('data-theme', next);
        try {
            localStorage.setItem('theme', next);
        } catch (e) {
            /* private browsing / blocked storage - just won't persist */
        }
    }

    return { theme, setTheme };
}
