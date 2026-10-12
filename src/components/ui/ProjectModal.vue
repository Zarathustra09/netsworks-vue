<script setup>
import CategoryBadge from './CategoryBadge.vue';

defineProps({
    item: { type: Object, required: true },
});
</script>

<template>
    <!-- modal-bottom sm:modal-middle: a bottom sheet on mobile, centered on desktop. -->
    <dialog :id="`modal-${item.slug}`" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box max-w-3xl">
            <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-3 top-3" aria-label="Close">✕</button>
            </form>

            <h3 class="text-2xl font-bold mb-2">{{ item.modal_title || item.title }}</h3>

            <div class="flex flex-wrap items-center gap-2 mb-4">
                <CategoryBadge :category="item.category" :label="item.badge" />
                <span v-for="tag in item.tags" :key="tag" class="badge badge-ghost badge-sm">{{ tag }}</span>
            </div>

            <img :src="item.image" :alt="item.alt" class="w-full h-56 object-cover rounded-box mb-6" />

            <!-- Unique radio group name per modal - with 20 modals on one page,
                 a shared name would merge every modal's tabs into one group. -->
            <div class="tabs tabs-lift">
                <input type="radio" :name="`modal-tabs-${item.slug}`" class="tab" aria-label="Overview" checked />
                <div class="tab-content bg-base-100 border-base-300 p-6">
                    <p class="text-base-content/70 text-sm">{{ item.overview }}</p>
                </div>

                <input type="radio" :name="`modal-tabs-${item.slug}`" class="tab" aria-label="Specifications" />
                <div class="tab-content bg-base-100 border-base-300 p-6">
                    <div class="overflow-x-auto">
                        <table class="table table-zebra table-sm">
                            <tbody>
                                <tr v-for="(value, label) in item.specs" :key="label">
                                    <th class="w-1/3">{{ label }}</th>
                                    <td>{{ value }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <input type="radio" :name="`modal-tabs-${item.slug}`" class="tab" aria-label="Features" />
                <div class="tab-content bg-base-100 border-base-300 p-6">
                    <h4 class="font-semibold mb-2">{{ item.features_title }}</h4>
                    <ul class="space-y-1 text-sm text-base-content/70 mb-4">
                        <li v-for="feature in item.features" :key="feature">• {{ feature }}</li>
                    </ul>

                    <template v-if="item.extra && item.extra.length">
                        <h4 class="font-semibold mb-2">{{ item.extra_title }}</h4>
                        <ul class="space-y-1 text-sm text-base-content/70">
                            <li v-for="line in item.extra" :key="line">• {{ line }}</li>
                        </ul>
                    </template>
                </div>
            </div>

            <div class="modal-action">
                <RouterLink :to="{ name: 'about', hash: '#contact' }" class="btn btn-primary">Request a Quote</RouterLink>
                <form method="dialog">
                    <button class="btn">Close</button>
                </form>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
</template>
