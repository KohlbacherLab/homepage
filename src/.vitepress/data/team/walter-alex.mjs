import {TeamGroup} from "../../domains/team/constants";
import {defineTeamMember} from "../../domains/team/define";

export default defineTeamMember({
    avatar: '/images/team/default.png',
    name: 'Alex Walter',
    team: TeamGroup.ABI,
    title: 'Postdoc',
    links: [],
});
