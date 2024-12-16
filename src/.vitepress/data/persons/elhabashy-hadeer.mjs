import { TeamID, definePerson } from '../..';

export default definePerson({

    email: 'hadeer.elhabashy@Tuebingen.mpg.de',
    phone: '+49-7071-29-70457',
    avatar: '/images/persons/elhabashy-hadeer.png',
    name: 'Hadeer Elhabashy',
    role: 'Postdoc',
    team: TeamID.ABI,
    socialLinks: [
        { icon: 'github', link: 'https://github.com/ElhabashyLab' },
        { icon: 'linkedin', link: 'linkedin.com/in/hadeer-elhabashy-88373254' },
        { icon: 'x', link: 'https://x.com/HadeerElhabashy'},
    ],
    education: [
        {year: 2023, value: 'Ph.D. in Bioinformatics, University of Tübingen/Max Planck Institute for Biology Tübingen'},
        {year: 2016, value: 'M.Sc. in Physics, The American University in Cairo'},
        {year: 2012, value: 'preM.Sc. in Molecular BioPhysics, Cairo University'},
        {year: 2010, value: 'B.Sc. in BioPhysics, Cairo University'},
    ],
});
