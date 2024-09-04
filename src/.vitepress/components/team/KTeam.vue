<script lang="ts">
import {
    VPTeamMembers, VPTeamPage, VPTeamPageSection, VPTeamPageTitle,
} from 'vitepress/theme';
import { distinctArray } from 'smob';
import {
    computed, defineComponent, ref,
} from 'vue';
import { ABI_TEAM_MEMBERS } from './groups/abi';
import { TeamGroup } from './constants';
import KTeamSwitch from './KTeamSwitch.vue';
import { TBI_TEAM_MEMBERS } from './groups/tbi';

export default defineComponent({
    components: {
        KTeamSwitch,
        VPTeamPage,
        VPTeamPageTitle,
        VPTeamMembers,
        VPTeamPageSection,
    },
    setup() {
        const group = ref(TeamGroup.ALL);
        const handlePicked = (value: TeamGroup) => {
            group.value = value;
        };

        const items = computed(() => {
            if (group.value === TeamGroup.ABI) {
                return ABI_TEAM_MEMBERS;
            }

            if (group.value === TeamGroup.TBI) {
                return TBI_TEAM_MEMBERS;
            }

            return distinctArray([
                ...ABI_TEAM_MEMBERS,
                ...TBI_TEAM_MEMBERS,
            ]);
        });

        return {
            group,
            handlePicked,

            items,
        };
    },
});
</script>
<template>
    <div class="container mb-3">
        <VPTeamPageTitle>
            <template #title>
                Team
            </template>
        </VPTeamPageTitle>
        <div class="mt-3 m-auto">
            <KTeamSwitch
                :group="group"
                @picked="handlePicked"
            />
        </div>
        <VPTeamPage>
            <VPTeamPageSection>
                <template #members>
                    <VPTeamMembers
                        size="small"
                        :members="items"
                    />
                </template>
            </VPTeamPageSection>
        </VPTeamPage>
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
