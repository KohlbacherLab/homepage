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
                items: [
                    { text: 'de.NBI', link: '/projects/denbi' },
                    { text: 'DIFUTURE', link: '/projects/difuture' },
                    { text: 'EPIC-XS', link: '/projects/epic-xs' },
                    { text: 'PersOns', link: '/projects/pers-ons' },
                    { text: 'A4B', link: '/projects/a4b' },
                    { text: 'Food Profiling', link: '/projects/food-profiling' },
                ]
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
        sidebar: {}
    }
});
