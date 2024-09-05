import {TeamID} from "../../domains/team/constants";
import {definePerson} from "../../domains/person/define";

export default definePerson({
    avatar: 'https://www.github.com/antidodo.png',
    name: 'David Hieber',
    title: 'Researcher',
    team: TeamID.TBI,
    links: [
        { icon: 'github', link: 'https://github.com/antidodo' },
    ],
});
