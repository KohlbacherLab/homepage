<!--
  - Copyright (c) 2024.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script lang="ts">
import {
    computed, defineComponent, ref,
} from 'vue';
import { TeamFilter } from '../../domains/team/constants.ts';
import { data } from '../../data/team.data';
import KTeamMembers from './KTeamMembers.vue';
import KTeamSwitch from './KTeamSwitch.vue';

export default defineComponent({
    components: {
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
    <div class="container">
        <div class="page-title">
            <h1 class="page-title-text">
                <i class="fas fa-user-friends" /> Team
            </h1>
        </div>
        <div class="d-flex flex-column gap-2">
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
                class="empty-state text-center py-4"
            >
                {{ group === 'inactive'
                    ? 'No inactive members.'
                    : 'No active members.' }}
            </div>
        </div>
    </div>
</template>
<style scoped>
.VPTeamPage {
    margin: 0 !important;
}

.title {
    letter-spacing: -0.5px;
    line-height: 56px;
    font-size: 48px;
}

.empty-state {
    color: var(--vp-c-text-2);
}
</style>
