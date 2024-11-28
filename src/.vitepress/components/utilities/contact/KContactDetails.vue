<!--
  - Copyright (c) 2024-2024.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->
<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent } from 'vue';
import type { ContactDetails } from './types';

export default defineComponent({
    props: {
        entity: {
            type: Object as PropType<ContactDetails>,
            required: true,
        },
    },
    setup(props) {
        const addresses = computed(() => {
            if (!props.entity.address) {
                return [];
            }

            if (typeof props.entity.address === 'string') {
                return [props.entity.address];
            }

            return props.entity.address;
        });

        return {
            addresses,
        };
    },
});
</script>
<template>
    <div class="d-flex flex-column">
        <div v-if="entity.email">
            <i class="fa fa-envelope pe-1" /> {{ entity.email }}
        </div>
        <div v-if="entity.phone">
            <i class="fa fa-phone pe-1" /> {{ entity.phone }}
        </div>
        <div v-if="entity.fax">
            <i class="fa fa-fax pe-1" /> {{ entity.fax }}
        </div>
        <div v-if="addresses && addresses.length > 0">
            <div class="d-flex flex-row gap-1">
                <div>
                    <i class="fa fa-map-marker-alt pe-2" />
                </div>
                <div>
                    <template
                        v-for="(item, index) in addresses"
                        :key="index"
                    >
                        {{ item }}<br>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
