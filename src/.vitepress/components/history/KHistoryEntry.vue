<!--
  - Copyright (c) 2024.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->
<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent } from 'vue';
import type { HistoryEntry } from '../../domains';

export default defineComponent({
    props: {
        item: {
            type: Object as PropType<HistoryEntry>,
            required: true,
        },
    },
    setup(props) {
        const startYear = computed(() => {
            if (typeof props.item.year === 'number') {
                return props.item.year;
            }

            return props.item.year[0];
        });

        const endYear = computed(() => {
            if (typeof props.item.year === 'number') {
                return undefined;
            }

            return props.item.year[1];
        });

        return {
            startYear,
            endYear,
        };
    },
});
</script>
<template>
    <div class="d-flex flex-row gap-2 history-entry">
        <div class="history-entry-year">
            <strong>
                {{ startYear }} <template v-if="endYear">- {{ endYear }}</template>
            </strong>
        </div>
        <div class="history-entry-text">
            {{ item.value }}
        </div>
    </div>
</template>
<style scoped>
.history-entry-year {
    min-width: 100px;
}
</style>
