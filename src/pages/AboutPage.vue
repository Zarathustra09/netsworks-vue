<script setup>
import { onBeforeUnmount, reactive, ref } from 'vue';
import ModelViewer from '../components/ui/ModelViewer.vue';
import SectionHeading from '../components/ui/SectionHeading.vue';
import StatBlock from '../components/ui/StatBlock.vue';
import { useHeroEntrance } from '../composables/useMotion';

const root = ref(null);
useHeroEntrance(root);

const stats = [
    { value: 5, suffix: '+', label: 'Years Experience', accent: 'primary' },
    { value: 99.9, suffix: '%', label: 'Quality Rating', accent: 'secondary' },
    { value: 50, suffix: '+', label: 'Projects Completed', accent: 'primary' },
    { value: 25, suffix: '+', label: 'Happy Clients', accent: 'secondary' },
];

// Complete literal class strings (never interpolated) so Tailwind sees them.
const pillars = [
    {
        title: 'Quality at the Core',
        body: 'Planting a Quality-First mindset across all levels of our organization and stakeholders.',
        wrap: 'bg-primary/10',
        tone: 'text-primary',
        icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
        title: 'Continuous Improvement',
        body: 'Driving ongoing innovation and operational excellence to adapt and thrive in a dynamic market.',
        wrap: 'bg-secondary/10',
        tone: 'text-secondary',
        icon: 'M13 7h8m0 0v8m0-8L13 15l-4-4-6 6',
    },
    {
        title: 'Empowered People & Technology',
        body: 'Equipping our team with cutting-edge technologies, competencies, and shared values.',
        wrap: 'bg-primary/10',
        tone: 'text-primary',
        icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    },
];

const steps = ['Brief', 'Design', 'Build', 'Deliver', 'Support'];

const contacts = [
    {
        title: 'Location',
        lines: ['Blk 3 Lot 3 Phase 3 Titus St.', 'Punta Altezza Subd, Calamba City', 'Laguna, Philippines 4027'],
        wrap: 'bg-primary/10',
        tone: 'text-primary',
        icons: [
            'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
            'M15 11a3 3 0 11-6 0 3 3 0 016 0z',
        ],
    },
    {
        title: 'Email',
        lines: ['sales@netsworksgroup.com'],
        wrap: 'bg-secondary/10',
        tone: 'text-secondary',
        icons: ['M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'],
    },
    {
        title: 'Mobile',
        lines: ['+63 917-188-3577'],
        wrap: 'bg-primary/10',
        tone: 'text-primary',
        icons: ['M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'],
    },
];

// ------------------------------------------------------------ demo quote form
// This is a static Vercel demo: there is no backend, so nothing is sent. The
// real Laravel site posts to AboutController::sendQuote behind a session
// CAPTCHA and rate limiter. The form is kept so the page looks and feels the
// same; the note beneath the button makes the demo status explicit.
const form = reactive({ name: '', email: '', details: '' });
const sending = ref(false);
const sent = ref(false);
let timer = null;

function submit() {
    sending.value = true;
    sent.value = false;
    timer = setTimeout(() => {
        sending.value = false;
        sent.value = true;
        form.name = form.email = form.details = '';
    }, 700);
}

onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
    <div ref="root">
        <!-- ============================ HERO — offset orb ============================ -->
        <!-- bg-neutral/text-neutral-content: daisyUI's neutral token is dark in both
             themes, giving a "night sky" backdrop without a hardcoded color. -->
        <section class="relative min-h-[85vh] flex flex-col lg:flex-row items-center overflow-hidden bg-neutral text-neutral-content py-20 lg:py-0">
            <!-- Moon: stacked above the copy on mobile; bleeds off the right edge on large screens. -->
            <div class="relative w-full max-w-xs mx-auto aspect-square mb-10 lg:absolute lg:inset-y-0 lg:right-[-12%] lg:w-[55%] lg:max-w-none lg:mx-0 lg:aspect-auto lg:mb-0">
                <ModelViewer
                    src="/models/moon.glb"
                    alt="3D render of the moon"
                    camera-orbit="0deg 75deg 100%"
                    field-of-view="25deg"
                />
            </div>

            <div class="container mx-auto px-6 relative z-10">
                <div class="max-w-xl">
                    <span class="badge badge-lg badge-outline badge-primary mb-4" data-hero-in>Our Trajectory</span>

                    <h1 class="text-4xl lg:text-6xl font-bold leading-tight mb-4" data-hero-in>
                        We take our clients
                        <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent block">Further</span>
                    </h1>

                    <p class="text-base text-neutral-content/70 leading-relaxed mb-8" data-hero-in>
                        Precision electronics fabrication, IT solutions, and mechanical engineering — driven by innovation,
                        <span class="text-primary font-semibold">quality</span>, and a passion for excellence.
                    </p>

                    <div class="flex gap-4 flex-wrap" data-hero-in>
                        <RouterLink :to="{ name: 'about', hash: '#contact' }" class="btn btn-lg bg-gradient-to-r from-primary to-secondary text-primary-content border-none rounded-full">Start a Project</RouterLink>
                        <RouterLink :to="{ name: 'services' }" class="btn btn-lg btn-outline rounded-full">View Our Work</RouterLink>
                    </div>
                </div>
            </div>
        </section>

        <!-- ============================ MISSION RECORD — stats ============================ -->
        <section class="py-16 bg-base-200/30 border-y border-base-300">
            <div class="container mx-auto px-6">
                <div class="stats stats-vertical sm:stats-horizontal shadow w-full bg-base-100">
                    <StatBlock v-for="s in stats" :key="s.label" v-bind="s" />
                </div>
            </div>
        </section>

        <!-- ============================ MISSION BRIEF — bento ============================ -->
        <section class="py-24">
            <div class="container mx-auto px-6">
                <SectionHeading
                    eyebrow="Mission Brief"
                    title="Vision, mission & quality policy"
                    lede="What guides every project we take on."
                />

                <div class="grid lg:grid-cols-3 gap-6">
                    <div v-reveal="'fade-up'" class="lg:col-span-2 card bg-gradient-to-br from-primary/10 to-secondary/10 border border-base-300">
                        <div class="card-body justify-center">
                            <h3 class="card-title text-2xl mb-2">Our Vision</h3>
                            <p class="text-base-content/70">
                                To be the trusted partner in providing premium products and engineering services tailored to client needs, guided by globally competitive standards — locally and beyond.
                            </p>
                        </div>
                    </div>

                    <div v-reveal="'fade-up'" class="card bg-primary text-primary-content">
                        <div class="card-body">
                            <h3 class="card-title">Quality Policy</h3>
                            <p class="text-primary-content/80 text-sm">
                                We are committed to delivering premium products and engineering services that meet customer needs and global standards, ensuring excellence in every solution we provide.
                            </p>
                        </div>
                    </div>

                    <div v-for="p in pillars" :key="p.title" v-reveal="'fade-up'" class="card bg-base-100 border border-base-300 shadow-sm">
                        <div class="card-body">
                            <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" :class="p.wrap">
                                <svg class="w-6 h-6" :class="p.tone" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="p.icon" />
                                </svg>
                            </div>
                            <h4 class="font-bold mb-1">{{ p.title }}</h4>
                            <p class="text-base-content/70 text-sm">{{ p.body }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ============================ FLIGHT PLAN — steps ============================ -->
        <section class="py-24 bg-base-200/30">
            <div class="container mx-auto px-6">
                <SectionHeading
                    eyebrow="Flight Plan"
                    title="How we work with you, start to finish"
                    lede="A clear process from first conversation to ongoing support."
                />

                <!-- Labels only: a daisyUI step's label is the <li>'s own text; nested
                     blocks blow the grid columns out. Uniform step-primary so every
                     connector fills (daisyUI only colors a connector between adjacent
                     steps that share a modifier). -->
                <ul v-reveal="'fade-up'" class="steps steps-vertical lg:steps-horizontal w-full">
                    <li v-for="s in steps" :key="s" class="step step-primary">{{ s }}</li>
                </ul>
            </div>
        </section>

        <!-- ============================ GROUND CONTROL — map + contact ============================ -->
        <section class="py-24">
            <div class="container mx-auto px-6">
                <SectionHeading eyebrow="Ground Control" title="Where to find us" lede="Visit us or schedule a meeting at our Calamba City office." />

                <div class="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    <div v-reveal="'fade-up'" class="lg:col-span-2 rounded-3xl overflow-hidden shadow-lg border border-base-300" style="height: 400px">
                        <iframe
                            src="https://www.google.com/maps?q=Blk+3+Lot+3+Phase+3+Titus+St,+Punta+Altezza+Subd,+Calamba+City,+Laguna,+Philippines+4027&output=embed"
                            width="100%"
                            height="400"
                            style="border: 0"
                            allowfullscreen
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                            title="Netsworks office location"
                        ></iframe>
                    </div>

                    <div v-reveal="'fade-up'" class="flex flex-col gap-4">
                        <div v-for="c in contacts" :key="c.title" class="card bg-base-100 border border-base-300 shadow-sm">
                            <div class="card-body flex-row items-start gap-4 p-5">
                                <div class="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0" :class="c.wrap">
                                    <svg class="w-5 h-5" :class="c.tone" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            v-for="d in c.icons"
                                            :key="d"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            :d="d"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-sm">{{ c.title }}</h4>
                                    <p class="text-xs text-base-content/70">
                                        <template v-for="(line, i) in c.lines" :key="line">
                                            <br v-if="i > 0" />{{ line }}
                                        </template>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ============================ READY FOR LAUNCH — quote form (demo) ============================ -->
        <section id="contact" class="py-24 bg-base-200/30">
            <div class="container mx-auto px-6 max-w-2xl">
                <SectionHeading eyebrow="Ready for Launch?" title="Request a quote" lede="Send us your project details and our team will get back to you promptly." />

                <div v-if="sent" class="alert alert-success mb-6" role="status">
                    <span>Thanks! In the live site your request would be sent to our team — this is a demo build, so nothing was actually submitted.</span>
                </div>

                <form class="card bg-base-100 border border-base-300 shadow-lg" @submit.prevent="submit">
                    <div class="card-body space-y-6">
                        <div class="grid md:grid-cols-2 gap-6">
                            <fieldset class="fieldset">
                                <legend class="fieldset-legend">Name</legend>
                                <input v-model="form.name" type="text" name="name" required class="input input-bordered w-full" />
                            </fieldset>
                            <fieldset class="fieldset">
                                <legend class="fieldset-legend">Email</legend>
                                <input v-model="form.email" type="email" name="email" required class="input input-bordered w-full" />
                            </fieldset>
                        </div>

                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Project Details</legend>
                            <textarea v-model="form.details" name="details" rows="5" required class="textarea textarea-bordered w-full"></textarea>
                        </fieldset>

                        <div>
                            <button
                                type="submit"
                                class="btn btn-lg w-full bg-gradient-to-r from-primary to-secondary text-primary-content border-none rounded-2xl"
                                :disabled="sending"
                            >
                                <span v-if="sending" class="loading loading-spinner loading-sm"></span>
                                {{ sending ? 'Sending…' : 'Send Request' }}
                            </button>
                            <p class="text-xs text-base-content/50 text-center mt-3">Demo build — submissions aren't sent.</p>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>
