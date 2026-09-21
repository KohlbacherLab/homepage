<!--
  - Copyright (c) 2024.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script lang="ts">
import {
    computed,
    defineComponent,
    ref,
} from 'vue';
import { TeamFilter } from '../../domains/team/constants.ts';
import { data } from '../../data/team.data';
import KPageTitle from '../utilities/page-title/KPageTitle.vue';
import KTeamMembers from './KTeamMembers.vue';
import KTeamSwitch from './KTeamSwitch.vue';

export default defineComponent({
    components: {
        KPageTitle,
        KTeamMembers,
        KTeamSwitch,
    },
    setup() {
        const group = ref(TeamFilter.ACTIVE);
        const handlePicked = (value: TeamFilter) => {
            group.value = value;
        };

        const members = data;

        const items = computed(() => members
            .filter(([, member]) => {
                if (group.value === TeamFilter.INACTIVE) {
                    return !!member.inactive;
                }

                return !member.inactive;
            }));

        return {
            group,
            handlePicked,

            items,
        };
    },
});
</script>
<template>
    <div class="vp-raw mx-auto w-full max-w-[1320px] px-3">
        <KPageTitle icon="fas fa-user-friends">
            Team
        </KPageTitle>
        <div class="flex flex-col gap-2">
            <div>
                <KTeamSwitch
                    :group="group"
                    @picked="handlePicked"
                />
            </div>
            <KTeamMembers
                v-if="items.length > 0"
                :members="items"
            />
            <div
                v-else
                class="py-6 text-center text-fg-muted"
            >
                {{ group === 'inactive'
                    ? 'No inactive members.'
                    : 'No active members.' }}
            </div>
        </div>
    </div>
</template>
