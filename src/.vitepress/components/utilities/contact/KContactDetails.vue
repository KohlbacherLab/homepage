<!--
  - Copyright (c) 2024-2024.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->
<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent } from 'vue';
import type { ContactDetails } from './types.ts';

function toArray(value?: string | string[]): string[] {
    if (!value) {
        return [];
    }
    return typeof value === 'string' ? [value] : value;
}

export default defineComponent({
    props: {
        entity: {
            type: Object as PropType<ContactDetails>,
            required: true,
        },
    },
    setup(props) {
        const phones = computed(() => toArray(props.entity.phone));
        const faxes = computed(() => toArray(props.entity.fax));
        const addresses = computed(() => toArray(props.entity.address));

        return {
            phones,
            faxes,
            addresses,
        };
    },
});
</script>
<template>
    <div class="d-flex flex-column contact-details gap-2">
        <div v-if="entity.email">
            <i class="fa fa-envelope pe-1" /> {{ entity.email }}
        </div>
        <div v-if="phones.length === 1">
            <i class="fa fa-phone pe-1" /> {{ phones[0] }}
        </div>
        <div
            v-else-if="phones.length > 1"
            class="d-flex flex-row gap-1"
        >
            <div>
                <i class="fa fa-phone pe-2" />
            </div>
            <ul class="contact-details-list">
                <li
                    v-for="(item, index) in phones"
                    :key="index"
                >
                    {{ item }}
                </li>
            </ul>
        </div>
        <div v-if="faxes.length === 1">
            <i class="fa fa-fax pe-1" /> {{ faxes[0] }}
        </div>
        <div
            v-else-if="faxes.length > 1"
            class="d-flex flex-row gap-1"
        >
            <div>
                <i class="fa fa-fax pe-2" />
            </div>
            <ul class="contact-details-list">
                <li
                    v-for="(item, index) in faxes"
                    :key="index"
                >
                    {{ item }}
                </li>
            </ul>
        </div>
        <div v-if="addresses.length === 1">
            <i class="fa fa-map-marker-alt pe-1" /> {{ addresses[0] }}
        </div>
        <div
            v-else-if="addresses.length > 1"
            class="d-flex flex-row gap-1"
        >
            <div>
                <i class="fa fa-map-marker-alt pe-2" />
            </div>
            <ul class="contact-details-list">
                <li
                    v-for="(item, index) in addresses"
                    :key="index"
                >
                    {{ item }}
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
.contact-details-list {
    list-style: disc;
    padding-left: 1.25rem;
    margin: 0;
}

.contact-details-list li {
    margin: 0;
    line-height: 1.4;
}
</style>
