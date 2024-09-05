<!--
  - Copyright (c) 2024.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script lang="ts">
import {computed, defineComponent} from "vue";
import {TeamMember} from "../../domains/team";
import {KHistoryEntries} from "../history";

import { data } from './team.data';

export default defineComponent({
    components: {KHistoryEntries},
    props: {
        slug: {
            type: String,
        }
    },
    setup(props) {
        const members : [string, TeamMember][] = data;
        const member = computed<TeamMember>(() => {
            const index = members.findIndex((member) => member[0] === props.slug);
            return members[index][1];
        });

        const teams = computed(() => {
            const items = Array.isArray(member.value.team) ?
                member.value.team :
                [member.value.team];
        })

        return {
            member,
            teams
        }
    }
})
</script>
<template>
    <div class="d-flex flex-column gap-2">
        <div class="d-flex flex-row gap-3">
            <div>
                <img class="avatar" :src="member.avatar" :alt="member.name" />
            </div>
            <div>
                <h1>{{ member.name }}</h1>

                <strong>{{ member.title }}</strong>
            </div>
        </div>
        <div v-if="member.education">
            <h3><i class="fas fa-graduation-cap"></i> Education</h3>
            <KHistoryEntries :items="member.education" />
        </div>
        <div v-if="member.biography">
            <h3><i class="fas fa-book"></i> Biography</h3>
            <KHistoryEntries :items="member.biography" />
        </div>
        <div v-if="member.awards">
            <h3><i class="fas fa-trophy"></i> Awards</h3>
            <KHistoryEntries :items="member.awards" />
        </div>
    </div>
</template>
<style scoped>
h3 {
    margin: 1rem 0 0;
}

.avatar {
    border-radius: 50%;
    object-fit: cover;
    height: 6em;
    width: 6em;
}
</style>
