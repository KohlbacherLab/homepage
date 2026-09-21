<!--
  - Copyright (c) 2026.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->
<script lang="ts">
import DefaultTheme from 'vitepress/theme';
import { defineComponent } from 'vue';
import KFooter from '../components/layout/KFooter.vue';

export default defineComponent({
    components: {
        DefaultLayout: DefaultTheme.Layout,
        KFooter,
    },
});
</script>
<template>
    <DefaultLayout>
        <template #layout-bottom>
            <KFooter />
        </template>
    </DefaultLayout>
</template>
