<script lang="ts">
import { VCPagination } from '@vuecs/pagination';
import { parse } from '@retorquere/bibtex-parser';
import { computed, defineComponent, ref } from 'vue';
import { VPTeamPageTitle } from 'vitepress/theme';
import { data } from './bib.data';
import KPublication from './KPublication.vue';

export default defineComponent({
    components: {
        VPTeamPageTitle,
        KPublication,
        VCPagination,
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

        const load = (pagination) => {
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
    <div class="container mb-3 mt-3 vp-doc">
        <h1 class="mb-3">
            <VPTeamPageTitle>
                <template #title>
                    <i class="fa-solid fa-book" /> Publications
                </template>
            </VPTeamPageTitle>
        </h1>
        <div class="d-flex flex-column">
            <template
                v-for="(entity, key) in items"
                :key="key"
            >
                <KPublication
                    class="mb-3"
                    :entity="entity"
                />
            </template>
        </div>
        <div class="d-flex">
            <div class="ms-auto me-auto">
                <VCPagination
                    :total="total"
                    :offset="offset"
                    :limit="limit"
                    @load="load"
                />
            </div>
        </div>
        <template v-if="errors">
            <h2>Errors</h2>
            <div class="mt-1 mb-1">
                <template
                    v-for="(error, key) in errors"
                    :key="key"
                >
                    <div class="alert alert-warning alert-sm">
                        {{ error.error.split(':').shift() }} could not be read.
                        <div class="d-flex flex-column">
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
</template>
