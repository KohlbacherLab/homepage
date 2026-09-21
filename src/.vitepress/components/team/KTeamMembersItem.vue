<!--
  - Copyright (c) 2024.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->
<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import { VPLink, VPSocialLinks } from 'vitepress/theme';
import type { Person } from '../../domains/index.ts';

export default defineComponent({
    components: {
        VPLink,
        VPSocialLinks,
    },
    props: {
        member: {
            type: Object as PropType<Person>,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
    },
});
</script>

<template>
    <article class="flex size-full flex-col gap-0.5 overflow-hidden rounded-xl">
        <div class="grow bg-bg-muted px-8 py-12">
            <div>
                <VPLink :href="'/persons/' + slug">
                    <img
                        class="relative mx-auto size-24 shrink-0 rounded-full object-cover shadow-(--vp-shadow-3)"
                        :src="member.avatar"
                        :alt="member.name"
                    >
                </VPLink>
            </div>
            <div class="pt-6 text-center">
                <h1 class="m-0 text-xl/7 font-semibold tracking-[0.15px]">
                    <VPLink :href="'/persons/' + slug">
                        {{ member.name }}
                    </VPLink>
                </h1>
                <p
                    v-if="member.role"
                    class="m-0 pt-1 font-medium text-fg-muted"
                >
                    <span
                        v-for="(item, index) in [member.role].flat()"
                        :key="index"
                        class="block"
                    >
                        {{ item }}
                    </span>
                </p>
                <p
                    v-if="member.description"
                    class="mx-auto line-clamp-3 max-w-[288px] pt-4
                        [&_a]:font-medium [&_a]:text-(--vp-c-brand-1) [&_a]:decoration-dotted [&_a]:transition-colors"
                    v-html="member.description"
                />
                <div
                    v-if="member.socialLinks"
                    class="-mx-4 -mb-3 flex h-14 justify-center px-3 pt-4"
                >
                    <VPSocialLinks :links="member.socialLinks" />
                </div>
            </div>
        </div>
        <div v-if="member.sponsor">
            <VPLink
                class="flex items-center justify-center bg-bg-muted p-4 text-center text-sm font-medium
                    text-(--vp-c-sponsor) transition-colors duration-250
                    hover:bg-(--vp-c-sponsor) hover:text-(--vp-c-white)
                    focus:bg-(--vp-c-sponsor) focus:text-(--vp-c-white) focus:outline-none"
                :href="member.sponsor"
                no-icon
            >
                <span class="vpi-heart mr-2 text-base" /> {{ member.actionText || 'Sponsor' }}
            </VPLink>
        </div>
    </article>
</template>
