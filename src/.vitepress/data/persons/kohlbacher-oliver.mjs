import {TeamID} from "../../domains/team/constants";
import {definePerson} from "../../domains/person/define";

export default definePerson({
    avatar: '/images/persons/kohlbacher-oliver.png',
    name: 'Oliver Kohlbacher',
    title: 'Professor & Lead',
    team: [TeamID.ABI, TeamID.TBI],
    links: [
        { icon: 'github', link: 'https://github.com/okohlbacher' },
    ],
    education: [
        {
            year: 2001,
            value: 'PhD in Computer Science, Saarland University/Max Planck Institute for Informatics, Saarbrücken (supervisors: Hans-Peter Lenhof and Kurt Mehlhorn)'
        }
    ],
    biography: [
        { year: 2018, value: 'Director, Institute for Translational Bioinformatics, University Medical Center, Tübingen' },
        { year: [2015, 2021], value: 'Fellow, Max Planck Institute for Developmental Biology' },
    ],
    awards: [
        { year: 2023, value: 'Fellow of the International Society for Computational Biology (ISCB)' }
    ]
});
