import { TeamID, definePerson } from '../..';

export default definePerson({
    avatar: '/images/persons/default.png',
    address: [
        'Room C317',
        'Sand 14, Tübingen, Germany 72076',
    ],
    email: 'claudia.walter@uni-tuebingen.de',
    phone: '+49-7071-29-70457',
    name: 'Claudia Walter',
    team: TeamID.ABI,
    role: 'Assistant',
    socialLinks: [],
});
