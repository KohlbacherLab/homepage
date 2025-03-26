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
    address: [
        'Room C322',
        'Sand 14, Tübingen, Germany 72076',
    ],
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
