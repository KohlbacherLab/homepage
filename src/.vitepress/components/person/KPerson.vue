<!--
  - Copyright (c) 2024-2024.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script lang="ts">
import { computed, defineComponent } from 'vue';
import type { Person } from '../../domains/index.ts';
import { KHistoryEntries } from '../history/index.ts';

import { data } from '../../data/team.data';
import KPersonContact from '../utilities/contact/KContactDetails.vue';

export default defineComponent({
    components: { KPersonContact, KHistoryEntries },
    props: { slug: { type: String } },
    setup(props) {
        const entity = computed<Person>(() => {
            const match = data.find((member) => member[0] === props.slug);
            if (!match) {
                throw new Error(`Person not found: ${props.slug}`);
            }
            return match[1];
        });

        return { entity };
    },
});
</script>
<template>
    <div class="vp-raw flex flex-col gap-2">
        <div class="flex flex-row gap-4">
            <div class="shrink-0">
                <img
                    class="size-40 rounded-full object-cover"
                    :src="entity.avatar"
                    :alt="entity.name"
                >
            </div>
            <div class="min-w-0 wrap-break-word">
                <h1 class="mb-0 text-[28px]/10 font-semibold tracking-[-0.02em] md:text-[32px]">
                    {{ entity.name }}
                </h1>

                <strong
                    v-for="(item, index) in [entity.role].flat()"
                    :key="index"
                    class="block"
                >{{ item }}</strong>

                <KPersonContact :entity="entity" />
            </div>
        </div>

        <p
            v-if="entity.description"
            class="my-4 leading-7 [&_a]:font-medium [&_a]:text-(--vp-c-brand-1) [&_a]:underline [&_a]:underline-offset-2"
            v-html="entity.description"
        />

        <div v-if="entity.interests">
            <h3 class="mt-8 text-xl/7 font-semibold tracking-[-0.01em] text-(--vp-c-indigo-3)">
                <i class="fa fa-lightbulb" /> Interests
            </h3>

            <ul class="list-disc ps-5">
                <li
                    v-for="(item, key) in entity.interests"
                    :key="key"
                >
                    {{ item }}
                </li>
            </ul>
        </div>
        <div v-if="entity.education">
            <h3 class="mt-8 text-xl/7 font-semibold tracking-[-0.01em] text-(--vp-c-indigo-3)">
                <i class="fas fa-graduation-cap" /> Education
            </h3>
            <KHistoryEntries :items="entity.education" />
        </div>
        <div v-if="entity.biography">
            <h3 class="mt-8 text-xl/7 font-semibold tracking-[-0.01em] text-(--vp-c-indigo-3)">
                <i class="fas fa-book" /> Biography
            </h3>
            <KHistoryEntries :items="entity.biography" />
        </div>
        <div v-if="entity.awards">
            <h3 class="mt-8 text-xl/7 font-semibold tracking-[-0.01em] text-(--vp-c-indigo-3)">
                <i class="fas fa-trophy" /> Awards
            </h3>
            <KHistoryEntries :items="entity.awards" />
        </div>
    </div>
</template>
