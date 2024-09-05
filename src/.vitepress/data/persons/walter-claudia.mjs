import {TeamID} from "../../domains/team/constants";
import {definePerson} from "../../domains/person/define";

export default definePerson({
    avatar: '/images/persons/default.png',
    name: 'Claudia Walter',
    team: TeamID.ABI,
    title: 'Assistant',
    links: [],
});
