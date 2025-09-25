<!--
  - Copyright (c) 2024.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script lang="ts">
import type { Entry } from '@retorquere/bibtex-parser';
import type { PropType } from 'vue';
import { computed, defineComponent, toRef } from 'vue';
import KPublicationTitle from './KPublicationTitle.vue';

export default defineComponent({
    components: { KPublicationTitle },
    props: {
        entity: {
            type: Object as PropType<Entry>,
            required: true,
        },
    },
    setup(props) {
        const entity = toRef(props, 'entity');

        const publication = computed(() => {
            const parts : string[] = [];
            if (entity.value.fields.journal) {
                parts.push(entity.value.fields.journal);
            }

            if (entity.value.fields.volume) {
                let text = entity.value.fields.volume;
                if (entity.value.fields.number) {
                    text += ` (${entity.value.fields.number})`;
                }

                parts.push(text);
            }

            if (entity.value.fields.pages) {
                parts.push(`pp. ${entity.value.fields.pages}`);
            }

            if (entity.value.fields.year) {
                return `(${entity.value.fields.year}). ${parts.join(', ')}`;
            }

            return parts.join(', ');
        });

        const authors = computed(() => {
            const names = entity.value.fields.author.map((author) => {
                if (author.lastName && author.lastName !== 'others') {
                    if (author.firstName && author.firstName.length > 0) {
                        return `${author.lastName}, ${author.firstName.at(0)}.`;
                    }

                    return author.lastName;
                }

                return undefined; // Make linter hapy.
            }).filter((name) => name !== undefined);

            const suffix = names.pop();
            const prefix = names.join(', ');

            if (suffix) {
                return `${prefix} & ${suffix}`;
            }

            return prefix;
        });

        return {
            publication,
            authors,
        };
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
                <div class="d-flex flex-row flex-wrap gap-1">
                    {{ authors }}
                    {{ publication }}
                </div>
            </div>
            <details
                v-if="entity.fields.abstract"
                class="details custom-block"
            >
                <summary class="custom-block-title">
                    Abstract
                </summary>
                <p class="mt-0 abstract">
                    {{ entity.fields.abstract }}
                </p>
            </details>
        </div>
    </div>
</template>
