import { TeamID, definePerson } from '../..';

export default definePerson({
    avatar: '/images/persons/mueller-tom.png',
    name: 'Tom D. Müller',
    email: 'tom.mueller@uni-tuebingen.de',
    address: 'Sand 14, Room C313, 72076 Tübingen',
    team: TeamID.ABI,
    role: 'PhD Student',

    socialLinks: [
        { icon: 'github', link: 'https://github.com/t0mdavid-m' },
        { icon: 'linkedin', link: 'https://www.linkedin.com/in/tom-david-mueller' },
    ],

    interests: [
        'Free and Open Source Software',
        'Open science',
        'Top-Down Mass Spectrometry',
        'Reproducible Research',
    ],

    education: [
        {
            year: [2017, 2021],
            value: 'Technical University of Darmstadt - B. Sc. Biomolecular Engineering',
        },
        {
            year: [2021, 2024],
            value: 'University of Tübingen - M. Sc. Bioinformatics',
        },
    ],

    publications: [
        {
            year: 2024,
            value: 'Weinhold, H., Peterson, L., Müller, T. D., Wekenborg, K., Grünewald, M., & Rarey, J. (2024). Improving the Accuracy of Activity Coefficient Estimation in Specialty Chemistry Using Local Estimators. Industrial & Engineering Chemistry Research, 63(17), 7902–7914. https://doi.org/10.1021/acs.iecr.4c00372',
        },
        {
            year: 2023,
            value: 'Kunzmann, P., Müller, T. D., Greil, M., Krumbach, J. H., Anter, J. M., Bauer, D., Islam, F., & Hamacher, K. (2023). Biotite: New tools for a versatile Python bioinformatics library. BMC Bioinformatics, 24(1), 236. https://doi.org/10.1186/s12859-023-05345-6',
        },
    ],

});
