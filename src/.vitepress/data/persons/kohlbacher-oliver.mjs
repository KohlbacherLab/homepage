import { TeamID } from "../..";
import { definePerson } from "../..";

export default definePerson({
    address: [
        "Room C317",
        "Sand 14, Tübingen, Germany 72076"
    ],
    email: "oliver.kohlbacher@uni-tuebingen.de",
    phone: "+49-7071-29-70457",
    avatar: '/images/persons/kohlbacher-oliver.png',
    name: 'Oliver Kohlbacher',
    role: 'Professor & Lead',
    team: [TeamID.ABI, TeamID.TBI],
    socialLinks: [
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
