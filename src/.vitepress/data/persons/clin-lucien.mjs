import { TeamID, definePerson } from '../..';

export default definePerson({
    avatar: 'https://www.github.com/lucienclin.png',
    name: 'Lucien Clin',
    email: 'lucien.clin@uni-tuebingen.de',
    phone: '+49 7071 29 84309',
    address: 'Schaffhausenstraße 77, 72072 Tübingen',
    team: TeamID.TBI,
    role: 'Researcher',
    socialLinks: [
        { icon: 'github', link: 'https://github.com/lucienclin' },
    ],
});
