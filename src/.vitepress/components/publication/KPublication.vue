<!--
  - Copyright (c) 2024.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script lang="ts">
import type { Entry } from '@retorquere/bibtex-parser';
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import KPublicationInfoText from './KPublicationInfoText.vue';
import KPublicationTitle from './KPublicationTitle.vue';

export default defineComponent({
    components: { KPublicationTitle, KPublicationInfoText },
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
                <KPublicationTitle :entity="entity" />
            </div>
        </div>
        <hr>
        <div class="d-flex flex-column gap-2">
            <div>
                <h6>Author(s)</h6>

                <div class="d-flex flex-row flex-wrap gap-1">
                    <template
                        v-for="(author, authorIndex) in entity.fields.author"
                        :key="authorIndex"
                    >
                        <div>
                            {{ author.firstName }}.
                            {{ author.lastName }}
                            <template v-if="authorIndex < (entity.fields?.author?.length ?? 0)">
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
