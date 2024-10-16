import { TeamID } from "../..";
import { definePerson } from "../..";

export default definePerson({
    avatar: 'https://www.github.com/Nightknight3000.png',
    name: 'Alexander Röhl',
    team: TeamID.ABI,
    title: 'PhD Student',
    links: [
        { icon: 'github', link: 'https://github.com/Nightknight3000' },
    ],
});
