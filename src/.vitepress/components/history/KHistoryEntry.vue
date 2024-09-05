<!--
  - Copyright (c) 2024.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->
<script lang="ts">
import {computed, defineComponent, PropType} from "vue";
import {HistoryEntry} from "../../domains";

export default defineComponent({
    props: {
        item: {
            type: Object as PropType<HistoryEntry>,
            required: true,
        }
    },
    setup(props) {
        const startYear = computed(() => {
            if(typeof props.item.year === 'number') {
                return props.item.year;
            }

            return props.item.year[0];
        });

        const endYear = computed(() => {
            if(typeof props.item.year === 'number') {
                return undefined
            }

            return props.item.year[1];
        });

        return {
            startYear,
            endYear
        }
    }
})
</script>
<template>
    <div class="d-flex flex-row gap-2">
        <div>
            <strong>
                {{ startYear }} <template v-if="endYear">- {{ endYear }}</template>
            </strong>
        </div>
        <div>
            {{ item.value }}
        </div>
    </div>
</template>
