import { TeamID, definePerson } from '../..';

export default definePerson({
    avatar: '/images/persons/sueruen-bilge.png',
    name: 'Bilge Sürün',
    team: TeamID.ABI,
    role: 'PostDoc',
    email: 'bilge[dot]sueruen[at]uni-tuebingen.de',
    socialLinks: [
        { icon: 'linkedin', link: 'https://www.linkedin.com/in/bilgesurun/' },
    ],
    interests: [
        'Personalized medicine',
        'Precision oncology',
        'Open source software',
    ],
});
