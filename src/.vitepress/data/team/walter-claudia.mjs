import {TeamGroup} from "../../domains/team/constants";
import {defineTeamMember} from "../../domains/team/define";

export default defineTeamMember({
    avatar: '/images/team/default.png',
    name: 'Claudia Walter',
    team: TeamGroup.ABI,
    title: 'Assistant',
    links: [],
});
