import { TeamID, definePerson } from '../..';

export default definePerson({
    name: 'Peter Placzek',
    avatar: 'https://www.github.com/tada5hi.png',
    email: 'peter.placzek@medizin.uni-tuebingen.de',
    phone: '+49 7071 29 70458',
    address: 'Maria-von-Linden-Straße 6, Room 20-30/A15, 72076 Tübingen',
    team: TeamID.TBI,
    role: [
        'Researcher',
        'Technical Lead PrivateAIM',
        'Co-Developer DNPM:DIP',
    ],
    description: 'I build the central infrastructure for privacy-preserving analysis of medical data ' +
        'across hospitals. I am technical lead of the FLAME platform in the BMFTR-funded ' +
        'PrivateAIM consortium, part of the Medical Informatics Initiative, and co-develop ' +
        'DNPM:DIP, the data integration platform of the German Network for Personalized Medicine. ' +
        'My work covers distributed backend architecture, Kubernetes deployment and identity and ' +
        'access management, much of it released as open-source libraries that both platforms ' +
        'build on.',
    socialLinks: [
        { icon: 'github', link: 'https://github.com/tada5hi' },
        { icon: 'twitter', link: 'https://twitter.com/tada5hi' },
        { icon: 'linkedin', link: 'https://www.linkedin.com/in/peter-placzek-047a74210/' },
    ],
    interests: [
        'Personalized Medicine',
        'Privacy',
        'Security',
        'Federated Analytics',
        'Distributed Systems',
        'Software Architecture',
        'Open Source',
    ],
    education: [
        {
            year: [2002, 2006],
            value: 'Grundschule Pliezhausen',
        },
        {
            year: [2007, 2015],
            value: 'Gymansium Bildungszentrum Reutlingen-Nord',
        },
        {
            year: [2016, 2020],
            value: 'Eberhard Karls University Tübingen',
        },
        {
            year: [2020, 2024],
            value: 'Eberhard Karls University Tübingen',
        },
    ],
    biography: [
        {
            year: [2015, 2016],
            value: '"Bundesfreiwilligendienst (BFD)" at IT-Schulungszentrum (SZ), University Hospital (UKT)',
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
            value: 'Researcher at the Institute for Translational Bioinformatics (TBI) at the University of Tübingen',
        },
        {
            year: 2021,
            value: 'Developer of the FLAME Hub, the central service of the PrivateAIM platform',
        },
        {
            year: 2023,
            value: 'Co-developer of DNPM:DIP, the data integration platform of the German Network for Personalized Medicine (DNPM)',
        },
        {
            year: 2023,
            value: 'Technical Lead of the FLAME platform in the PrivateAIM consortium',
        },
    ],
});
