<!--
  - Copyright (c) 2026.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->
<script lang="ts">
import { parse } from '@retorquere/bibtex-parser';
import { VPLink } from 'vitepress/theme';
import { defineComponent } from 'vue';
import { data } from '../../data/bib.data';
import { formatAuthors } from '../../domains/publication/format.ts';
import { getPublicationLink } from '../../domains/publication/link.ts';
import KHomeSectionHeader from './KHomeSectionHeader.vue';

// pub.bib lists the newest entries first.
const LIMIT = 4;

const VENUE_BADGE_CLASS = 'mt-2 inline-block rounded-full bg-primary-50 px-2 py-0.5 text-xs font-semibold text-primary-700 dark:bg-primary-500/15 dark:text-primary-300';

export default defineComponent({
    components: {
        KHomeSectionHeader,
        VPLink,
    },
    setup() {
        const { entries } = parse(data);

        const items = entries.slice(0, LIMIT).map((entry) => ({
            key: entry.key,
            title: entry.fields.title,
            year: entry.fields.year,
            venue: entry.fields.journal,
            authors: formatAuthors(entry),
            link: getPublicationLink(entry),
        }));

        return {
            items,
            venueBadgeClass: VENUE_BADGE_CLASS,
        };
    },
});
</script>
<template>
    <section class="k-section k-section-alt">
        <div class="k-wrap">
            <KHomeSectionHeader
                eyebrow="Output"
                title="Latest publications"
                link="/publications"
                link-text="All publications"
            />
            <ol class="m-0 list-none border-t border-border p-0">
                <li
                    v-for="item in items"
                    :key="item.key"
                    class="grid gap-2 border-b border-border py-5 md:grid-cols-[150px_1fr] md:gap-6"
                >
                    <div>
                        <div class="text-[22px] leading-none font-bold tracking-tight text-fg">
                            {{ item.year }}
                        </div>
                        <span
                            v-if="item.venue"
                            :class="venueBadgeClass"
                        >
                            {{ item.venue }}
                        </span>
                    </div>
                    <div class="min-w-0">
                        <h3 class="m-0 text-[16.5px] leading-snug font-semibold text-fg">
                            <VPLink
                                v-if="item.link"
                                :href="item.link"
                                class="hover:text-primary-600 dark:hover:text-primary-300"
                            >
                                {{ item.title }}
                            </VPLink>
                            <template v-else>
                                {{ item.title }}
                            </template>
                        </h3>
                        <p class="m-0 mt-1.5 truncate text-[13.5px] text-fg-muted">
                            {{ item.authors }}
                        </p>
                    </div>
                </li>
            </ol>
        </div>
    </section>
</template>
