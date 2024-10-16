<!--
  - Copyright (c) 2024-2024.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script lang="ts">
import {computed, defineComponent} from "vue";
import {Person} from '../../domains';
import { KHistoryEntries } from "../history";

import { data } from '../team/team.data';
import KPersonContact from "./KPersonContact.vue";

export default defineComponent({
    components: {KPersonContact, KHistoryEntries },
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

        return {
            entity
        }
    }
})
</script>
<template>
    <div class="d-flex flex-column gap-2 profile-page">
        <div class="d-flex flex-row gap-3">
            <div>
                <img class="avatar" :src="entity.avatar" :alt="entity.name" />
            </div>
            <div>
                <h1>{{ entity.name }}</h1>

                <strong>{{ entity.role }}</strong>

                <KPersonContact :entity="entity" />
            </div>
        </div>


        <div v-if="entity.interests">
            <h3><i class="fa fa-lightbulb"></i> Interests</h3>

            <ul class="list-unstyled person-item-list">
                <li v-for="(item, key) in entity.interests">
                    {{ item }}
                </li>
            </ul>
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
.profile-page .avatar {
    border-radius: 50%;
    object-fit: cover;
    height: 10em;
    width: 10em;
}

.profile-page h3 {
    margin-bottom: 0.5rem;
    color: var(--vp-c-indigo-3);
}
</style>
