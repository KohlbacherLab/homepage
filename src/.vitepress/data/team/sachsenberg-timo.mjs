import {TeamGroup} from "../../domains/team/constants";
import {defineTeamMember} from "../../domains/team/define";

export default defineTeamMember({
    avatar: '/images/team/sachsenberg-timo.png',
    name: 'Timo Sachsenberg',
    team: TeamGroup.ABI,
    title: 'Postdoc',
});
