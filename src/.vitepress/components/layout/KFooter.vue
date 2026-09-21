<!--
  - Copyright (c) 2026.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->
<script lang="ts">
import { VPLink } from 'vitepress/theme';
import { defineComponent } from 'vue';

type FooterLink = {
    text: string,
    link: string,

    /**
     * `VPLink` already adds `target="_blank"`/`rel` for these (external URL),
     * but the `↗` glyph (stripped inside `.vp-raw`, see `.k-footer` in
     * `style.css`) has to be added by hand.
     */
    external?: boolean
};

type FooterColumn = {
    title: string,
    links: FooterLink[]
};

export default defineComponent({
    components: { VPLink },
    setup() {
        const columns : FooterColumn[] = [
            {
                title: 'Lab',
                links: [
                    { text: 'Team', link: '/team' },
                    { text: 'Research', link: '/research' },
                    { text: 'Publications', link: '/publications' },
                    { text: 'Contact', link: '/contact' },
                ],
            },
            {
                title: 'Work',
                links: [
                    { text: 'Projects', link: '/projects' },
                    { text: 'Software', link: '/software' },
                    {
                        text: 'Teaching',
                        link: 'https://alma.uni-tuebingen.de/alma/pages/startFlow.xhtml?_flowId=searchCourseNonStaff-flow',
                        external: true,
                    },
                ],
            },
            {
                title: 'Links',
                links: [
                    {
                        text: 'University of Tübingen',
                        link: 'https://uni-tuebingen.de',
                        external: true,
                    },
                    {
                        text: 'University Hospital Tübingen',
                        link: 'https://www.medizin.uni-tuebingen.de',
                        external: true,
                    },
                    {
                        text: 'GitHub',
                        link: 'https://github.com/KohlbacherLab',
                        external: true,
                    },
                ],
            },
        ];

        return { columns };
    },
});
</script>
<template>
    <footer class="vp-raw k-footer bg-night text-night-fg-muted">
        <div class="k-wrap grid gap-8 py-14 md:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
            <div>
                <img
                    class="mb-4 h-7 w-auto"
                    src="/images/icon/logo_light.png"
                    alt="KohlbacherLab"
                >
                <p class="m-0 max-w-[36ch] text-sm leading-relaxed">
                    Applied and Translational Bioinformatics at the University of Tübingen and the
                    University Hospital Tübingen, led by Prof. Dr. Oliver Kohlbacher.
                </p>
            </div>
            <nav
                v-for="column in columns"
                :key="column.title"
                :aria-label="column.title"
            >
                <h2 class="m-0 mb-3 text-sm font-semibold text-night-fg">
                    {{ column.title }}
                </h2>
                <ul class="m-0 grid list-none gap-2 p-0 text-sm">
                    <li
                        v-for="link in column.links"
                        :key="link.text"
                    >
                        <VPLink
                            class="transition-colors hover:text-night-fg"
                            :href="link.link"
                        >
                            {{ link.text }}<span
                                v-if="link.external"
                                aria-hidden="true"
                            > ↗</span>
                        </VPLink>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="border-t border-night-border">
            <div class="k-wrap flex flex-wrap justify-between gap-2 py-4 text-xs">
                <span>© 2024–present KohlbacherLab</span>
                <span>
                    Website by
                    <a
                        class="text-night-fg hover:underline"
                        href="https://tada5hi.net"
                        target="_blank"
                        rel="noopener"
                    >Peter Placzek</a>
                    (<a
                        class="text-night-fg hover:underline"
                        href="https://github.com/tada5hi"
                        target="_blank"
                        rel="noopener"
                    >@tada5hi</a>)
                </span>
            </div>
        </div>
    </footer>
</template>
