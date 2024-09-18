import { defineConfig } from 'vitepress';
import {readPersons} from "./domains";

const teamMembers = await readPersons();

export default defineConfig({
    title: 'Kohlbacherlab',
    base: '/',
    themeConfig: {
        search: {
            provider: 'local'
        },
        logo: {
            light: '/images/icon/logo_dark.png',
            dark: '/images/icon/logo_light.png'
        },
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
                link: '/projects',
                activeMatch: '/projects/'
            },
            {
                text: 'Software',
                link: '/software',
                activeMatch: '/software/',
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
            ],
            '/software': [
                {
                    text: 'Packages',
                    items: [
                        {text: 'OpenMS', link: '/software/open-ms'},
                        {text: 'BALL', link: '/software/ball'},
                        {text: 'Fred2', link: '/software/fred-2'},
                        {text: 'XLEC', link: '/software/xlec'},
                    ]
                },
                {
                    text: 'Webserver',
                    items: [
                        {text: 'EpiToolKit', link: '/software/epi-tool-kit'},
                        {text: 'NRPSpredictor2', link: '/software/nrp-spredictor-2'},
                        {text: 'MultiLoc2', link: '/software/multi-loc-2'},
                        {text: 'SherLoc2', link: '/software/sher-loc-2'},
                        {text: 'YLoc', link: '/software/y-loc'},
                    ]
                }
            ],
            '/projects': [
                { text: 'de.NBI', link: '/projects/denbi' },
                { text: 'DIFUTURE', link: '/projects/difuture' },
                { text: 'EPIC-XS', link: '/projects/epic-xs' },
                { text: 'PersOns', link: '/projects/pers-ons' },
                { text: 'PrivateAIM', link: '/projects/privateaim' },
                { text: 'A4B', link: '/projects/a4b' },
                { text: 'Food Profiling', link: '/projects/food-profiling' },
            ]
        }
    }
});
