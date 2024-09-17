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
    education: [
        {
            year: [2002, 2006],
            value: 'Grundschule Pliezhausen'
        },
        {
            year: [2007, 2015],
            value: 'Gymansium Bildungszentrum Reutlingen-Nord'
        },
        {
            year: [2016, 2020],
            value: 'Eberhard Karls University Tübingen'
        },
        {
            year: [2020, 2024],
            value: 'Eberhard Karls University Tübingen'
        },
    ],
});
