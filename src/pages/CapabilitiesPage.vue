<script setup>
import { ref } from 'vue';
import ModelViewer from '../components/ui/ModelViewer.vue';
import SectionHeading from '../components/ui/SectionHeading.vue';
import { useHeroEntrance } from '../composables/useMotion';

const root = ref(null);
useHeroEntrance(root);

// Every class below is a complete literal string (never interpolated) so
// Tailwind's scanner can see and generate it.
const expertise = [
    {
        title: 'Clean Room & Construction',
        hrClass: 'bg-primary',
        badgeClass: 'badge-primary',
        points: [
            'Clean room panels, partitions, and modular construction',
            'Air showers, pass boxes, and ESD-safe solutions',
            'General fabrication and installation services',
            'Custom furniture, workstations, and storage systems',
        ],
    },
    {
        title: 'Manufacturing & Fabrication',
        hrClass: 'bg-secondary',
        badgeClass: 'badge-secondary',
        points: [
            'Jigs & fixtures, PCB holders, test sockets',
            'Stainless steel tables, display cabinets',
            'Storage racks, isolation tables, sinks',
            'Custom automation engineering',
        ],
    },
    {
        title: 'Testing & Quality Control',
        hrClass: 'bg-primary',
        badgeClass: 'badge-primary',
        points: [
            'ICT/FCT semiconductor testing probes',
            'Bare board test probes, pogo pins',
            'Burn-in board troubleshooting & repair',
            'Clean room products and solutions',
        ],
    },
];

const equipment = [
    {
        title: 'Testing Equipment',
        hrClass: 'bg-primary',
        iconBg: 'bg-primary text-primary-content',
        icon: ['M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'],
        points: [
            'Pogo pins and connector probes',
            'ICT/FCT semiconductor probes',
            'Bare board test probes',
            'Custom test sockets',
        ],
    },
    {
        title: 'Fabrication Services',
        hrClass: 'bg-secondary',
        iconBg: 'bg-secondary text-secondary-content',
        icon: [
            'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
            'M15 12a3 3 0 11-6 0 3 3 0 016 0z',
        ],
        points: [
            'Jigs & fixtures manufacturing',
            'Stainless steel fabrication',
            'Storage and isolation systems',
            'Custom mechanical design',
        ],
    },
    {
        title: 'Engineering Support',
        hrClass: 'bg-primary',
        iconBg: 'bg-primary text-primary-content',
        icon: ['M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'],
        points: [
            'PCB design services',
            'Automation solutions',
            'Clean room products',
            'Burn-in board repair',
        ],
    },
    {
        title: 'Clean Room & Construction',
        hrClass: 'bg-secondary',
        iconBg: 'bg-secondary text-secondary-content',
        icon: ['M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'],
        points: [
            'Clean room panels and partitions',
            'Air showers and pass boxes',
            'ESD flooring and wall systems',
            'General fabrication and installation',
            'Modular construction items',
        ],
    },
];
</script>

<template>
    <div ref="root">
        <!-- ============================ HERO — full-bleed 3D ============================ -->
        <section class="relative min-h-[80vh] flex flex-col lg:flex-row items-center overflow-hidden py-16 lg:py-0">
            <div class="absolute inset-0 bg-gradient-to-br from-base-200 to-base-300"></div>

            <div class="relative z-10 w-full h-56 sm:h-72 mb-8 rounded-box overflow-hidden lg:absolute lg:inset-0 lg:z-0 lg:h-auto lg:mb-0 lg:rounded-none">
                <ModelViewer
                    src="/models/mfg_line.glb"
                    alt="3D render of a manufacturing production line"
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
                    <span class="badge badge-lg badge-outline badge-primary mb-4" data-hero-in>Advanced Manufacturing Capabilities</span>

                    <h1 class="text-4xl lg:text-6xl font-bold leading-tight mb-4" data-hero-in>
                        Technical
                        <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent block">Capabilities</span>
                        <span class="text-rotate text-2xl lg:text-3xl font-semibold text-base-content/70 duration-[9s]">
                            <span>
                                <span>Precision</span>
                                <span>Fabrication</span>
                                <span>Testing</span>
                                <span>Automation</span>
                            </span>
                        </span>
                    </h1>

                    <p class="text-base text-base-content/70 leading-relaxed mb-6" data-hero-in>
                        Precision engineering and equipment delivering
                        <span class="text-primary font-semibold">99.9% quality</span>
                        across every build.
                    </p>

                    <p class="text-sm text-base-content/60 mb-8" data-hero-in>
                        <span class="font-semibold text-primary">±0.001"</span> Precision Tolerance
                        <span class="mx-2 text-base-content/30">·</span>
                        <span class="font-semibold text-secondary">99.9%</span> First Pass Yield
                    </p>

                    <div class="flex gap-4 flex-wrap" data-hero-in>
                        <RouterLink :to="{ name: 'capabilities', hash: '#capabilities-detail' }" class="btn btn-lg bg-gradient-to-r from-primary to-secondary text-primary-content border-none rounded-full">Explore Capabilities</RouterLink>
                        <RouterLink :to="{ name: 'about', hash: '#contact' }" class="btn btn-lg btn-outline btn-primary rounded-full">Get Quote</RouterLink>
                    </div>
                </div>
            </div>
        </section>

        <!-- ============================ EXPERTISE TIMELINE ============================ -->
        <section id="capabilities-detail" class="py-24">
            <div class="container mx-auto px-6">
                <SectionHeading
                    eyebrow="What We Do"
                    title="Our Expertise"
                    lede="Comprehensive suite of advanced manufacturing, engineering, and quality assurance capabilities."
                />

                <ul class="timeline timeline-vertical lg:timeline-horizontal timeline-snap-icon max-w-6xl mx-auto mb-20 mt-12">
                    <li v-for="(stage, i) in expertise" :key="stage.title">
                        <hr v-if="i > 0" :class="stage.hrClass" />
                        <div class="timeline-middle">
                            <span class="badge badge-lg" :class="stage.badgeClass">{{ i + 1 }}</span>
                        </div>
                        <!-- All cards on the same side (timeline-end) - in lg:timeline-horizontal
                             a timeline-start card grows upward and collides with the heading. -->
                        <div class="timeline-end mb-10">
                            <div v-reveal="'fade-up'" class="card bg-base-100 border border-base-300 shadow-md">
                                <div class="card-body">
                                    <h3 class="card-title">{{ stage.title }}</h3>
                                    <ul class="text-base-content/70 text-sm space-y-1 mt-2">
                                        <li v-for="point in stage.points" :key="point">• {{ point }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <hr v-if="i < expertise.length - 1" :class="stage.hrClass" />
                    </li>
                </ul>

                <!-- ============================ EQUIPMENT TIMELINE ============================ -->
                <div class="bg-base-200/30 p-8 md:p-12 rounded-3xl">
                    <SectionHeading title="Advanced Equipment & Technology" align="left" />

                    <ul class="timeline timeline-vertical max-w-2xl mx-auto">
                        <li v-for="(group, i) in equipment" :key="group.title">
                            <hr v-if="i > 0" :class="group.hrClass" />
                            <div class="timeline-middle">
                                <span class="flex items-center justify-center w-10 h-10 rounded-full" :class="group.iconBg">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            v-for="d in group.icon"
                                            :key="d"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            :d="d"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <div v-reveal="'fade-up'" class="timeline-end timeline-box mb-8 text-left">
                                <h4 class="font-bold mb-2">{{ group.title }}</h4>
                                <ul class="text-sm text-base-content/70 space-y-1">
                                    <li v-for="point in group.points" :key="point">• {{ point }}</li>
                                </ul>
                            </div>
                            <hr v-if="i < equipment.length - 1" :class="group.hrClass" />
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </div>
</template>
