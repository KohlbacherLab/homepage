<!--
  - Copyright (c) 2026.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        icon: {
            type: String,
            required: true,
        },
    },
});
</script>
<template>
    <div class="px-8 py-12 text-center md:px-12 md:pt-16 md:pb-12 lg:px-16 lg:pt-20">
        <h1 class="text-4xl/[44px] font-medium md:text-5xl/[56px] md:tracking-[-0.5px]">
            <i :class="icon" /> <slot />
        </h1>
    </div>
</template>
