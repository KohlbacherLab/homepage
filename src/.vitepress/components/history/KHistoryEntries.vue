<!--
  - Copyright (c) 2024.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->
<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import type { HistoryEntry } from '../../domains';
import KHistoryEntry from './KHistoryEntry.vue';

export default defineComponent({
    components: { KHistoryEntry },
    props: {
        items: {
            type: Array as PropType<HistoryEntry[]>,
            required: true,
        },
    },
});
</script>
<template>
    <div>
        <template
            v-for="(entity, key) in items"
            :key="key"
        >
            <KHistoryEntry :item="entity" />
        </template>
    </div>
</template>
