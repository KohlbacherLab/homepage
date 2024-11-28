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

export default defineComponent({
    props: {
        entity: {
            type: Object as PropType<Entry>,
            required: true,
        },
    },
    setup(props) {
        const entity = toRef(props, 'entity');

        const data = computed(() => {
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
                parts.push(entity.value.fields.year);
            }

            return parts.join(', ');
        });

        return {
            data,
        };
    },
});
</script>
<template>
    <span>
        {{ data }}
    </span>
</template>
