import {TeamID} from "../../domains/team/constants";
import {definePerson} from "../../domains/person/define";

export default definePerson({
    avatar: '/images/persons/wein-samuel.jpg',
    name: 'Samuel Wein',
    team: TeamID.ABI,
    title: 'PostDoc',
    links: [],
});
