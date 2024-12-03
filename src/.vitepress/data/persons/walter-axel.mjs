import { TeamID, definePerson } from '../..';

export default definePerson({
    avatar: '/images/persons/walter-axel.png',
    name: 'Axel Walter',
    address: [
        'Room C322',
        'Sand 14, Tübingen, Germany 72076',
    ],
    email: 'axel.walter@uni-tuebingen.de',
    team: TeamID.ABI,
    role: 'PostDoc',
    socialLinks: [
        { icon: 'github', link: 'https://github.com/axelwalter' },
    ],
    interests: [
        'Metabolomics',
        'Accessible Bioinformatics Workflows',
        'Microbiology',
        'LC-MS Method Development',
    ],

    education: [
        {
            year: [2012, 2017],
            value: 'University of Tübingen',
        },
        {
            year: [2017, 2021],
            value: 'PhD in Microbiology, University of Tübingen',
        },
    ],

    biography: [
        {
            year: 2021,
            value: 'PostDoc, Applied Bioinformatics at the University Tübingen',
        },
    ],
});
