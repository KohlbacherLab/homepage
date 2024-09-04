import {TeamGroup} from "../../domains/team/constants";
import {defineTeamMember} from "../../domains/team/define";

export default defineTeamMember({
    avatar: '/images/team/default.png',
    name: 'Ayesha Feroz',
    title: 'PhD Student',
    team: TeamGroup.ABI,
    links: [],
});
