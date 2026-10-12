<script setup>
import CategoryBadge from './CategoryBadge.vue';

defineProps({
    item: { type: Object, required: true },
});

defineEmits(['open']);
</script>

<template>
    <div
        v-reveal="'fade-up'"
        class="card bg-base-100 shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-2xl"
    >
        <figure class="h-56 overflow-hidden">
            <img
                :src="item.image"
                :alt="item.alt"
                loading="lazy"
                class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
        </figure>
        <div class="card-body">
            <CategoryBadge :category="item.category" :label="item.badge" />
            <h3 class="card-title text-xl">{{ item.title }}</h3>
            <p class="text-base-content/70 text-sm">{{ item.description }}</p>

            <div class="card-actions justify-between items-center mt-2">
                <div class="flex flex-wrap gap-1">
                    <span v-for="tag in item.tags" :key="tag" class="badge badge-ghost badge-sm">{{ tag }}</span>
                </div>
                <button type="button" class="btn btn-ghost btn-sm text-primary" @click="$emit('open', item.slug)">
                    View Details
                </button>
            </div>
        </div>
    </div>
</template>
