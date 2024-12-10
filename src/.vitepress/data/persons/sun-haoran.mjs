import { TeamID, definePerson } from '../..';

export default definePerson({
    avatar: 'https://media.licdn.com/dms/image/v2/D5603AQGiydA4HwU-wQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1729112879980?e=1738800000&v=beta&t=NKKO-wUZ6LhnffwYaf8ioXizfUX1OROjzjE-Cmv-kYY',
    name: 'Haoran Sun',
    email: 'haoran.sun@uni-tuebingen.de',
    team: TeamID.ABI,
    role: 'PhD Student',
    phone: '+49 7071 29 70462',
    address: 'Sand 14, Room C323, Tübingen, 72076',
    socialLinks: [
        { icon: 'github', link: 'https://github.com/everburstSun' },
        { icon: 'linkedin', link: 'https://www.linkedin.com/in/haoran-sun-094b08282/' },
    ],
    interests: [
        'Protein-Protein Interaction',
        'Protein Structure Prediction',
    ],
    education: [
        {
            year: [2014, 2018],
            value: 'Shenyang Pharmaceutical University',
        },
        {
            year: [2018, 2021],
            value: 'Peking Union Medical College',
        },
        {
            year: [2018, 2021],
            value: 'Tsinghua University',
        },
        {
            year: 2024,
            value: 'Eberhard Karls University Tübingen',
        },
    ],
});
