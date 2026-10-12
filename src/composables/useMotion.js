import { onBeforeUnmount, onMounted } from 'vue';
import { animate, stagger } from 'animejs';

export const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Staggers in everything marked data-hero-in inside the given root on mount.
 * Under reduced motion the elements are simply shown.
 */
export function useHeroEntrance(rootRef) {
    let anim = null;

    onMounted(() => {
        const targets = rootRef.value?.querySelectorAll('[data-hero-in]');
        if (!targets?.length) return;

        if (prefersReducedMotion()) {
            targets.forEach((el) => (el.style.opacity = 1));
            return;
        }

        anim = animate(targets, {
            opacity: [0, 1],
            translateY: [16, 0],
            delay: stagger(120, { start: 150 }),
            duration: 700,
            ease: 'outQuad',
        });
    });

    onBeforeUnmount(() => anim?.cancel?.());
}

/**
 * A small looping bob for the hero's "scroll down" chevron.
 * Anime.js rather than Tailwind's animate-bounce so it sits behind the same
 * reduced-motion gate as every other animation here.
 */
export function useScrollCue(elRef) {
    let anim = null;

    onMounted(() => {
        if (!elRef.value || prefersReducedMotion()) return;
        anim = animate(elRef.value, {
            translateY: [0, 8, 0],
            loop: true,
            duration: 1500,
            ease: 'inOutSine',
        });
    });

    onBeforeUnmount(() => anim?.cancel?.());
}
