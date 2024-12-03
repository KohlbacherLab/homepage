<!--
  - Copyright (c) 2024-2024.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, ref } from 'vue';
import type { SwitchElement } from './types';

export default defineComponent({
    props: {
        items: {
            type: Array as PropType<SwitchElement[]>,
            required: true,
        },
        current: {
            type: String,
        },
    },
    emits: ['picked'],
    setup(props, { emit }) {
        const id = ref<string | null>(null);

        if (props.current) {
            id.value = props.current;
        }

        const pick = (value: string) => {
            id.value = value;
            emit('picked', value);
        };

        return {
            id,
            pick,
        };
    },
});
</script>
<template>
    <div class="d-flex flex-column gap-2">
        <div class="d-flex flex-row gap-2">
            <div
                v-for="(item, key) in items"
                :key="key"
                class="entity-card w-100 ratio-1x1 text-center"
                :class="{'active': id === item.id}"
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
        <div v-if="id">
            <slot :name="id" />
        </div>
    </div>
</template>
