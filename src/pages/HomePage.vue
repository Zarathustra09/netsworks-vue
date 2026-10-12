<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { animate } from 'animejs';
import ModelViewer from '../components/ui/ModelViewer.vue';
import SectionHeading from '../components/ui/SectionHeading.vue';
import StatBlock from '../components/ui/StatBlock.vue';
import { pillars } from '../data/capabilities';
import { prefersReducedMotion, useHeroEntrance, useScrollCue } from '../composables/useMotion';

const root = ref(null);
const cue = ref(null);
useHeroEntrance(root);
useScrollCue(cue);

// ---------------------------------------------------------------- rotator
// All six slides render stacked in one grid cell so the card never resizes
// between them; only which one is "active" changes.
const INTERVAL = 5000;
const reduced = prefersReducedMotion();
const current = ref(0);
const slideEls = [];
let timer = null;
const anims = [];

function goTo(index) {
    if (index === current.value) return;
    const prev = slideEls[current.value];
    const next = slideEls[index];
    current.value = index;

    if (!reduced && prev && next) {
        anims.push(
            animate(prev, { opacity: [1, 0], translateY: [0, -8], duration: 400, ease: 'inQuad' }),
            animate(next, { opacity: [0, 1], translateY: [8, 0], duration: 400, ease: 'outQuad' })
        );
    }
}

function stop() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}

function start() {
    if (reduced) return; // no autoplay under reduced motion
    stop();
    timer = setInterval(() => goTo((current.value + 1) % pillars.length), INTERVAL);
}

function jump(index) {
    goTo(index);
    start();
}

function onFocusOut(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) start();
}

onMounted(start);
onBeforeUnmount(() => {
    stop();
    anims.forEach((a) => a?.cancel?.());
});

// ---------------------------------------------------------------- content
const stats = [
    {
        value: 50, suffix: '+', label: 'Projects Completed', title: 'Delivered', accent: 'primary',
        icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
        value: 25, suffix: '+', label: 'Happy Clients', title: 'Partners', accent: 'secondary',
        icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 00-9.288 0M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    },
    {
        value: 99.9, suffix: '%', label: 'Quality Rating', title: 'First-pass yield', accent: 'primary',
        icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    },
    {
        value: 24, suffix: 'hr', label: 'Quickturn Prototypes', title: 'Turnaround', accent: 'secondary',
        icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    },
];

// Complete literal class strings (never interpolated) so Tailwind's scanner sees them.
const services = [
    { n: '01', title: 'PCB Design & Layout', numClass: 'text-primary/20', body: 'Custom PCB design with advanced routing and multi-layer optimization.' },
    { n: '02', title: 'Component Assembly', numClass: 'text-secondary/20', body: 'Precision SMT and through-hole assembly with automated inspection.' },
    { n: '03', title: 'Prototype Development', numClass: 'text-primary/20', body: 'Rapid prototyping from concept validation to functional testing.' },
    { n: '04', title: 'Testing & Validation', numClass: 'text-secondary/20', body: 'Functional, environmental, and compliance testing protocols.' },
];
</script>

<template>
    <div ref="root">
        <!-- ============================ HERO — full-bleed 3D ============================ -->
        <!-- Mobile: stacks as a model band above the content (flex-col); the model is in
             normal flow, not absolute, so it's actually visible on a phone instead of
             hiding behind a card that fills the viewport.
             Desktop (lg:): the original full-bleed-behind-card layout. -->
        <section class="relative min-h-[92vh] flex flex-col lg:flex-row items-center overflow-hidden py-20 lg:py-0">
            <div class="relative z-10 w-full h-56 sm:h-72 mb-8 rounded-box overflow-hidden lg:absolute lg:inset-0 lg:z-0 lg:h-auto lg:mb-0 lg:rounded-none">
                <ModelViewer
                    src="/models/abstract_design.glb"
                    alt="Abstract generative sculpture rendered in 3D, representing Netsworks' precision engineering"
                />
            </div>

            <!-- Legibility scrim - desktop only; on mobile the content sits below the band. -->
            <div class="hidden lg:block absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-base-100 via-base-100/70 to-transparent"></div>
            <div class="hidden lg:block absolute inset-0 z-10 pointer-events-none tech-grid opacity-[0.06]"></div>

            <div class="container mx-auto px-6 relative z-20">
                <div
                    class="max-w-xl backdrop-blur-xl bg-base-100/60 border border-base-300/60 rounded-box shadow-2xl p-8 md:p-10"
                    @mouseenter="stop"
                    @mouseleave="start"
                    @focusin="stop"
                    @focusout="onFocusOut"
                >
                    <div class="grid mb-8" data-hero-in>
                        <div
                            v-for="(pillar, i) in pillars"
                            :key="pillar.slug"
                            :ref="(el) => (slideEls[i] = el)"
                            data-hero-slide
                            :data-active="current === i ? '' : undefined"
                            :aria-hidden="current === i ? undefined : 'true'"
                            class="col-start-1 row-start-1"
                        >
                            <span class="badge badge-lg badge-outline badge-primary mb-4">{{ pillar.eyebrow }}</span>

                            <h1 class="text-4xl lg:text-6xl font-bold leading-tight mb-4">
                                {{ pillar.title }}
                                <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent block">{{ pillar.highlight }}</span>
                                <span class="text-2xl lg:text-3xl font-semibold text-base-content/70">{{ pillar.kicker }}</span>
                            </h1>

                            <p class="text-base text-base-content/70 leading-relaxed">{{ pillar.description }}</p>
                        </div>
                    </div>

                    <div class="flex gap-2 mb-8" data-hero-in>
                        <button
                            v-for="(pillar, i) in pillars"
                            :key="pillar.slug"
                            type="button"
                            :aria-label="`Show ${pillar.title} ${pillar.highlight}`"
                            :aria-current="current === i ? 'true' : 'false'"
                            class="w-2.5 h-2.5 rounded-full bg-base-content/20 aria-[current=true]:bg-primary transition-colors"
                            @click="jump(i)"
                        ></button>
                    </div>

                    <!-- Fixed CTAs - these never change between slides. -->
                    <div class="flex flex-col sm:flex-row gap-4" data-hero-in>
                        <RouterLink :to="{ name: 'about', hash: '#contact' }" class="btn btn-lg bg-gradient-to-r from-primary to-secondary text-primary-content border-none rounded-full">
                            Get a Quote
                        </RouterLink>
                        <RouterLink :to="{ name: 'services' }" class="btn btn-lg btn-outline btn-primary rounded-full">
                            Explore Services
                        </RouterLink>
                    </div>
                </div>
            </div>

            <div ref="cue" class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
                <svg class="w-6 h-6 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>

        <!-- ============================ STATS ============================ -->
        <section class="py-12 bg-base-200/30 border-y border-base-300">
            <div class="container mx-auto px-6">
                <div class="stats stats-vertical sm:stats-horizontal shadow w-full bg-base-100">
                    <StatBlock v-for="s in stats" :key="s.label" v-bind="s" />
                </div>
            </div>
        </section>

        <!-- ============================ SERVICES — 4 tiles ============================ -->
        <section id="services" class="py-24">
            <div class="container mx-auto px-6">
                <SectionHeading
                    eyebrow="What We Do"
                    title="Our Services"
                    lede="From concept to completion, we deliver comprehensive electronics fabrication solutions."
                />

                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div
                        v-for="s in services"
                        :key="s.n"
                        v-reveal="'fade-up'"
                        class="card bg-base-100 border border-base-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <div class="card-body">
                            <span class="text-4xl font-black leading-none mb-2" :class="s.numClass">{{ s.n }}</span>
                            <h3 class="card-title text-lg">{{ s.title }}</h3>
                            <p class="text-base-content/70 text-sm">{{ s.body }}</p>
                        </div>
                    </div>
                </div>

                <div class="mt-10 text-center">
                    <RouterLink :to="{ name: 'services' }" class="link link-primary font-medium">See all services →</RouterLink>
                </div>
            </div>
        </section>

        <!-- ============================ SOFTWARE — tabs + mockup-code ============================ -->
        <section id="software" class="py-24 bg-base-200/30">
            <div class="container mx-auto px-6">
                <SectionHeading
                    eyebrow="Beyond Hardware"
                    title="Software Development"
                    lede="Custom software built with modern technologies to accelerate your business."
                />

                <div v-reveal="'fade-up'" class="tabs tabs-lift justify-center max-w-4xl mx-auto">
                    <input type="radio" name="software_tabs" class="tab" aria-label="Web" checked />
                    <div class="tab-content bg-base-100 border-base-300 rounded-box p-6 md:p-8">
                        <div class="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 class="text-xl font-bold mb-2">Web Development</h3>
                                <p class="text-base-content/70 text-sm mb-4">Modern, responsive web applications built for performance — from marketing sites to full customer portals.</p>
                                <div class="flex flex-wrap gap-2">
                                    <span class="badge badge-outline">Vue.js</span>
                                    <span class="badge badge-outline">Laravel</span>
                                    <span class="badge badge-outline">Tailwind CSS</span>
                                    <span class="badge badge-outline">TypeScript</span>
                                </div>
                            </div>
                            <div class="mockup-code text-xs md:text-sm">
                                <pre data-prefix="$"><code>composer create-project laravel/laravel app</code></pre>
                                <pre data-prefix="$"><code>npm install vue @vitejs/plugin-vue</code></pre>
                                <pre data-prefix=">"><code></code></pre>
                                <pre data-prefix=""><code>&lt;template&gt;</code></pre>
                                <pre data-prefix=""><code>  &lt;QuoteForm @submit="sendQuote" /&gt;</code></pre>
                                <pre data-prefix=""><code>&lt;/template&gt;</code></pre>
                            </div>
                        </div>
                    </div>

                    <input type="radio" name="software_tabs" class="tab" aria-label="Mobile" />
                    <div class="tab-content bg-base-100 border-base-300 rounded-box p-6 md:p-8">
                        <div class="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 class="text-xl font-bold mb-2">Mobile Development</h3>
                                <p class="text-base-content/70 text-sm mb-4">Cross-platform apps that feel native, plus dedicated iOS and Android builds for demanding requirements.</p>
                                <div class="flex flex-wrap gap-2">
                                    <span class="badge badge-outline">React Native</span>
                                    <span class="badge badge-outline">Flutter</span>
                                    <span class="badge badge-outline">iOS</span>
                                    <span class="badge badge-outline">Android</span>
                                </div>
                            </div>
                            <div class="mockup-code text-xs md:text-sm">
                                <pre data-prefix="$"><code>npx react-native init NetsworksApp</code></pre>
                                <pre data-prefix="$"><code>npx expo install expo-camera</code></pre>
                                <pre data-prefix=""><code></code></pre>
                                <pre data-prefix=""><code>export default function App() {</code></pre>
                                <pre data-prefix=""><code>  return &lt;QuoteScreen /&gt;;</code></pre>
                                <pre data-prefix=""><code>}</code></pre>
                            </div>
                        </div>
                    </div>

                    <input type="radio" name="software_tabs" class="tab" aria-label="Enterprise" />
                    <div class="tab-content bg-base-100 border-base-300 rounded-box p-6 md:p-8">
                        <div class="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 class="text-xl font-bold mb-2">Enterprise Software</h3>
                                <p class="text-base-content/70 text-sm mb-4">Custom business applications, CRM systems, and workflow automation designed to streamline operations.</p>
                                <div class="flex flex-wrap gap-2">
                                    <span class="badge badge-outline">Laravel</span>
                                    <span class="badge badge-outline">MySQL</span>
                                    <span class="badge badge-outline">REST APIs</span>
                                    <span class="badge badge-outline">CI/CD</span>
                                </div>
                            </div>
                            <div class="mockup-code text-xs md:text-sm">
                                <pre data-prefix="$"><code>laravel new netsworks-erp</code></pre>
                                <pre data-prefix="$"><code>php artisan make:model Quote -mcr</code></pre>
                                <pre data-prefix=""><code></code></pre>
                                <pre data-prefix=""><code>Route::apiResource(</code></pre>
                                <pre data-prefix=""><code>  'quotes', QuoteController::class</code></pre>
                                <pre data-prefix=""><code>);</code></pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ============================ SOCIAL PROOF — clients + testimonial ============================ -->
        <section id="clients" class="py-24">
            <div class="container mx-auto px-6">
                <SectionHeading
                    eyebrow="Trusted Partners"
                    title="Companies We Work With"
                    lede="Working with industry leaders and innovative companies across various sectors."
                />

                <div v-reveal="'fade-up'" class="flex flex-wrap justify-center items-center gap-10 md:gap-16 mb-16">
                    <img src="/images/spi.png" alt="Smart Probe Inc" class="h-14 md:h-16 w-auto grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300" />
                    <img src="/images/star.png" alt="NXTREV Technology Inc." class="h-14 md:h-16 w-auto grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300" />
                    <img src="/images/819.png" alt="819 Construction" class="h-14 md:h-16 w-auto grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300" />
                </div>

                <div v-reveal="'fade-up'" class="max-w-2xl mx-auto card bg-base-100 shadow-lg">
                    <div class="card-body">
                        <div class="flex items-center mb-6">
                            <div class="avatar mr-6">
                                <div class="w-20 rounded-2xl">
                                    <img src="/images/testimonials/Joy.png" alt="Joy Donator" />
                                </div>
                            </div>
                            <div>
                                <h4 class="text-lg font-bold">Joy Donator</h4>
                                <p class="text-primary font-semibold text-sm">Comptroller</p>
                                <p class="text-base-content/60 text-sm">Smart Probe Inc.</p>
                            </div>
                        </div>
                        <p class="text-base-content/70 leading-relaxed italic">
                            "More than a supplier, NETSWORKS is our solutions partner — always finding ways to help us overcome challenges and build lasting improvements for our operations."
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ============================ CTA ============================ -->
        <section class="py-24 gradient-bg relative overflow-hidden">
            <div class="absolute inset-0 tech-grid opacity-20"></div>
            <div class="container mx-auto px-6 text-center relative z-10">
                <h2 class="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Bring Your Ideas to Life?</h2>
                <p class="text-lg mb-8 max-w-2xl mx-auto text-white/90">Electronics, construction, and IT solutions tailored to your needs — let's make it happen.</p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <RouterLink :to="{ name: 'about', hash: '#contact' }" class="btn btn-lg bg-white text-neutral hover:bg-base-200 border-none rounded-full">Get Started Today</RouterLink>
                    <RouterLink :to="{ name: 'about', hash: '#contact' }" class="btn btn-lg btn-outline text-white hover:bg-white hover:text-neutral rounded-full">Schedule Consultation</RouterLink>
                </div>
            </div>
        </section>
    </div>
</template>
