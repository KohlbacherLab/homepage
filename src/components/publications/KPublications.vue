<script lang="ts">
import { parse } from '@retorquere/bibtex-parser';
import { defineComponent } from 'vue';
import { data } from './bib.data';
import KPublication from './KPublication.vue';

export default defineComponent({
    components: { KPublication },
    setup() {
        const { entries, errors } = parse(data);
        return {
            errors,
            entries,
        };
    },
});
</script>
<template>
    <div class="container mb-3 mt-3 vp-doc">
        <h1>Publications</h1>
        <template v-if="errors">
            <h2>Errors</h2>
            <div class="mt-1 mb-1">
                <template
                    v-for="(error, key) in errors"
                    :key="key"
                >
                    <div class="alert alert-warning alert-sm">
                        {{ error.error.split(':').shift() }} could not be parsed
                    </div>
                </template>
            </div>
        </template>
        <h2>Overview</h2>
        <div class="d-flex flex-column">
            <template
                v-for="(entity, key) in entries"
                :key="key"
            >
                <KPublication
                    class="mb-3"
                    :entity="entity"
                />
            </template>
        </div>
    </div>
</template>
