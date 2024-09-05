<!--
  - Copyright (c) 2024-2024.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script lang="ts">
import {computed, defineComponent} from "vue";
import {Person} from '../../domains';
import {KHistoryEntries} from "../history";

import { data } from '../team/team.data';

export default defineComponent({
    components: {KHistoryEntries},
    props: {
        slug: {
            type: String,
        }
    },
    setup(props) {
        const persons : [string, Person][] = data;
        const entity = computed<Person>(() => {
            const index = persons.findIndex((member) => member[0] === props.slug);
            return persons[index][1];
        });

        const teams = computed(() => {
            const items = Array.isArray(entity.value.team) ?
                entity.value.team :
                [entity.value.team];
        })

        return {
            entity,
            teams
        }
    }
})
</script>
<template>
    <div class="d-flex flex-column gap-2">
        <div class="d-flex flex-row gap-3">
            <div>
                <img class="avatar" :src="entity.avatar" :alt="entity.name" />
            </div>
            <div>
                <h1>{{ entity.name }}</h1>

                <strong>{{ entity.title }}</strong>
            </div>
        </div>
        <div v-if="entity.education">
            <h3><i class="fas fa-graduation-cap"></i> Education</h3>
            <KHistoryEntries :items="entity.education" />
        </div>
        <div v-if="entity.biography">
            <h3><i class="fas fa-book"></i> Biography</h3>
            <KHistoryEntries :items="entity.biography" />
        </div>
        <div v-if="entity.awards">
            <h3><i class="fas fa-trophy"></i> Awards</h3>
            <KHistoryEntries :items="entity.awards" />
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
