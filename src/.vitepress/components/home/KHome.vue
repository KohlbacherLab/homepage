<!--
  - Copyright (c) 2026.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->
<script lang="ts">
import { defineComponent } from 'vue';
import KHomeContact from './KHomeContact.vue';
import KHomeGroups from './KHomeGroups.vue';
import KHomeHero from './KHomeHero.vue';
import KHomeProjects from './KHomeProjects.vue';
import KHomePublications from './KHomePublications.vue';
import KHomeResearch from './KHomeResearch.vue';
import KHomeTeam from './KHomeTeam.vue';

export default defineComponent({
    components: {
        KHomeContact,
        KHomeGroups,
        KHomeHero,
        KHomeProjects,
        KHomePublications,
        KHomeResearch,
        KHomeTeam,
    },
});
</script>
<template>
    <div class="vp-raw">
        <KHomeHero />
        <KHomeGroups />
        <KHomeResearch />
        <KHomeProjects />
        <KHomePublications />
        <KHomeTeam />
        <KHomeContact />
    </div>
</template>
