import { TeamGroup } from "../../domains/team/constants";
import { defineTeamMember } from "../../domains/team/define";

export default defineTeamMember({
    avatar: '/images/team/default.png',
    name: 'Arslan Siraj',
    team: TeamGroup.ABI,
    title: 'PhD Student',
    links: [],
});
