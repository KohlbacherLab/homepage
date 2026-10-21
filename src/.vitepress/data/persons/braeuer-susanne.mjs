import { TeamID, definePerson } from '../..';

export default definePerson({
    avatar: '/images/persons/default.png',
    name: 'Susanne Braeuer',
    email: 'susanne.braeuer@uni-tuebingen.de',
    address: 'Maria-von-Linden-Straße 6, Room 20-30/A15, 72076 Tübingen',
    team: TeamID.TBI,
    role: 'Project Manager',

    education: [
        {
            year: [2007],
            value: 'University of Ulm - Phd Biology',
        },
    ],

});
