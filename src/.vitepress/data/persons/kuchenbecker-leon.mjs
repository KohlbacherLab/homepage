import { TeamID, definePerson } from '../..';

export default definePerson({
    avatar: '/images/persons/kuchenbecker-leon.png',
    name: 'Léon Kuchenbecker',
    role: 'Technical Lead GHGA',
    team: TeamID.ABI,
    email: 'leon.kuchenbecker@uni-tuebingen.de',
    phone: '+49 7071 2974612',
    address: 'Sand 14, Room C123, 72076 Tübingen',
    socialLinks: [
        { icon: 'github', link: 'https://github.com/lkuchenb' },
        { icon: 'linkedin', link: 'https://www.linkedin.com/in/kuchenbecker/' },
    ],
    education: [
        {
            year: [2005, 2009],
            value: 'Universität Bielefeld - B. Sc. Bioinformatics and Genome Research',
        },
        {
            year: [2009, 2011],
            value: 'Freie Universität Berlin - M. Sc. Bioinformatics',
        },
        {
            year: [2011, 2018],
            value: 'Charité / Freie Universität Berlin - Dr. rer. nat. Bioinformatics',
        },
    ],
});
