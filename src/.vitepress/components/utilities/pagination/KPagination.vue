<!--
  - Copyright (c) 2026.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script lang="ts">
import type { PaginationMeta } from '@vuecs/pagination';
import { VCPagination } from '@vuecs/pagination';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { VCPagination },
    props: {
        total: {
            type: Number,
            required: true,
        },
        offset: {
            type: Number,
            required: true,
        },
        limit: {
            type: Number,
            required: true,
        },
    },
    emits: ['load'],
    setup(_props, { emit }) {
        const load = (meta: PaginationMeta) => {
            emit('load', meta);
        };

        return { load };
    },
});
</script>
<template>
    <VCPagination
        :total="total"
        :offset="offset"
        :limit="limit"
        @load="load"
    >
        <template #first>
            <i class="fa-solid fa-angles-left" />
        </template>
        <template #prev>
            <i class="fa-solid fa-chevron-left" />
        </template>
        <template #next>
            <i class="fa-solid fa-chevron-right" />
        </template>
        <template #last>
            <i class="fa-solid fa-angles-right" />
        </template>
    </VCPagination>
</template>
