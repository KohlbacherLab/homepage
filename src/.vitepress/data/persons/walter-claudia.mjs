import { TeamID, definePerson } from '../..';

export default definePerson({
    avatar: '/images/persons/default.png',
    address: 'Maria-von-Linden-Straße 6, Room 20-5/A21, 72076 Tübingen',
    email: 'claudia.walter@uni-tuebingen.de',
    phone: '+49 7071 29 70458',
    name: 'Claudia Walter',
    team: TeamID.ABI,
    role: 'Assistant',
    socialLinks: [],
});
