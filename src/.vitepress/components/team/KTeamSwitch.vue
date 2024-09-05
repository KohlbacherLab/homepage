<!--
  - Copyright (c) 2024.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import { TeamID } from '../../domains/team/constants';

export default defineComponent({
    props: {
        group: {
            type: String as PropType<`${TeamID}`>,
            required: true,
            default: `${TeamID.ALL}`,
        },
    },
    emits: ['picked'],
    setup(props, { emit }) {
        const items = [
            { id: TeamID.ALL, value: 'All' },
            { id: TeamID.ABI, value: 'ABI' },
            { id: TeamID.TBI, value: 'TBI' },
        ];

        const pick = (value: TeamID) => {
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
    <div class="d-flex flex-row gap-2">
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
