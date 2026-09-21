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
import { data } from '../../data/team.data';
import { getPersonAvatar } from '../../domains/person/avatar.ts';
import { selectTeamMembers } from '../../domains/team/select.ts';
import KHomeSectionHeader from './KHomeSectionHeader.vue';
import { useHomeLead } from './composables.ts';
import type { HomeGroups } from './types.ts';

const STACK_SIZE = 6;

export default defineComponent({
    components: {
        KHomeSectionHeader,
        VPLink,
    },
    setup() {
        const { frontmatter } = useData();
        const lead = useHomeLead();

        const intro = computed(() => (frontmatter.value.groups as HomeGroups).intro);

        const groups = computed(() => (frontmatter.value.groups as HomeGroups).items.map((group) => {
            const members = selectTeamMembers(data, group.id, lead.value.person);

            return {
                ...group,
                avatars: members.slice(0, STACK_SIZE).map(([slug, person]) => ({
                    slug,
                    name: person.name,
                    avatar: getPersonAvatar(person),
                })),
                rest: Math.max(members.length - STACK_SIZE, 0),
            };
        }));

        return {
            intro,
            groups,
        };
    },
});
</script>
<template>
    <section class="k-section">
        <div class="k-wrap">
            <KHomeSectionHeader
                eyebrow="Who we are"
                title="One lab, two groups"
            >
                <p class="m-0 mt-3 max-w-[60ch] text-base text-fg-muted">
                    {{ intro }}
                </p>
            </KHomeSectionHeader>
            <div class="grid gap-5 md:grid-cols-2">
                <article
                    v-for="group in groups"
                    :key="group.id"
                    class="k-card flex flex-col p-6"
                >
                    <div
                        class="mb-5 inline-grid h-11 w-fit place-items-center rounded-[12px] bg-primary-50 px-3 text-[15px]
                            font-extrabold tracking-wide text-primary-600 uppercase dark:bg-primary-500/15 dark:text-primary-300"
                    >
                        {{ group.id }}
                    </div>
                    <h3 class="m-0 text-xl font-bold tracking-tight text-fg">
                        {{ group.name }}
                    </h3>
                    <p class="m-0 mt-0.5 mb-3 text-sm font-semibold text-primary-600 dark:text-primary-400">
                        {{ group.institution }}
                    </p>
                    <p class="m-0 mb-5 grow text-[15px] leading-relaxed text-fg-muted">
                        {{ group.summary }}
                    </p>
                    <div class="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
                        <div class="flex items-center">
                            <img
                                v-for="(member, index) in group.avatars"
                                :key="member.slug"
                                class="size-9 rounded-full border-2 border-bg-elevated object-cover"
                                :class="{ '-ml-2.5': index > 0 }"
                                :src="member.avatar"
                                :alt="member.name"
                                :title="member.name"
                            >
                            <span
                                v-if="group.rest > 0"
                                class="-ml-2.5 grid size-9 place-items-center rounded-full border-2 border-bg-elevated bg-primary-50
                                    text-xs font-bold text-primary-600 dark:bg-primary-900 dark:text-primary-300"
                            >
                                +{{ group.rest }}
                            </span>
                        </div>
                        <VPLink
                            class="k-link text-sm"
                            :href="`/team?group=${group.id}`"
                        >
                            Meet the {{ group.id.toUpperCase() }} team →
                        </VPLink>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>
