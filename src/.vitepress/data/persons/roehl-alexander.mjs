import { TeamID } from "../..";
import { definePerson } from "../..";

export default definePerson({
    name: 'Alexander Röhl',
    role: 'PhD Student',
    avatar: '/images/persons/roehl-alexander.png',
    email: 'alexander.roehl@uni-tuebingen.de',
    phone: '+49 7071 29 70462',
    address: 'Sand 14, 2.OG Raum C323, 72076 Tübingen',
    team: TeamID.ABI,
    socialLinks: [
        {
            icon: 'github',
            link: 'https://github.com/Nightknight3000'
        },
    ],
    interests: [
        'Data Privacy and Security',
        'Medical Data Analytics',
        'Machine Learning',
        'Structural Bioinformatics'
    ],
    education: [
        {
            year: 0,
            value: 'tba'
        }
    ],
    publications : [
        {
            year: 2024,
            value: 'Röhl, A., Netz, E., Kohlbacher, O., & Elhabashy, H. (2024). CLAUDIO: automated structural analysis of cross-linking data. Bioinformatics, 40(4), btae146.'
        }
    ]
});
