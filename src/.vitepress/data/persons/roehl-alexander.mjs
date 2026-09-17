import { TeamID, definePerson } from '../..';

export default definePerson({
    name: 'Alexander Röhl',
    role: 'PhD Student',
    avatar: '/images/persons/roehl-alexander.png',
    email: 'alexander.roehl@uni-tuebingen.de',
    address: 'Maria-von-Linden-Straße 6, Room 20-28/A15, 72076 Tübingen',
    team: TeamID.ABI,
    socialLinks: [
        {
            icon: 'github',
            link: 'https://github.com/Nightknight3000',
        },
    ],
    interests: [
        'Data Privacy and Security',
        'Medical Data Analytics',
        'Machine Learning',
        'Structural Bioinformatics',
    ],
    education: [
        {
            year: 2020,
            value: 'B.Sc. in Bioinformatics, University of Tübingen, Tübingen, Germany (Thesis: Subtypenspezifisches Machine Learning für die HIV-Korezeptor Vorhersage)',
        },
        {
            year: 2022,
            value: 'M.Sc. in Bioinformatics, University of Tübingen, Tübingen, Germany (Thesis: Method development in interaction prediction, structure elucidation, and modeling of protein-protein homo-oligomers)',
        },
    ],
});
