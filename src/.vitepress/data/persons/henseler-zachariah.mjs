import { TeamID, definePerson } from '../..';

export default definePerson({
    address: 'Maria-von-Linden-Straße 6, Room 20-5/A19, 72076 Tübingen',
    email: 'zachariah.henseler@uni-tuebingen.de',
    avatar: '/images/persons/henseler-zachariah.jpg',
    name: 'Zachariah Henseler',
    role: 'Data Steward',
    team: TeamID.ODI,
    socialLinks: [
        { icon: 'github', link: 'https://github.com/zhenseler' },
        { icon: 'linkedin', link: 'https://www.linkedin.com/in/zachariah-m-henseler-93301615a/' },
    ],
    interests: [
        'Gut microbiome',
        'Personalized medicine',
        'Antibiotic resistance',
        'Biochemistry',
        'Unity game engine',
    ],
    education: [
        {
            year: [2009, 2013],
            value: 'BSc: Biochemistry - University of St. Thomas, St. Paul MN USA',
        },
        {
            year: [2013, 2019],
            value: 'PhD: Biochemistry, Cellular and Molecular Biology - Cornell University, Ithaca NY USA',
        },
    ],
    biography: [
        {
            year: [2020, 2022],
            value: 'Bioinformatician/Senior Bioinformatician - Diversigen Inc., Minneapolis MN USA',
        },
        {
            year: [2022, 2026],
            value: 'Postdoctoral Fellow - European Molecular Biology Laboratory, Heidelberg Germany',
        },
        {
            year: 2026,
            value: 'Data Steward - Universität Tübingen, Tübingen Germany',
        },
    ],
});
