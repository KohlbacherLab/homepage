import { defineConfig } from 'vitepress';

export default defineConfig({
    title: 'Kohlbacherlab',
    base: '/',
    themeConfig: {
        search: {
            provider: 'local'
        },
        logo: '/images/logo.png',
        socialLinks: [
            { icon: 'github', link: 'https://github.com/KohlbacherLab/homepage' }
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
                text: 'Getting Started',
                link: '/getting-started/',
                activeMatch: '/getting-started/'
            },
            {
                text: 'Teaching',
                link: '/teaching'
            },
            {
                text: 'Research',
                link: '/research'
            },
            {
                text: 'Publications',
                link: '/publications'
            },
            {
                text: 'About',
                activeMatch: '/about/',
                items: [
                    { text: 'Contact', link: '/about/contact' },
                    { text: 'Team', link: '/about/team' },
                ]
            }
        ],
        sidebar: {
            '/getting-started': [
                {
                    text: 'Overview',
                    items: [
                        { text: 'Introduction', link: '/getting-started/' }
                    ]
                }
            ],
            '/teaching': [
                { text: 'Introduction', link: '/teaching/' }
            ],
            '/research': [
                { text: 'Introduction', link: '/research/' }
            ],
            '/publications': [
                { text: 'Introduction', link: '/publications/' }
            ]
        }
    }
});
