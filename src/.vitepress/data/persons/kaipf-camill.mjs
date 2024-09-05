import {TeamID} from "../../domains/team/constants";
import {definePerson} from "../../domains/person/define";

export default definePerson({
    avatar: '/images/persons/kaipf-camill.jpg',
    name: 'Camill Kaipf',
    team: TeamID.ABI,
    title: 'Researcher',
    links: [],
});
