<!--
  - Copyright (c) 2024.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import { TeamFilter } from '../../domains/team/constants.ts';

export default defineComponent({
    props: {
        group: {
            type: String as PropType<`${TeamFilter}`>,
            required: true,
            default: `${TeamFilter.ACTIVE}`,
        },
    },
    emits: ['picked'],
    setup(_props, { emit }) {
        const items = [
            { id: TeamFilter.ACTIVE, value: 'Active' },
            { id: TeamFilter.INACTIVE, value: 'Inactive' },
        ];

        const pick = (value: TeamFilter) => {
            emit('picked', value);
        };

        return {
            items,
            pick,
        };
    },
});
</script>
<template>
    <div class="d-flex flex-row gap-2 w-100">
        <div
            v-for="(item, key) in items"
            :key="key"
            class="entity-card w-100 ratio-1x1 text-center"
            :class="{'active': group === item.id}"
        >
            <h3 class="mb-0">
                <a
                    href=""
                    class="stretched-link"
                    @click.prevent="pick(item.id)"
                >{{ item.value }}</a>
            </h3>
        </div>
    </div>
</template>
