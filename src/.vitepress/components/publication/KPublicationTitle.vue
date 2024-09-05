<!--
  - Copyright (c) 2024.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script lang="ts">
import { VCLink } from '@vuecs/link';
import {
    type PropType, computed, defineComponent,
} from 'vue';
import type { Entry } from '@retorquere/bibtex-parser';

export default defineComponent({
    components: {
        VCLink,
    },
    props: {
        entity: {
            type: Object as PropType<Entry>,
            required: true,
        },
    },
    setup(props) {
        const pmID = computed(() => {
            const match = props.entity.key.match(/pmid(\d+)/);
            if (match && match[1]) {
                return match[1];
            }

            return null;
        });

        return {
            pmID,
        };
    },
});
</script>
<template>
    <h5 class="text-dark">
        <i class="fa-solid fa-book me-2" />
        <template v-if="pmID">
            <VCLink
                :href="'https://pubmed.ncbi.nlm.nih.gov/'+ pmID"
                target="_blank"
            >
                {{ entity.fields.title }}
            </VCLink>
        </template>
        <template v-else>
            {{ entity.fields.title }}
        </template>
    </h5>
</template>
