import {TeamID} from "../../domains/team/constants";
import {definePerson} from "../../domains/person/define";

export default definePerson({
    avatar: '/images/persons/sueruen-bilge.png',
    name: 'Bilge Sueruen',
    team: TeamID.ABI,
    title: 'PhD Student',
    links: [],
});
