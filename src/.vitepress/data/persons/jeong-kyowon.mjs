import { TeamID, definePerson } from '../..';

export default definePerson({
    avatar: '/images/persons/jeong-kyowon.png',
    name: 'Kyowon Jeong',
    email: 'kyowon.jeong@uni-tuebingen.de',
    role: 'Postdoc',
    team: TeamID.ABI,
    socialLinks: [
        { icon: 'github', link: 'https://github.com/kyowonjeong' },
        { icon: 'twitter', link: 'https://twitter.com/JeongKyowon' },
        { icon: 'linkedin', link: 'https://www.linkedin.com/in/kyowon-jeong-35a7b3173/' },
    ],
    interests: [
        'Top-down proteomics',
        'FLASH * software',
        'Proteoform resolved research',
    ],
    education: [
        {
            year: [2008, 2013],
            value: 'UCSD',
        },
    ],
});
