import { TeamID } from "../..";
import { definePerson } from "../..";

export default definePerson({
    name: 'Peter Placzek',
    avatar: 'https://www.github.com/tada5hi.png',
    email: 'peter.placzek@medizin.uni-tuebingen.de',
    phone: '+49 7071 29 84309',
    address: 'Schaffhausenstraße 77,Raum 2.105,Tübingen,72072',
    team: 'tbi',
    role: 'Researcher',
    socialLinks: [
        { icon: 'github', link: 'https://github.com/tada5hi' },
        { icon: 'twitter', link: 'https://twitter.com/tada5hi' },
        { icon: 'linkedin', link: 'https://www.linkedin.com/in/peter-placzek-047a74210/' },
    ],
    interests: [
        'Personalized Medicine',
        'Privacy',
        'Security'
    ],
    education: [
        {
            year: [2002, 2008],
            value: 'Grundschule Pliezhausen'
        },
        {
            year: [2007, 2015],
            value: 'Gymansium Bildungszentrum Reutlingen-Nord'
        },
        {
            year: [2016, 2020],
            value: 'Eberhard Karls University Tübingen'
        },
        {
            year: [2020, 2024],
            value: 'Eberhard Karls University Tübingen'
        },
    ],
    biography: [
        {
            year: [2015, 2016],
            value: '"Bundesfreiwilligendienst (BFD)" at IT-Schulungszentrum (SZ), University Hospital (UKT)'
        },
        {
            year: [2016, 2024],
            value: 'IT-Administrator at IT-Schulungszentrum (SZ), University Hospital (UKT)',
        },
        {
            year: [2019, 2021],
            value: 'Tutor Software-Engineering Project at the University (UNI)',
        },
        {
            year: 2020,
            value: 'Researcher at the Institute for Translational Bioinformatics (TBI) at the University of Tübingen'
        }
    ]
});
