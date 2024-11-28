<!--
  - Copyright (c) 2024.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script lang="ts">
import {
    VPTeamPage, VPTeamPageSection,
} from 'vitepress/theme';
import {
    computed, defineComponent, ref,
} from 'vue';
import { TeamID } from '../../domains/team/constants';
import KTeamMembers from './KTeamMembers.vue';
import KTeamSwitch from './KTeamSwitch.vue';
import { data } from '../../data/team.data';

export default defineComponent({
    components: {
        KTeamMembers,
        KTeamSwitch,
        VPTeamPage,
        VPTeamPageSection,
    },
    setup() {
        const group = ref(TeamID.ALL);
        const handlePicked = (value: TeamID) => {
            group.value = value;
        };

        const members = data;

        const items = computed(() => members
            .filter(([, member]) => {
                if (group.value === TeamID.ALL) {
                    return true;
                }

                const teams = Array.isArray(member.team) ? member.team : [member.team];

                return teams.indexOf(group.value) !== -1;
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
                :members="items"
            />
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
</style>
