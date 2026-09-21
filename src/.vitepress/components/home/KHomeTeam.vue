<!--
  - Copyright (c) 2026.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->
<script lang="ts">
import { VPLink } from 'vitepress/theme';
import { computed, defineComponent } from 'vue';
import { data } from '../../data/team.data';
import { getPersonAvatar } from '../../domains/person/avatar.ts';
import { selectActiveMembers } from '../../domains/team/select.ts';
import KHomeSectionHeader from './KHomeSectionHeader.vue';
import { useHomeLead } from './composables.ts';

const MEMBER_AVATAR_CLASS = 'mx-auto mb-2 size-14 rounded-full border-2 border-bg object-cover ring-1 ring-border transition group-hover:ring-primary-500 md:size-[60px]';

export default defineComponent({
    components: {
        KHomeSectionHeader,
        VPLink,
    },
    setup() {
        const lead = useHomeLead();

        const members = computed(() => selectActiveMembers(data)
            .filter(([slug]) => slug !== lead.value.person)
            .map(([slug, person]) => ({
                slug,
                name: person.name,
                avatar: getPersonAvatar(person),
                role: [person.role ?? []].flat()[0],
            })));

        return {
            lead,
            members,
            memberAvatarClass: MEMBER_AVATAR_CLASS,
        };
    },
});
</script>
<template>
    <section class="k-section">
        <div class="k-wrap">
            <KHomeSectionHeader
                eyebrow="People"
                title="The team"
                link="/team"
                link-text="Meet the team"
            />
            <div class="grid gap-7 lg:grid-cols-[340px_1fr]">
                <VPLink
                    :href="`/persons/${lead.person}`"
                    class="k-card k-card-interactive flex flex-col self-start overflow-hidden"
                >
                    <img
                        class="h-64 w-full object-cover object-[50%_25%]"
                        :src="lead.avatar"
                        :alt="lead.name"
                    >
                    <span class="block p-5">
                        <span class="k-eyebrow mb-1 block">{{ lead.role }}</span>
                        <span class="block text-[22px] leading-tight font-bold tracking-tight text-fg">{{ lead.name }}</span>
                        <span class="mt-2 mb-3.5 block text-sm leading-relaxed text-fg-muted">{{ lead.summary }}</span>
                        <span class="k-link text-sm">View profile →</span>
                    </span>
                </VPLink>
                <ul class="m-0 grid list-none grid-cols-3 content-start gap-x-3 gap-y-5 p-0 sm:grid-cols-4 md:grid-cols-5">
                    <li
                        v-for="member in members"
                        :key="member.slug"
                        class="text-center"
                    >
                        <VPLink
                            :href="`/persons/${member.slug}`"
                            class="group block"
                        >
                            <img
                                :class="memberAvatarClass"
                                :src="member.avatar"
                                :alt="member.name"
                            >
                            <span class="block text-[13px] leading-tight font-semibold text-fg">{{ member.name }}</span>
                            <span
                                v-if="member.role"
                                class="block text-[11.5px] leading-snug text-fg-muted"
                            >{{ member.role }}</span>
                        </VPLink>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>
