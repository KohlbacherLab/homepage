import { TeamID, definePerson } from '../..';

export default definePerson({
    avatar: '/images/persons/wein-samuel.jpg',
    name: 'Samuel Wein',
    team: TeamID.ABI,
    role: 'PostDoc',
    email: 'samuel[dot]wein[at]uni-tuebingen.de',
    socialLinks: [
        { icon: 'github', link: 'https://github.com/poshul' },
        { icon: 'mastodon', link: 'https://fediscience.org/@samweingamgee' },
        { icon: 'linkedin', link: 'https://www.linkedin.com/in/samuel-wein-phd-20700323/' },
        { icon: 'orcid', link: 'https://orcid.org/0000-0002-8923-6874/' },
    ],
    education: [
        {
            year: [2006, 2010],
            value: 'Earlham College: BA (Biology/Computer Science) ',
        },
        {
            year: [2012, 2019],
            value: 'University of Pennsylvania:  PhD (Biochemistry and Molecular Biophysics) ',
        },
    ],
    interests: [
        'Open science',
        'Open source software',
        'Oligonucleotide mass spectrometry',
        'Backpacking',
        'Photography',
    ],
});
