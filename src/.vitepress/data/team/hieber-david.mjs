import {TeamGroup} from "../../domains/team/constants";
import {defineTeamMember} from "../../domains/team/define";

export default defineTeamMember({
    avatar: 'https://www.github.com/antidodo.png',
    name: 'David Hieber',
    title: 'Researcher',
    team: TeamGroup.TBI,
    links: [
        { icon: 'github', link: 'https://github.com/antidodo' },
    ],
});
