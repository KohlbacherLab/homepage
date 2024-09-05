import {TeamID} from "../../domains/team/constants";
import {definePerson} from "../../domains/person/define";

export default definePerson({
    avatar: '/images/persons/default.png',
    name: 'Aydin Can Polatkan',
    team: TeamID.TBI,
    title: 'PostDoc',
    links: [],
});
