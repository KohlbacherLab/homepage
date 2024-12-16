import { TeamID, definePerson } from '../..';

export default definePerson({
    address: [
        'Room C104',
        'Sand 14, Tübingen, Germany 72076',
    ],
    email: 'julia.leimeister@uni-tuebingen.de',
    phone: '+49-7071-29-70460',
    avatar: '/images/persons/leimeister-julia.jpg',
    name: 'Julia Leimeister',
    role: 'Scientific Project Manager',
    team: TeamID.ABI,
    socialLinks: [
        { icon: 'github', link: 'https://github.com/Julia-97' },
        { icon: 'linkedin', link: 'https://www.linkedin.com/in/julialeimeister/' },
    ],
    education: [
        {
            year: [2016, 2019],
            value: 'BSc Biology - University of Tübingen',
        },
        {
            year: [2019, 2024],
            value: 'MSc Bioinformatics - University of Tübingen',
        },
    ],
});
