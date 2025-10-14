import { TeamID, definePerson } from '../..';

export default definePerson({
    avatar: 'https://avatars.githubusercontent.com/u/3737?v=4',
    name: 'Peter J. Jones',
    email: 'peter.jones@uni-tuebingen.de',
    address: 'Sand 14, Room C321, 72076 Tübingen',
    team: TeamID.ABI,
    role: 'PhD Student',

    socialLinks: [
        { icon: 'github', link: 'https://github.com/pjones' },
        { icon: 'mastodon', link: 'https://hostux.social/@devalot' },
        { icon: 'linkedin', link: 'https://www.linkedin.com/in/devalot/' },
        { icon: 'orcid', link: 'https://orcid.org/0009-0004-6644-4752' },
    ],

    interests: [
        'Free and Open Source Software',
        'Privacy and Security',
        'Reproducible Research',
    ],

    education: [
        {
            year: [2023, 2024],
            value: 'Western Governors University',
        },
    ],

    biography: [
        {
            year: [1997, 2024],
            value: 'Senior Software Engineer',
        },
        {
            year: 2024,
            value: 'Researcher, Applied Bioinformatics at the University Tübingen',
        },
    ],
});
