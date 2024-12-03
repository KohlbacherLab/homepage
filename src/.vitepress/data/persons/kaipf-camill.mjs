import { TeamID, definePerson } from '../..';

export default definePerson({
    avatar: '/images/persons/kaipf-camill.jpg',
    name: 'Camill Kaipf',
    team: TeamID.ABI,
    role: 'Researcher',
    email: 'camill.kaipf@uni-tuebingen.de',
    phone: '+49 7071 2970482',
    address: 'Sand 14, Room C121, Tübingen, 72076',
    socialLinks: [
        { icon: 'github', link: 'https://github.com/ckaipf' },
        { icon: 'linkedin', link: 'www.linkedin.com/in/camill-kaipf-672532238' },
    ],
});
