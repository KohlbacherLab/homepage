import { TeamID, definePerson } from '../..';

export default definePerson({
    name: 'Nadine S. Kurz',
    avatar: '/images/persons/default.png',
    email: 'nadine.kurz@uni-tuebingen.de',
    address: 'Maria-von-Linden-Straße 6, Room 20-31/A12, 72076 Tübingen',
    team: [TeamID.TBI, TeamID.ABI],
    role: 'PostDoc',
    socialLinks: [
        { icon: 'github', link: 'https://gitlab.gwdg.de/nadine.kurz' },
        { icon: 'linkedin', link: 'https://www.linkedin.com/in/nadine-sina-kurz/' },
    ],
    interests: [
        'Personalized Medicine',
        'Biomedical AI',
        'Computational genomics',
        'Structural bioinformatics',
    ],
    biography: [
        {
            year: [2020, 2021],
            value: 'Research Scientist, University of Hohenheim',
        },
        {
            year: [2022, 2026],
            value: 'Dr. rer. nat. at the Department of Medical Bioinformatics, University Medical Center Göttingen (Supervisors: Jürgen Dönitz and Tim Beißbarth) (Dissertation: <a href="https://d-nb.info/139912983X/34" target="_blank" rel="noopener noreferrer" class="text-(--vp-c-brand-1) underline">A Decision Support Framework for the Interpretation of Genetic Alterations in Molecular Tumor Boards</a>)',
        },
        {
            year: 2026,
            value: 'Postdoctoral researcher, University Medical Center Göttingen',
        },
        {
            year: 2026,
            value: 'Postdoctoral researcher, University of Tübingen',
        },
    ],
});
