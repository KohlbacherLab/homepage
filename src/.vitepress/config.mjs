import { defineConfig } from 'vitepress';
import {readTeamMembers} from "./domains/team";

const teamMembers = await readTeamMembers();

export default defineConfig({
    title: 'Kohlbacherlab',
    base: '/',
    themeConfig: {
        search: {
            provider: 'local'
        },
        logo: '/images/logo.png',
        socialLinks: [
             // { icon: 'github', link: 'https://github.com/KohlbacherLab/homepage' }
        ],
        footer: {
            copyright: 'Copyright © 2024-present KohlbacherLab'
        },
        editLink: {
            pattern: 'https://github.com/KohlbacherLab/homepage/edit/master/src/:path',
            text: 'Edit this page on GitHub'
        },
        siteTitle: false,
        nav: [
            {
                text: 'Home',
                link: '/home/',
                activeMatch: '/home/'
            },
            {
                text: 'Team',
                link: '/team'
            },
            {
                text: 'Research',
                link: '/research'
            },
            {
                text: 'Teaching',
                link: '/teaching'
            },
            {
                text: 'Publications',
                link: '/publications'
            },
            {
                text: 'Projects',
                link: '/research'
            },
            {
                text: 'Software',
                link: '/software'
            },
            {
                text: 'Contact',
                link: '/contact'
            },
        ],
        sidebar: {
            '/team': [
                {
                    text: 'Overview',
                    items: [
                        { text: 'Active', link: '/team' },
                    ]
                },
                {
                    text: 'Members',
                    items: teamMembers.map(([slug, member]) => {
                        return {
                            text: member.name,
                            link: '/team/' + slug,
                        }
                    })
                }
            ]
        }
    }
});
