import {TeamGroup} from "../../domains/team/constants";
import {defineTeamMember} from "../../domains/team/define";

export default defineTeamMember({
    avatar: '/images/team/kohlbacher-oliver.png',
    name: 'Oliver Kohlbacher',
    title: 'Professor & Lead',
    team: [TeamGroup.ABI, TeamGroup.TBI],
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
