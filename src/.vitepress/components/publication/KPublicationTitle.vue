<!--
  - Copyright (c) 2024.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script lang="ts">
import { VCLink } from '@vuecs/link';
import {
    type PropType,
    computed,
    defineComponent,
} from 'vue';
import type { Entry } from '@retorquere/bibtex-parser';
import { getPublicationLink } from '../../domains/publication/link.ts';

export default defineComponent({
    components: { VCLink },
    props: {
        entity: {
            type: Object as PropType<Entry>,
            required: true,
        },
    },
    setup(props) {
        const link = computed(() => getPublicationLink(props.entity));

        return { link };
    },
});
</script>
<template>
    <h5>
        <i class="fa-solid fa-book me-2" />
        <VCLink
            v-if="link"
            :href="link"
            target="_blank"
        >
            {{ entity.fields.title }}
        </VCLink>
        <template v-else>
            {{ entity.fields.title }}
        </template>
    </h5>
</template>
