import {TeamID} from "../../domains/team/constants";
import {definePerson} from "../../domains/person/define";

export default definePerson({
    avatar: 'https://www.github.com/lucienclin.png',
    name: 'Lucien Clin',
    team: TeamID.TBI,
    title: 'Researcher',
    links: [
        { icon: 'github', link: 'https://github.com/lucienclin' },
    ],
});
