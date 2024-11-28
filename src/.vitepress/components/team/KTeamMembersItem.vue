<!--
  - Copyright (c) 2024.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->
<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import { VPLink, VPSocialLinks } from 'vitepress/theme';
import type { Person } from '../../domains';

export default defineComponent({
    components: {
        VPLink,
        VPSocialLinks,
    },
    props: {
        size: {
            type: String as PropType<'small' | 'medium'>,
            default: 'medium',
        },
        member: {
            type: Object as PropType<Person>,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
    },
});
</script>

<template>
    <article
        class="VPTeamMembersItem"
        :class="[size]"
    >
        <div class="profile">
            <div>
                <VPLink :href="'/team/' + slug">
                    <img
                        class="avatar"
                        :src="member.avatar"
                        :alt="member.name"
                    >
                </VPLink>
            </div>
            <div class="data">
                <h1 class="name">
                    <VPLink :href="'/team/' + slug">
                        {{ member.name }}
                    </VPLink>
                </h1>
                <p
                    v-if="member.role"
                    class="affiliation"
                >
                    <span class="title">
                        {{ member.role }}
                    </span>
                </p>
                <p
                    v-if="member.description"
                    class="desc"
                    v-html="member.description"
                />
                <div
                    v-if="member.socialLinks"
                    class="links"
                >
                    <VPSocialLinks :links="member.socialLinks" />
                </div>
            </div>
        </div>
        <div
            v-if="member.sponsor"
            class="sp"
        >
            <VPLink
                class="sp-link"
                :href="member.sponsor"
                no-icon
            >
                <span class="vpi-heart sp-icon" /> {{ member.actionText || 'Sponsor' }}
            </VPLink>
        </div>
    </article>
</template>

<style scoped>
.VPTeamMembersItem {
    display: flex;
    flex-direction: column;
    gap: 2px;
    border-radius: 12px;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.VPTeamMembersItem.small .profile {
    padding: 32px;
}

.VPTeamMembersItem.small .data {
    padding-top: 20px;
}

.VPTeamMembersItem.small .avatar {
    width: 64px;
    height: 64px;
}

.VPTeamMembersItem.small .name {
    line-height: 24px;
    font-size: 16px;
}

.VPTeamMembersItem.small .affiliation {
    padding-top: 4px;
    line-height: 20px;
    font-size: 14px;
}

.VPTeamMembersItem.small .desc {
    padding-top: 12px;
    line-height: 20px;
    font-size: 14px;
}

.VPTeamMembersItem.small .links {
    margin: 0 -16px -20px;
    padding: 10px 0 0;
}

.VPTeamMembersItem.medium .profile {
    padding: 48px 32px;
}

.VPTeamMembersItem.medium .data {
    padding-top: 24px;
    text-align: center;
}

.VPTeamMembersItem.medium .avatar {
    width: 96px;
    height: 96px;
}

.VPTeamMembersItem.medium .name {
    letter-spacing: 0.15px;
    line-height: 28px;
    font-size: 20px;
}

.VPTeamMembersItem.medium .affiliation {
    padding-top: 4px;
    font-size: 16px;
}

.VPTeamMembersItem.medium .desc {
    padding-top: 16px;
    max-width: 288px;
    font-size: 16px;
}

.VPTeamMembersItem.medium .links {
    margin: 0 -16px -12px;
    padding: 16px 12px 0;
}

.profile {
    flex-grow: 1;
    background-color: var(--vp-c-bg-soft);
}

.data {
    text-align: center;
}

.avatar {
    position: relative;
    flex-shrink: 0;
    margin: 0 auto;
    border-radius: 50%;
    box-shadow: var(--vp-shadow-3);
    object-fit: cover;
}

.name {
    margin: 0;
    font-weight: 600;
}

.affiliation {
    margin: 0;
    font-weight: 500;
    color: var(--vp-c-text-2);
}

.org.link {
    color: var(--vp-c-text-2);
    transition: color 0.25s;
}

.org.link:hover {
    color: var(--vp-c-brand-1);
}

.desc {
    margin: 0 auto;
}

.desc :deep(a) {
    font-weight: 500;
    color: var(--vp-c-brand-1);
    text-decoration-style: dotted;
    transition: color 0.25s;
}

.links {
    display: flex;
    justify-content: center;
    height: 56px;
}

.sp-link {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 16px;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-sponsor);
    background-color: var(--vp-c-bg-soft);
    transition: color 0.25s, background-color 0.25s;
}

.sp .sp-link.link:hover,
.sp .sp-link.link:focus {
    outline: none;
    color: var(--vp-c-white);
    background-color: var(--vp-c-sponsor);
}

.sp-icon {
    margin-right: 8px;
    font-size: 16px;
}
</style>
