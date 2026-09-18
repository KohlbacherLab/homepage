import { TeamID, definePerson } from '../..';

export default definePerson({
    avatar: '/images/persons/default.png',
    address: 'Maria-von-Linden-Straße 6, Room 20-30/A15, 72076 Tübingen',
    email: 'jonas.bollgruen@uni-tuebingen.de',
    name: 'Jonas Bollgrün',
    team: TeamID.TBI,
    role: 'Software Developer',
    socialLinks: [
        { icon: 'github', link: 'https://github.com/apothecarius' },
    ],
    education: [
        {
            year: [2009, 2019],
            value: 'University of Tübingen, B.Sc. and M.Sc in Informatics',
        },
    ],
});
