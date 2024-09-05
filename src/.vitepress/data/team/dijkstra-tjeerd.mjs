import {TeamGroup} from "../../domains/team/constants";
import {defineTeamMember} from "../../domains/team/define";

export default defineTeamMember({
    avatar: '/images/team/dijkstra-tjeerd.png',
    name: 'Tjeerd Dijkstra',
    team: TeamGroup.ABI,
    title: 'Postdoc',
});
