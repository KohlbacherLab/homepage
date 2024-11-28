<!--
  - Copyright (c) 2024.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent } from 'vue';
import type { Person } from '../../domains';
import VPTeamMembersItem from './KTeamMembersItem.vue';

export default defineComponent({
    components: {
        VPTeamMembersItem,
    },
    props: {
        size: {
            type: String as PropType<'small' | 'medium'>,
            default: 'medium',
        },
        members: {
            type: Array as PropType<[string, Person][]>,
            required: true,
        },
    },
    setup(props) {
        const classes = computed(() => [props.size, `count-${props.members.length}`]);

        return {
            classes,
        };
    },
});

</script>

<template>
    <div
        class="VPTeamMembers"
        :class="classes"
    >
        <div class="TeamMembersContainer">
            <div
                v-for="[slug, member] in members"
                :key="member.name"
                class="item"
            >
                <VPTeamMembersItem
                    :size="size"
                    :member="member"
                    :slug="slug"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.VPTeamMembers.small .TeamMembersContainer {
    grid-template-columns: repeat(auto-fit, minmax(224px, 1fr));
}

.VPTeamMembers.small.count-1 .TeamMembersContainer {
    max-width: 276px;
}
.VPTeamMembers.small.count-2 .TeamMembersContainer {
    max-width: calc(276px * 2 + 24px);
}
.VPTeamMembers.small.count-3 .TeamMembersContainer {
    max-width: calc(276px * 3 + 24px * 2);
}

.VPTeamMembers.medium .TeamMembersContainer {
    grid-template-columns: repeat(auto-fit, minmax(256px, 1fr));
}

@media (min-width: 375px) {
    .VPTeamMembers.medium .TeamMembersContainer {
        grid-template-columns: repeat(auto-fit, minmax(288px, 1fr));
    }
}

.VPTeamMembers.medium.count-1 .TeamMembersContainer {
    max-width: 368px;
}
.VPTeamMembers.medium.count-2 .TeamMembersContainer {
    max-width: calc(368px * 2 + 24px);
}

.TeamMembersContainer {
    display: grid;
    gap: 24px;
    margin: 0 auto;
}
</style>
