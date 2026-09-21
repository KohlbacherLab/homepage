<!--
  - Copyright (c) 2026.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->
<script lang="ts">
import { VPLink } from 'vitepress/theme';
import { defineComponent } from 'vue';
import { LAB_ADDRESS, LAB_CONTACT } from '../../domains/contact/constants.ts';

export default defineComponent({
    components: { VPLink },
    setup() {
        return {
            address: LAB_ADDRESS,
            contact: LAB_CONTACT,
            phoneHref: `tel:${LAB_CONTACT.phone.replace(/\s+/g, '')}`,
        };
    },
});
</script>
<template>
    <section class="k-section k-section-alt">
        <div class="k-wrap">
            <div class="k-card grid overflow-hidden md:grid-cols-[1fr_1.1fr]">
                <div class="p-6 md:p-10">
                    <p class="k-eyebrow">
                        Visit us
                    </p>
                    <h2 class="k-heading md:text-3xl">
                        {{ address.building }}
                    </h2>
                    <address class="my-5 text-[15px] leading-7 text-fg not-italic">
                        <span class="block">{{ address.institution }}</span>
                        <span class="block">{{ address.street }}</span>
                        <span class="block">{{ address.city }}</span>
                        <a
                            class="k-link font-normal"
                            :href="phoneHref"
                        >{{ contact.phone }}</a>
                        ·
                        <a
                            class="k-link font-normal break-all"
                            :href="`mailto:${contact.email}`"
                        >{{ contact.email }}</a>
                    </address>
                    <VPLink
                        href="/contact"
                        class="inline-block rounded-[10px] bg-fg px-4 py-2.5 text-sm font-semibold text-bg"
                    >
                        How to find us →
                    </VPLink>
                </div>
                <img
                    class="h-64 w-full object-cover md:h-full md:min-h-80"
                    src="/images/contact/mvl6.jpg"
                    alt="The Tübingen AI Research Building at Maria-von-Linden-Straße 6"
                >
            </div>
        </div>
    </section>
</template>
