<!--
  - Copyright (c) 2026.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->
<script lang="ts">
import { VPLink } from 'vitepress/theme';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { VPLink },
    props: {
        eyebrow: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            default: undefined,
        },
        linkText: {
            type: String,
            default: undefined,
        },
    },
});
</script>
<template>
    <div class="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
            <p class="k-eyebrow">
                {{ eyebrow }}
            </p>
            <h2 class="k-heading">
                {{ title }}
            </h2>
            <slot />
        </div>
        <VPLink
            v-if="link && linkText"
            :href="link"
            class="k-link text-sm whitespace-nowrap"
        >
            {{ linkText }} →
        </VPLink>
    </div>
</template>
