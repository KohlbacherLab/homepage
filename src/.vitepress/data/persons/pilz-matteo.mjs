import { TeamID, definePerson } from '../..';

export default definePerson({
    avatar: '/images/persons/pilz-matteo.png',
    name: 'Matteo Pilz',
    team: TeamID.ABI,
    role: 'PhD Student',
    socialLinks: [
        { icon: 'github', link: 'https://github.com/matteopilz' },
        { icon: 'linkedin', link: 'https://www.linkedin.com/in/matteo-pilz' },
    ],
    address: 'Maria-von-Linden-Straße 6, Room 20-5-A7, 72076 Tübingen',
    phone: '+49 7071 29 70461',
    email: 'matteo.pilz@uni-tuebingen.de',
    education: [
        {
            year: [2012, 2024],
            value: 'University of Tübingen',
        },
    ],

    interests: [
        'Molecular Biology',
        'Deep Learning',
        'Data Visualization',
    ],

    biography: [
        {
            year: [2012, 2016],
            value: 'University of Tübingen - B. Sc. Biology',
        },
        {
            year: [2016, 2021],
            value: 'University of Tübingen - M. Sc. Molecular Cell Biology and Immunology',
        },
        {
            year: [2018, 2021],
            value: 'University of Tübingen - M. Sc. Bioinformatics',
        },
    ],
});
