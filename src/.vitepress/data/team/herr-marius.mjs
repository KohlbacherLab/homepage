import {TeamGroup} from "../../domains/team/constants";
import {defineTeamMember} from "../../domains/team/define";

export default defineTeamMember({
    avatar: 'https://www.github.com/SirHerr.png',
    name: 'Marius de Arruda Botelho Herr',
    title: 'PhD Student',
    team: TeamGroup.TBI,
    links: [
        { icon: 'github', link: 'https://github.com/SirHerr' },
        { icon: 'linkedin', link: 'https://de.linkedin.com/in/marius-de-arruda-botelho-herr-60b89b18b' },
    ],
});
