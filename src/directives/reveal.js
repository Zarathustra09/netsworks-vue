import { animate } from 'animejs';

const OFFSETS = {
    'fade-up': { y: [24, 0] },
    'fade-left': { x: [-24, 0] },
    'fade-right': { x: [24, 0] },
};

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * v-reveal="'fade-up'" - animates the element in the first time it scrolls
 * into view. Replaces the Laravel site's global data-reveal observer; as a
 * directive it cleans itself up when the element unmounts, which matters in
 * an SPA where pages come and go.
 *
 * The element starts at opacity 0 via the [data-reveal] rule in app.css.
 */
export const reveal = {
    mounted(el, binding) {
        el.setAttribute('data-reveal', binding.value || 'fade');

        if (reducedMotion() || !('IntersectionObserver' in window)) {
            el.style.opacity = 1;
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    el._revealAnim = animate(el, {
                        opacity: [0, 1],
                        ...(OFFSETS[binding.value] || {}),
                        duration: 600,
                        ease: 'outQuad',
                    });
                    observer.disconnect();
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
        );

        observer.observe(el);
        el._revealObserver = observer;
    },
    unmounted(el) {
        el._revealObserver?.disconnect();
        el._revealAnim?.cancel?.();
    },
};
