<script lang="ts">
import {computed, defineComponent} from "vue";
import {TeamMember} from "../../domains/team";

import { data } from './team.data';

export default defineComponent({
    props: {
        slug: {
            type: String,
        }
    },
    setup(props) {
        const members : [string, TeamMember][] = data;
        const member = computed(() => {
            const index = members.findIndex((member) => member[0] === props.slug);
            return members[index][1];
        })

        return {
            member
        }
    }
})
</script>
<template>
    <h1>{{ member.name }}</h1>
</template>
