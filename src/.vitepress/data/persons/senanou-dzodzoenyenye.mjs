import { TeamID, definePerson } from '../..';

export default definePerson({
    name: 'Dzodzoenyenye Adjowa Senanou',
    role: 'AIMS–Tübingen Research Fellow',
    avatar: '/images/persons/senanou-dzodzoenyenye.jpeg',
    email: 'dsenanou@aimsammi.org',
    address: 'Maria-von-Linden-Straße 6, Room 20-28/A15, 72076 Tübingen',
    team: TeamID.ABI,
    socialLinks: [
        {
            icon: 'linkedin',
            link: 'https://www.linkedin.com/in/dzodzoesenanou13/',
        },
    ],
    interests: [
        'Machine Learning',
        'Drug Discovery',
        'Computational Biology',
        'Proteomics',
        'Mass Spectrometry Data Analysis',
        'Data Quality',
    ],
    education: [
        {
            year: 2025,
            value: 'M.Sc. in Machine Intelligence, African Institute for Mathematical Sciences, Senegal',
        },
        {
            year: 2023,
            value: 'M.Sc. in Big Data, African Institute for Mathematical Sciences, Senegal',
        },
        {
            year: 2020,
            value: 'M.Sc. in Research in Pure and Applied Mathematics, University of Lomé, Togo',
        },
    ],
});
