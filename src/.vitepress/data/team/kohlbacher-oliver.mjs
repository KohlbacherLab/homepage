import {TeamGroup} from "../../domains/team/constants";
import {defineTeamMember} from "../../domains/team/define";

export default defineTeamMember({
    avatar: 'https://www.github.com/okohlbacher.png',
    name: 'Oliver Kohlbacher',
    title: 'Professor & Lead',
    team: [TeamGroup.ABI, TeamGroup.TBI],
    links: [
        { icon: 'github', link: 'https://github.com/okohlbacher' },
    ],
});
