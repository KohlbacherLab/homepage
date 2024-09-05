import {TeamGroup} from "../../domains/team/constants";
import {defineTeamMember} from "../../domains/team/define";

export default defineTeamMember({
    avatar: '/images/team/wein-samuel.jpg',
    name: 'Samuel Wein',
    team: TeamGroup.ABI,
    title: 'PostDoc',
    links: [],
});
