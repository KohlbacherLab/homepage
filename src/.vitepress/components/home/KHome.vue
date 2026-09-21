<!--
  - Copyright (c) 2026.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->
<script lang="ts">
import { defineComponent } from 'vue';
import KHomeGroups from './KHomeGroups.vue';
import KHomeHero from './KHomeHero.vue';
import KHomeResearch from './KHomeResearch.vue';

export default defineComponent({
    components: {
        KHomeGroups,
        KHomeHero,
        KHomeResearch,
    },
});
</script>
<template>
    <div class="vp-raw">
        <KHomeHero />
        <KHomeGroups />
        <KHomeResearch />
    </div>
</template>
