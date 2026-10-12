<script setup>
import { nextTick, onBeforeUnmount, ref, watch } from 'vue';
import { animate, stagger } from 'animejs';
import ModelViewer from '../components/ui/ModelViewer.vue';
import ProjectCard from '../components/ui/ProjectCard.vue';
import ProjectModal from '../components/ui/ProjectModal.vue';
import { categories, items } from '../data/portfolio';
import { prefersReducedMotion, useHeroEntrance } from '../composables/useMotion';

const root = ref(null);
useHeroEntrance(root);

// ---------------------------------------------------------------- filtering
const active = ref('all');
const grid = ref(null);
let filterAnim = null;

const matches = (item) => active.value === 'all' || item.category === active.value;

// Fade/scale the cards that are now visible back in with a stagger.
watch(active, async () => {
    await nextTick();
    if (prefersReducedMotion() || !grid.value) return;

    const visible = Array.from(grid.value.children).filter((el) => el.style.display !== 'none');
    filterAnim = animate(visible, {
        opacity: [0, 1],
        scale: [0.9, 1],
        delay: stagger(60),
        duration: 350,
        ease: 'outQuad',
    });
});

onBeforeUnmount(() => filterAnim?.cancel?.());

// ---------------------------------------------------------------- modals
function openModal(slug) {
    document.getElementById(`modal-${slug}`)?.showModal();
}
</script>

<template>
    <div ref="root">
        <!-- ============================ HERO — full-bleed 3D ============================ -->
        <!-- Mobile: stacks as a model band above the content (flex-col); desktop (lg:)
             reverts to the full-bleed-behind-card layout. -->
        <section class="relative min-h-[80vh] flex flex-col lg:flex-row items-center overflow-hidden py-16 lg:py-0">
            <!-- Backdrop: gives the model's flat, near-white geometry something to read
                 against. Theme tokens, so it works in light and dark alike. -->
            <div class="absolute inset-0 bg-gradient-to-br from-base-200 to-base-300"></div>

            <div class="relative z-10 w-full h-56 sm:h-72 mb-8 rounded-box overflow-hidden lg:absolute lg:inset-0 lg:z-0 lg:h-auto lg:mb-0 lg:rounded-none">
                <ModelViewer
                    src="/models/mfg_lab.glb"
                    alt="3D render of a clean room manufacturing lab"
                    camera-orbit="15deg 70deg 93%"
                    field-of-view="35deg"
                    exposure="0.85"
                    shadow-intensity="1"
                    shadow-softness="0.5"
                />
            </div>

            <div class="hidden lg:block absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-base-100 via-base-100/50 to-transparent"></div>
            <div class="hidden lg:block absolute inset-0 z-10 pointer-events-none tech-grid opacity-[0.06]"></div>

            <div class="container mx-auto px-6 relative z-20">
                <div class="max-w-xl backdrop-blur-xl bg-base-100/60 border border-base-300/60 rounded-box shadow-2xl p-8 md:p-10">
                    <span class="badge badge-lg badge-outline badge-info mb-4" data-hero-in>Clean Room Material Solutions</span>

                    <h1 class="text-4xl lg:text-6xl font-bold leading-tight mb-4" data-hero-in>
                        Pure
                        <span class="bg-gradient-to-r from-info to-secondary bg-clip-text text-transparent block">Clean Room</span>
                        <span class="text-rotate text-2xl lg:text-3xl font-semibold text-base-content/70 duration-[8s]">
                            <span>
                                <span>Materials</span>
                                <span>Consumables</span>
                                <span>Garments</span>
                                <span>Wipes</span>
                                <span>Gloves</span>
                            </span>
                        </span>
                    </h1>

                    <p class="text-base text-base-content/70 leading-relaxed mb-6" data-hero-in>
                        Consumables and contamination control for
                        <span class="text-info font-semibold">Class 10 to Class 100,000</span> environments.
                    </p>

                    <p class="text-sm text-base-content/60 mb-8" data-hero-in>
                        <span class="font-semibold text-secondary">99.99%</span> Particle-Free
                        <span class="mx-2 text-base-content/30">·</span>
                        <span class="font-semibold text-info">24hrs</span> Same-Day Ship
                    </p>

                    <div class="flex gap-4 flex-wrap" data-hero-in>
                        <RouterLink :to="{ name: 'about', hash: '#contact' }" class="btn btn-lg bg-gradient-to-r from-info to-secondary text-white border-none rounded-full">Get Clean Room Quote</RouterLink>
                        <RouterLink :to="{ name: 'services', hash: '#projects' }" class="btn btn-lg btn-outline btn-info rounded-full">Browse Catalog</RouterLink>
                    </div>
                </div>
            </div>
        </section>

        <!-- ============================ FILTER + GRID ============================ -->
        <section class="py-8">
            <div class="container mx-auto px-6">
                <div class="flex flex-wrap justify-center gap-3">
                    <button
                        type="button"
                        class="btn btn-sm rounded-full"
                        :class="{ 'btn-active': active === 'all' }"
                        :aria-pressed="active === 'all'"
                        @click="active = 'all'"
                    >
                        All Projects
                    </button>
                    <button
                        v-for="(label, slug) in categories"
                        :key="slug"
                        type="button"
                        class="btn btn-sm btn-outline rounded-full"
                        :class="{ 'btn-active': active === slug }"
                        :aria-pressed="active === slug"
                        @click="active = slug"
                    >
                        {{ label }}
                    </button>
                </div>
            </div>
        </section>

        <section id="projects" class="py-16 bg-base-200/20">
            <div class="container mx-auto px-6">
                <div ref="grid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ProjectCard
                        v-for="item in items"
                        v-show="matches(item)"
                        :key="item.slug"
                        :item="item"
                        @open="openModal"
                    />
                </div>
            </div>
        </section>

        <ProjectModal v-for="item in items" :key="item.slug" :item="item" />

        <!-- ============================ CTA ============================ -->
        <section class="py-20 gradient-bg relative overflow-hidden">
            <div class="container mx-auto px-6 text-center relative z-10">
                <h2 class="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Start Your Next Project?</h2>
                <p class="text-lg mb-8 max-w-2xl mx-auto text-white/90">
                    Let's discuss how our expertise can bring your innovative ideas to life with precision and quality.
                </p>
                <RouterLink :to="{ name: 'about', hash: '#contact' }" class="btn btn-lg bg-white text-neutral hover:bg-base-200 border-none rounded-full">
                    Request Quote
                </RouterLink>
            </div>
        </section>
    </div>
</template>
