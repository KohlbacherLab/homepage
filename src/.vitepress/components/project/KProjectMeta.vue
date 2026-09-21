<!--
  - Copyright (c) 2026.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script lang="ts">
import { useData } from 'vitepress';
import { computed, defineComponent } from 'vue';
import { buildProject } from '../../domains/project/build.ts';
import { formatFunding, formatRuntime } from '../../domains/project/format.ts';

export default defineComponent({
    setup() {
        const { frontmatter, page } = useData();

        const project = computed(() => buildProject(page.value.relativePath, frontmatter.value));
        const funding = computed(() => formatFunding(project.value.funding));
        const runtime = computed(() => formatRuntime(project.value.runtime));

        return {
            funding,
            runtime,
        };
    },
});
</script>
<template>
    <p>
        <strong>Funding:</strong> {{ funding }}<br>
        <strong>Project runtime:</strong> {{ runtime }}
    </p>
</template>
