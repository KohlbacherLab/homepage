<!--
  - Copyright (c) 2024.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent } from 'vue';
import type { Person } from '../../domains/index.ts';
import KTeamMembersItem from './KTeamMembersItem.vue';

export default defineComponent({
    components: { KTeamMembersItem },
    props: {
        members: {
            type: Array as PropType<[string, Person][]>,
            required: true,
        },
    },
    setup(props) {
        // Keep one or two cards from stretching over the full width.
        const maxWidth = computed(() => {
            if (props.members.length === 1) {
                return 'max-w-[368px]';
            }

            if (props.members.length === 2) {
                return 'max-w-[760px]';
            }

            return undefined;
        });

        return { maxWidth };
    },
});

</script>

<template>
    <div
        class="mx-auto grid w-full grid-cols-[repeat(auto-fit,minmax(256px,1fr))] gap-6
            min-[375px]:grid-cols-[repeat(auto-fit,minmax(288px,1fr))]"
        :class="maxWidth"
    >
        <div
            v-for="[slug, member] in members"
            :key="member.name"
        >
            <KTeamMembersItem
                :member="member"
                :slug="slug"
            />
        </div>
    </div>
</template>
