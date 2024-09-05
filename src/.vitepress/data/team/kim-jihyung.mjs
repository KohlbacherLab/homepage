import {TeamGroup} from "../../domains/team/constants";
import {defineTeamMember} from "../../domains/team/define";

export default defineTeamMember({
    avatar: '/images/team/default.png',
    name: 'Jihyung Kim',
    title: 'PhD Student',
    team: TeamGroup.ABI,
    links: [],
});
