import {TeamID} from "../../domains/team/constants";
import {definePerson} from "../../domains/person/define";

export default definePerson({
    avatar: '/images/persons/kuchenbecker-leon.png',
    name: 'Leon Kuchenbecker',
    title: 'Researcher',
    team: TeamID.ABI,
    links: [],
});
