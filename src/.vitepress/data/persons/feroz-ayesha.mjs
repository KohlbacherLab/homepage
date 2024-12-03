import { TeamID, definePerson } from '../..';

export default definePerson({
    avatar: '/images/persons/feroz-ayesha.png',
    name: 'Ayesha Feroz',
    role: 'PhD Student',
    team: TeamID.ABI,
    socialLinks: [
        { icon: 'github', link: 'https://github.com/Ayesha-Feroz' },
        { icon: 'linkedin', link: 'https://pk.linkedin.com/in/ayesha-feroz-a426041a' },
        { icon: 'twitter', link: 'https://x.com/AyeshaFeroz7?t=kfOOZ_3lzMtmHtOC8uCz' },
    ],
});
