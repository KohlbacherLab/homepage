import { TeamID, definePerson } from '../..';

export default definePerson({
    avatar: 'https://www.github.com/SirHerr.png',
    name: 'Dr. Marius Herr',
    role: 'Researcher',
    team: TeamID.TBI,
    socialLinks: [
        { icon: 'github', link: 'https://github.com/SirHerr' },
        { icon: 'linkedin', link: 'https://de.linkedin.com/in/marius-de-arruda-botelho-herr-60b89b18b' },
    ],
    education: [
        {
            year: 2016,
            value: 'B.Sc. in Medical Informatics, Tübingen, Germany (Thesis: Möglichkeiten und Grenzen von PDF-zu-OCR Batch-Konvertierung unter Linux im klinischen Umfeld – Untersuchung anhand einer Prototypentwicklung)',
        },
        {
            year: 2018,
            value: 'M.Sc. in Medical Informatics, Tübingen, Germany (Thesis: Medical Data Science models for passive antibody therapy of HIV-infected patients)',
        },
        {
            year: 2025,
            value: 'Dr. rer. nat. in Medical Informatics, Tübingen, Germany (Dissertation: Personal Health Train: Advancing Distributed Machine Learning in Healthcare with Data Privacy and Security)',
        },
    ],
    biography: [
        { year: 2024, value: 'Coordinator PrivateAIM, University Medical Center, Tübingen' },
    ],
});
