import { TeamID, definePerson } from '../..';

export default definePerson({
    avatar: 'https://www.github.com/antidodo.png',
    name: 'David Hieber',
    role: 'Researcher',
    team: TeamID.TBI,
    socialLinks: [
        { icon: 'github', link: 'https://github.com/antidodo' },
    ],
    education: [
        { year: '2018',
         value: 'University of Tübingen - B. Sc. Informatics'
    },
     { year: '2021',
         value: 'University of Tübingen - M. Sc. Informatics'
    }
    ]
});
