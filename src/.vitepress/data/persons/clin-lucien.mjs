import { TeamID, definePerson } from '../..';

export default definePerson({
    avatar: '/images/persons/clin-lucien.png',
    //    avatar: 'https://www.github.com/lucienclin.png',
    name: 'Lucien Clin',
    email: 'lucien.clin@uni-tuebingen.de',
    address: 'Maria-von-Linden-Straße 6, Room 20-30/A15, 72076 Tübingen',
    team: TeamID.TBI,
    role: 'Researcher',
    socialLinks: [
        { icon: 'github', link: 'https://github.com/lucienclin' },
    ],
});
