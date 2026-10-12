import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './pages/HomePage.vue';
import ServicesPage from './pages/ServicesPage.vue';
import CapabilitiesPage from './pages/CapabilitiesPage.vue';
import AboutPage from './pages/AboutPage.vue';

const SITE = 'Netsworks';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'welcome', component: HomePage, meta: { title: `${SITE} — Precision Electronics & Clean Room Supplies` } },
        { path: '/services', name: 'services', component: ServicesPage, meta: { title: `Services — ${SITE}` } },
        { path: '/capabilities', name: 'capabilities', component: CapabilitiesPage, meta: { title: `Capabilities — ${SITE}` } },
        { path: '/about', name: 'about', component: AboutPage, meta: { title: `About — ${SITE}` } },
        { path: '/:pathMatch(.*)*', redirect: '/' },
    ],
    // Router hash links don't get the browser's native scroll-padding handling,
    // so offset by the fixed header's height explicitly.
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return { el: to.hash, top: 96, behavior: 'smooth' };
        }
        if (savedPosition) return savedPosition;
        return { top: 0 };
    },
});

router.afterEach((to) => {
    document.title = to.meta.title || SITE;
});

export default router;
