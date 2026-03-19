import { TeamID, definePerson } from '../..';

export default definePerson({
    avatar: '/images/persons/kaipf-camill.jpg',
    name: 'Camill Kaipf',
    team: TeamID.ABI,
    role: 'Researcher',
    email: 'camill.kaipf@uni-tuebingen.de',
    phone: '+49 7071 29 70460',
    address: 'Maria-von-Linden-Straße 6, Room 20-5/A19, 72076 Tübingen',
    socialLinks: [
        { icon: 'github', link: 'https://github.com/ckaipf' },
        { icon: 'linkedin', link: 'https://www.linkedin.com/in/camill-kaipf-672532238' },
    ],
});
