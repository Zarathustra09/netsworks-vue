<script setup>
import { onMounted, ref } from 'vue';
import { prefersReducedMotion } from '../../composables/useMotion';

defineProps({
    src: { type: String, required: true },
    alt: { type: String, required: true },
    poster: { type: String, default: null },
    autoRotate: { type: Boolean, default: true },
    cameraOrbit: { type: String, default: '25deg 75deg 105%' },
    fieldOfView: { type: String, default: '30deg' },
    // Lighting. The defaults suit a textured, centered model (abstract_design,
    // moon). Flat untextured scene models on a light page need a lower
    // exposure and a stronger contact shadow to read at all.
    exposure: { type: String, default: '1' },
    shadowIntensity: { type: String, default: '0.4' },
    shadowSoftness: { type: String, default: '0.8' },
});

const viewer = ref(null);
const progress = ref(0);
const reduced = prefersReducedMotion();

onMounted(async () => {
    // ~1 MB (three.js). Loaded on demand so it stays its own chunk and never
    // blocks first paint. Module caching means this only evaluates once.
    await import('@google/model-viewer');

    viewer.value?.addEventListener('progress', (event) => {
        progress.value = event.detail.totalProgress * 100;
    });
});
</script>

<template>
    <!--
        disable-zoom / disable-pan are load-bearing: without them the mouse
        wheel over the model zooms the camera instead of scrolling the page.
        auto-rotate is dropped under prefers-reduced-motion - <model-viewer>
        has no built-in awareness of that media query.
    -->
    <model-viewer
        ref="viewer"
        class="w-full h-full"
        :src="src"
        :alt="alt"
        :poster="poster || undefined"
        camera-controls
        disable-zoom
        disable-pan
        :auto-rotate="autoRotate && !reduced ? '' : undefined"
        auto-rotate-delay="0"
        rotation-per-second="18deg"
        interaction-prompt="none"
        environment-image="neutral"
        tone-mapping="neutral"
        :exposure="exposure"
        :shadow-intensity="shadowIntensity"
        :shadow-softness="shadowSoftness"
        :camera-orbit="cameraOrbit"
        :field-of-view="fieldOfView"
        loading="eager"
        reveal="auto"
    >
        <div slot="poster" class="skeleton w-full h-full" aria-hidden="true"></div>
        <div slot="progress-bar" class="absolute bottom-6 inset-x-0 px-10">
            <progress class="progress progress-primary w-full" :value="progress" max="100"></progress>
        </div>
    </model-viewer>
</template>
