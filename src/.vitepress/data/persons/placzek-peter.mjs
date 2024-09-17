import { TeamID } from "../../domains";
import { definePerson } from "../../domains";

export default definePerson({
    avatar: 'https://www.github.com/tada5hi.png',
    name: 'Peter Placzek',
    team: TeamID.TBI,
    title: 'Researcher',
    links: [
        { icon: 'github', link: 'https://github.com/tada5hi' },
        { icon: 'twitter', link: 'https://twitter.com/tada5hi' },
        { icon: 'linkedin', link: 'https://www.linkedin.com/in/peter-placzek-047a74210/' },
    ],
});
