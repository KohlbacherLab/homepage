<!--
  - Copyright (c) 2026.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->
<script lang="ts">
import { useData } from 'vitepress';
import { VPLink } from 'vitepress/theme';
import { computed, defineComponent } from 'vue';
import { useHomeLead } from './composables.ts';
import type { HomeHero } from './types.ts';

// Bar heights in percent, shaped like the peaks in the logo.
const SPECTRUM = [
    4,
    7,
    3,
    9,
    5,
    4,
    11,
    6,
    3,
    8,
    5,
    14,
    4,
    6,
    3,
    9,
    5,
    7,
    4,
    12,
    6,
    3,
    8,
    22,
    9,
    5,
    28,
    48,
    66,
    95,
    72,
    41,
    14,
    6,
    9,
    4,
    18,
    34,
    12,
    5,
    7,
    3,
    10,
    5,
];

const ACCENTS : Record<number, string> = {
    28: 'bg-accent-sky',
    29: 'bg-accent-pink',
    30: 'bg-accent-sky',
    37: 'bg-accent-sky',
};

export default defineComponent({
    components: { VPLink },
    setup() {
        const { frontmatter } = useData();

        const hero = computed(() => frontmatter.value.hero as HomeHero);
        const lead = useHomeLead();

        const bars = SPECTRUM.map((height, index) => ({
            height: `${height}%`,
            color: ACCENTS[index] ?? 'bg-primary-400',
        }));

        return {
            hero,
            lead,
            bars,
        };
    },
});
</script>
<template>
    <header class="k-night k-hero">
        <div class="k-wrap">
            <div class="max-w-[860px]">
                <p class="m-0 mb-4 text-xs font-semibold tracking-[0.12em] text-primary-300 uppercase">
                    {{ hero.eyebrow }}
                </p>
                <h1 class="m-0 mb-5 text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.03] font-bold tracking-[-0.035em] text-white">
                    {{ hero.title }} <span class="k-gradient-text">{{ hero.highlight }}</span>
                </h1>
                <p class="m-0 mb-8 max-w-[58ch] text-base leading-relaxed text-night-fg-muted md:text-lg">
                    {{ hero.description }}
                </p>
                <div class="flex flex-wrap gap-3">
                    <VPLink
                        v-for="(action, index) in hero.actions"
                        :key="action.link"
                        :href="action.link"
                        :class="index === 0 ?
                            `rounded-[10px] bg-primary-500 px-4.5 py-2.5 text-sm font-semibold text-white
                                shadow-[0_8px_24px_-8px_rgb(99_102_241)] transition-colors hover:bg-primary-400` :
                            `rounded-[10px] border border-white/20 bg-white/5 px-4.5 py-2.5 text-sm text-night-fg
                                transition-colors hover:border-white/40`"
                    >
                        {{ action.text }}<span
                            v-if="index > 0"
                            aria-hidden="true"
                        > →</span>
                    </VPLink>
                </div>
                <VPLink
                    :href="`/persons/${lead.person}`"
                    class="mt-11 flex w-fit items-center gap-3 text-sm text-night-fg-muted"
                >
                    <img
                        class="size-10 rounded-full border-2 border-primary-300/50 object-cover"
                        :src="lead.avatar"
                        alt=""
                    >
                    <span>Led by <strong class="text-white">{{ lead.name }}</strong></span>
                </VPLink>
            </div>
        </div>
        <div
            class="k-wrap mt-14"
            aria-hidden="true"
        >
            <div class="flex h-24 items-end gap-1 border-b border-white/20 md:h-28">
                <span
                    v-for="(bar, index) in bars"
                    :key="index"
                    class="k-spectrum-bar flex-1 rounded-t-sm opacity-80"
                    :class="bar.color"
                    :style="{ height: bar.height }"
                />
            </div>
        </div>
    </header>
</template>
