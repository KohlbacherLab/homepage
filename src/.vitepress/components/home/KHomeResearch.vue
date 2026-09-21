<!--
  - Copyright (c) 2026.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->
<script lang="ts">
import { VPLink } from 'vitepress/theme';
import { defineComponent } from 'vue';
import { data } from '../../data/research.data';
import KHomeSectionHeader from './KHomeSectionHeader.vue';

const ICON_TILE_CLASS = 'mb-4 grid size-[42px] place-items-center rounded-[11px] bg-primary-50 text-lg text-primary-600 dark:bg-primary-500/15 dark:text-primary-300';

export default defineComponent({
    components: {
        KHomeSectionHeader,
        VPLink,
    },
    setup() {
        return {
            areas: data,
            iconTileClass: ICON_TILE_CLASS,
        };
    },
});
</script>
<template>
    <section class="k-section k-section-alt">
        <div class="k-wrap">
            <KHomeSectionHeader
                eyebrow="What we work on"
                title="Research areas"
                link="/research"
                link-text="All research"
            />
            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <VPLink
                    v-for="area in areas"
                    :key="area.anchor"
                    :href="`/research#${area.anchor}`"
                    class="k-card k-card-interactive block p-6"
                >
                    <div :class="iconTileClass">
                        <i
                            :class="area.icon"
                            aria-hidden="true"
                        />
                    </div>
                    <h3 class="m-0 mb-1.5 text-[17px] font-semibold tracking-tight text-fg">
                        {{ area.title }}
                    </h3>
                    <p class="m-0 text-[14.5px] leading-relaxed text-fg-muted">
                        {{ area.summary }}
                    </p>
                </VPLink>
                <VPLink
                    href="/research"
                    class="k-night k-card-interactive flex min-h-40 flex-col justify-between rounded-[16px] p-6"
                >
                    <h3 class="m-0 text-lg font-semibold text-white">
                        Explore our research in depth
                    </h3>
                    <span class="text-sm font-semibold text-primary-300">Go to research →</span>
                </VPLink>
            </div>
        </div>
    </section>
</template>
