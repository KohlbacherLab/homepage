import { TeamID, definePerson } from '../..';

export default definePerson({
    avatar: '/images/persons/baeuerle-famke.jpg',
    name: 'Famke Bäuerle',
    email: 'famke.baeuerle@uni-tuebingen.de',
    address: 'M3 Research Center, Otfried-Müller-Straße 37, 72076 Tübingen',
    team: TeamID.TBI,
    role: 'PhD Student',

    socialLinks: [
        { icon: 'github', link: 'https://github.com/famosab' },
        { icon: 'linkedin', link: 'https://www.linkedin.com/in/famke-b%C3%A4uerle-b2123a198/' },
        { icon: 'orcid', link: 'https://orcid.org/0000-0003-1387-0251' },
    ],

    interests: [
        'Free and Open Source Software',
        'Nextflow and nf-core',
        'Reproducible Research',
        'Cancer Genomics',
        'Personalized Medicine',
    ],

    education: [
        {
            year: [2015, 2018],
            value: 'University of Tübingen - B. Sc. Nano-Science',
        },
        {
            year: [2018, 2023],
            value: 'University of Tübingen - M. Sc. Nano-Science',
        },
        {
            year: [2020, 2023],
            value: 'University of Tübingen - M. Sc. Bioinformatics',
        },
    ],

    publications: [
        {
            year: 2024,
            value: 'Hanssen F, Gabernet G, Bäuerle F et al. NCBench: providing an open, reproducible, transparent, adaptable, and continuous benchmark approach for DNA-sequencing-based variant calling [version 2; peer review: 2 approved]. F1000Research 2024, 12:1125 (https://doi.org/10.12688/f1000research.140344.2)',
        },
        {
            year: 2023,
            value: 'Bäuerle, F., Döbel, G. O., Camus, L., Heilbronner, S., & Dräger, A. (2023). Genome-scale metabolic models consistently predict in vitro characteristics of Corynebacterium striatum. Frontiers in Bioinformatics, 3, 1214074. (https://doi.org/10.3389/fbinf.2023.1214074 )',
        },
        {
            year: 2021,
            value: 'Girelli, A., Beck, C., Bäuerle, F., Matsarskaia, O., Maier, R., Zhang, F., ... & Roosen-Runge, F. (2021). Molecular flexibility of antibodies preserved even in the dense phase after macroscopic phase separation. Molecular pharmaceutics, 18(11), 4162-4169. (https://pubs.acs.org/doi/full/10.1021/acs.molpharmaceut.1c00555)',
        },
    ],

});
