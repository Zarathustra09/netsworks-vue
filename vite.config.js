import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    // <model-viewer> is a web component, not a Vue component.
                    isCustomElement: (tag) => tag === 'model-viewer',
                },
            },
        }),
        tailwindcss(),
    ],
});
