import { TeamID } from "../..";
import { definePerson } from "../..";

export default definePerson({
    avatar: 'https://www.github.com/antidodo.png',
    name: 'David Hieber',
    title: 'Researcher',
    team: TeamID.TBI,
    links: [
        { icon: 'github', link: 'https://github.com/antidodo' },
    ],
});
