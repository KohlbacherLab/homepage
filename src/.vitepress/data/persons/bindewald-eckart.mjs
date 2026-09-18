import { TeamID, definePerson } from '../..';

export default definePerson({
    name: 'Eckart Bindewald',
    role: 'Staff Scientist',
    email: 'eckart.bindewald@uni-tuebingen.de',
    team: TeamID.ABI,
    description: 'Agentic AI and bioinformatics expert with leadership and teaching experience.',
    interests: [
        'Agentic AI',
        'Generative AI & Large Language Models',
        'Retrieval-Augmented Generation',
        'Multi-omics Data Integration',
        'RNA Structure Prediction & Design',
        'Clinical Bioinformatics',
    ],
    education: [
        {
            year: 1997,
            value: 'M.S. in Physics, University of Heidelberg, Germany',
        },
        {
            year: 2000,
            value: 'PhD in Natural Sciences (Physics), University of Heidelberg, Germany — Thesis on structural bioinformatics (protein structure prediction)',
        },
    ],
    biography: [
        {
            year: [2004, 2009],
            value: 'Programmer/Analyst, SAIC, National Cancer Institute, NIH',
        },
        {
            year: [2009, 2021],
            value: 'Senior Computational Scientist, Leidos Biomedical Research — led the biomolecular informatics group',
        },
        {
            year: [2021, 2025],
            value: 'Lead Data Scientist, Precise Software Solutions',
        },
        {
            year: [2024, 2025],
            value: 'Adjunct Faculty of Bioinformatics, Hood College',
        },
        {
            year: [2024, 2025],
            value: 'Principal Scientist AI and Bioinformatics, Karyon Bio, CA',
        },
        {
            year: 2025,
            value: 'Staff Scientist, Universität Tübingen',
        },
    ],
});
