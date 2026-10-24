<!--
  - Copyright (c) 2024.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script lang="ts">
import type { Entry } from '@retorquere/bibtex-parser';
import type { PropType } from 'vue';
import { computed, defineComponent, toRef } from 'vue';
import { formatAuthors, formatSource } from '../../domains/publication/format.ts';
import KPublicationTitle from './KPublicationTitle.vue';

export default defineComponent({
    components: { KPublicationTitle },
    props: {
        entity: {
            type: Object as PropType<Entry>,
            required: true,
        },
    },
    setup(props) {
        const entity = toRef(props, 'entity');

        const publication = computed(() => formatSource(entity.value));
        const authors = computed(() => formatAuthors(entity.value));

        return {
            publication,
            authors,
        };
    },
});
</script>
<template>
    <div class="entity-card">
        <div class="flex flex-row items-center">
            <div>
                <KPublicationTitle :entity="entity" />
            </div>
        </div>
        <hr class="my-4 border-border">
        <div class="flex flex-col gap-2">
            <div>
                <div class="flex flex-row flex-wrap gap-1">
                    {{ authors }}
                    {{ publication }}
                </div>
            </div>
            <details
                v-if="entity.fields.abstract"
                class="details custom-block"
            >
                <summary class="custom-block-title">
                    Abstract
                </summary>
                <div class="mb-2 text-[0.9em]">
                    {{ entity.fields.abstract }}
                </div>
            </details>
        </div>
    </div>
</template>
