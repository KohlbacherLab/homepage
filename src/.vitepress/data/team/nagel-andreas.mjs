import {TeamGroup} from "../../domains/team/constants";
import {defineTeamMember} from "../../domains/team/define";

export default defineTeamMember({
    avatar: '/images/team/nagel-andreas.png',
    name: 'Andreas Nagel',
    title: 'Systemadministrator',
    team: TeamGroup.ABI,
    links: [],
});
