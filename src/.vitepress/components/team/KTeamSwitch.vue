<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import { TeamGroup } from './constants';

export default defineComponent({
    props: {
        group: {
            type: String as PropType<`${TeamGroup}`>,
            required: true,
            default: `${TeamGroup.ALL}`,
        },
    },
    emits: ['picked'],
    setup(props, { emit }) {
        const items = [
            { id: TeamGroup.ALL, value: 'All' },
            { id: TeamGroup.ABI, value: 'ABI' },
            { id: TeamGroup.TBI, value: 'TBI' },
        ];

        const pick = (value: TeamGroup) => {
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
