import {TeamGroup} from "../../domains/team/constants";
import {defineTeamMember} from "../../domains/team/define";

export default defineTeamMember({
    avatar: 'https://www.github.com/Nightknight3000.png',
    name: 'Alexander Röhl',
    team: TeamGroup.ABI,
    title: 'PhD Student',
    links: [
        { icon: 'github', link: 'https://github.com/Nightknight3000' },
    ],
});
