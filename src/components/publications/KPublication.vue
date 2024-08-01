<script lang="ts">
import type { Entry } from '@retorquere/bibtex-parser';
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import KPublicationInfoText from './KPublicationInfoText.vue';

export default defineComponent({
    components: { KPublicationInfoText },
    props: {
        entity: {
            type: Object as PropType<Entry>,
            required: true,
        },
    },
});
</script>
<template>
    <div class="entity-card">
        <div class="d-flex flex-row algin-items-center">
            <div>
                <h5 class="text-dark">
                    <i class="fa fa-bar-chart" /> {{ entity.fields.title }}
                </h5>
            </div>
        </div>
        <hr>
        <div class="d-flex flex-column gap-2">
            <div>
                <h6>Author(s)</h6>

                <div class="d-flex flex-row flex-wrap gap-1">
                    <template v-for="(author, authorIndex) in entity.fields.author">
                        <div>
                            {{ author.firstName }}.
                            {{ author.lastName }}
                            <template v-if="authorIndex < entity.fields.author.length">
                                -
                            </template>
                        </div>
                    </template>
                </div>
            </div>
            <div v-if="entity.fields.abstract">
                <h6>Abstract</h6>
                <p class="mt-0">
                    {{ entity.fields.abstract }}
                </p>
            </div>
            <div class="d-flex flex-row">
                <div class="me-1">
                    <h6>Meta</h6>
                </div>
                <div>
                    <KPublicationInfoText :entity="entity" />
                </div>
            </div>
            <!--
            <div class="highlight">
                <code>
                    {{ entity.input }}
                </code>
            </div>
            -->
        </div>
    </div>
</template>
