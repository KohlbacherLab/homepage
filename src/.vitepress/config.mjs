/*
 * Copyright (c) 2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { defineConfig } from 'vitepress';
import { readPersons } from './domains';

const teamMembers = await readPersons();

export default defineConfig({
    title: 'KohlbacherLab',
    description: 'Applied and Translational Bioinformatics',
    base: '/',
    themeConfig: {
        search: {
            provider: 'local',
        },
        logo: {
            light: '/images/icon/logo_dark.png',
            dark: '/images/icon/logo_light.png',
        },
        socialLinks: [
            // { icon: 'github', link: 'https://github.com/KohlbacherLab/homepage' }
        ],
        footer: {
            copyright: 'Copyright © 2024-present KohlbacherLab',
        },
        editLink: {
            pattern: 'https://github.com/KohlbacherLab/homepage/edit/master/src/:path',
            text: 'Edit this page on GitHub',
        },
        siteTitle: false,
        nav: [
            {
                text: 'Home',
                link: '/',
            },
            {
                text: 'Team',
                link: '/team',
                activeMatch: '/team',
            },
            {
                text: 'Research',
                link: '/research',
            },
            {
                text: 'Teaching',
                link: 'https://alma.uni-tuebingen.de/alma/pages/startFlow.xhtml?_flowId=searchCourseNonStaff-flow',
            },
            {
                text: 'Publications',
                link: '/publications',
            },
            {
                text: 'Projects',
                link: '/projects',
                activeMatch: '/projects/',
            },
            {
                text: 'Software',
                link: '/software',
                activeMatch: '/software/',
            },
            {
                text: 'Contact',
                link: '/contact',
            },
        ],
        sidebar: {
            '/persons': teamMembers.map(([slug, member]) => ({
                text: member.name,
                link: `/persons/${slug}`,
            })),
            '/software': [
                {
                    text: 'Packages',
                    items: [
                        { text: 'OpenMS', link: '/software/open-ms' },
                        { text: 'BALL', link: '/software/ball' },
                        { text: 'FLAME', link: '/software/flame' },
                        { text: 'Fred2', link: '/software/fred-2' },
                        { text: 'XLEC', link: '/software/xlec' },
                        { text: 'DNPM:DIP', link: '/software/dnpm-dip' },
                    ],
                },
            ],
            '/projects': [
                { text: 'de.NBI', link: '/projects/denbi' },
                { text: 'DIFUTURE', link: '/projects/difuture' },
                { text: 'EPIC-XS', link: '/projects/epic-xs' },
                { text: 'PersOns', link: '/projects/pers-ons' },
                { text: 'PrivateAIM', link: '/projects/privateaim' },
                { text: 'A4B', link: '/projects/a4b' },
                { text: 'Food Profiling', link: '/projects/food-profiling' },
            ],
        },
    },
});
