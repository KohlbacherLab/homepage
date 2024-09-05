import {TeamGroup} from "../../domains/team/constants";
import {defineTeamMember} from "../../domains/team/define";

export default defineTeamMember({
    avatar: 'https://www.github.com/lucienclin.png',
    name: 'Lucien Clin',
    team: TeamGroup.TBI,
    title: 'Researcher',
    links: [
        { icon: 'github', link: 'https://github.com/lucienclin' },
    ],
});
