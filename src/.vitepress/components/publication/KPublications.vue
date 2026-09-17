<!--
  - Copyright (c) 2024.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script lang="ts">
import { parse } from '@retorquere/bibtex-parser';
import { computed, defineComponent, ref } from 'vue';
import { data } from '../../data/bib.data';
import KPageTitle from '../utilities/page-title/KPageTitle.vue';
import KPagination from '../utilities/pagination/KPagination.vue';
import KPublication from './KPublication.vue';

export default defineComponent({
    components: {
        KPageTitle,
        KPagination,
        KPublication,
    },
    setup() {
        const { entries, errors } = parse(data);

        const offset = ref(0);
        const limit = ref(10);
        const total = computed(() => entries.length);

        const items = computed(() => {
            let startIndex : number;
            if (offset.value > 0) {
                startIndex = offset.value - 1;
            } else {
                startIndex = offset.value;
            }

            const endIndex : number = startIndex + limit.value;

            return entries.slice(startIndex, endIndex);
        });

        const load = (pagination: { limit: number, offset: number }) => {
            limit.value = pagination.limit;
            offset.value = pagination.offset;
        };

        return {
            errors,
            items,
            total,
            limit,
            offset,
            load,
        };
    },
});
</script>
<template>
    <div class="vp-raw mx-auto w-full max-w-[1320px] px-3">
        <KPageTitle icon="fas fa-book">
            Publications
        </KPageTitle>
        <div class="flex flex-col gap-2">
            <div class="flex">
                <div class="ms-auto">
                    <KPagination
                        :total="total"
                        :offset="offset"
                        :limit="limit"
                        @load="load"
                    />
                </div>
            </div>
            <div class="flex flex-col gap-4">
                <template
                    v-for="(entity, key) in items"
                    :key="key"
                >
                    <KPublication
                        :entity="entity"
                    />
                </template>
            </div>
            <div class="flex">
                <div class="ms-auto">
                    <KPagination
                        :total="total"
                        :offset="offset"
                        :limit="limit"
                        @load="load"
                    />
                </div>
            </div>
            <template v-if="errors && errors.length > 0">
                <h2>Errors</h2>
                <div class="my-1">
                    <template
                        v-for="(error, key) in errors"
                        :key="key"
                    >
                        <div
                            class="mb-4 rounded-md border border-warning-300 bg-warning-50 p-4 text-warning-900
                                dark:border-warning-800 dark:bg-warning-950 dark:text-warning-200"
                        >
                            {{ error.error.split(':').shift() }} could not be read.
                            <div class="flex flex-col">
                                <div>
                                    <strong>Input</strong><br>
                                    {{ error.input }}
                                </div>
                                <div>
                                    <strong>Trace</strong><br>
                                    {{ error.error }}
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </template>
        </div>
    </div>
</template>
