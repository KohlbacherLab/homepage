import { TeamID } from "../..";
import { definePerson } from "../..";

export default definePerson({
    avatar: 'https://www.github.com/lucienclin.png',
    name: 'Lucien Clin',
    team: TeamID.TBI,
    role: 'Researcher',
    socialLinks: [
        { icon: 'github', link: 'https://github.com/lucienclin' },
    ],
});
