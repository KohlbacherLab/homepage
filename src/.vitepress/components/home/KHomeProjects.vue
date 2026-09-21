<!--
  - Copyright (c) 2026.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->
<script lang="ts">
import { VPLink } from 'vitepress/theme';
import { defineComponent } from 'vue';
import { data as projects } from '../../data/projects.data';
import { data as software } from '../../data/software.data';
import { formatRuntimeYears } from '../../domains/project/format.ts';
import { selectFeaturedProjects } from '../../domains/project/select.ts';
import { selectFeaturedSoftware } from '../../domains/software/select.ts';
import KHomeSectionHeader from './KHomeSectionHeader.vue';

const PROJECT_TITLE_CLASS = 'block text-[16.5px] font-semibold text-fg group-hover:text-primary-600 dark:group-hover:text-primary-300';

export default defineComponent({
    components: {
        KHomeSectionHeader,
        VPLink,
    },
    setup() {
        const featuredProjects = selectFeaturedProjects(projects.items, new Date(projects.generatedAt))
            .map((project) => ({
                url: project.url,
                title: project.title,
                name: project.name,
                funders: project.funding.map((item) => item.funder).join(' · '),
                years: formatRuntimeYears(project.runtime),
            }));

        return {
            featuredProjects,
            featuredSoftware: selectFeaturedSoftware(software),
            projectCount: projects.items.length,
            projectTitleClass: PROJECT_TITLE_CLASS,
        };
    },
});
</script>
<template>
    <section class="k-section">
        <div class="k-wrap">
            <KHomeSectionHeader
                eyebrow="Projects & software"
                title="From research to infrastructure"
            />
            <div class="grid gap-11 lg:grid-cols-[1.1fr_1fr]">
                <div>
                    <div class="mb-3 flex items-baseline justify-between gap-4">
                        <h3 class="m-0 text-[13px] font-semibold tracking-[0.08em] text-fg-muted uppercase">
                            Current projects
                        </h3>
                        <VPLink
                            href="/projects"
                            class="k-link text-sm"
                        >
                            All {{ projectCount }} projects →
                        </VPLink>
                    </div>
                    <ul class="m-0 list-none border-t border-border p-0">
                        <li
                            v-for="project in featuredProjects"
                            :key="project.url"
                            class="border-b border-border"
                        >
                            <VPLink
                                :href="project.url"
                                class="group grid grid-cols-[1fr_auto] items-center gap-4 py-4"
                            >
                                <span>
                                    <span :class="projectTitleClass">
                                        {{ project.title }}
                                    </span>
                                    <span class="mt-0.5 block text-sm text-fg-muted">
                                        {{ project.name }}
                                    </span>
                                </span>
                                <span class="text-right text-[12.5px] whitespace-nowrap text-fg-muted tabular-nums">
                                    <span class="block font-semibold text-fg">{{ project.funders }}</span>
                                    {{ project.years }}
                                </span>
                            </VPLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <div class="mb-3 flex items-baseline justify-between gap-4">
                        <h3 class="m-0 text-[13px] font-semibold tracking-[0.08em] text-fg-muted uppercase">
                            Open-source software
                        </h3>
                        <VPLink
                            href="/software"
                            class="k-link text-sm"
                        >
                            All software →
                        </VPLink>
                    </div>
                    <div class="grid gap-3 sm:grid-cols-2">
                        <article
                            v-for="item in featuredSoftware"
                            :key="item.url"
                            class="k-card k-card-interactive relative flex flex-col gap-2 p-[18px]"
                        >
                            <h4 class="m-0 text-[17px] font-bold tracking-tight text-fg">
                                <VPLink
                                    :href="item.url"
                                    class="after:absolute after:inset-0"
                                >
                                    {{ item.title }}
                                </VPLink>
                            </h4>
                            <p class="m-0 grow text-[13.5px] leading-relaxed text-fg-muted">
                                {{ item.summary }}
                            </p>
                            <a
                                v-if="item.repository"
                                :href="item.repository"
                                target="_blank"
                                rel="noopener"
                                class="k-link relative z-10 w-fit text-[13px]"
                            >Repository ↗</a>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
