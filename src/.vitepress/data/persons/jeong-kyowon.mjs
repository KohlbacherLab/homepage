import {TeamID} from "../../domains/team/constants";
import {definePerson} from "../../domains/person/define";

export default definePerson({
    avatar: '/images/persons/jeong-kyowon.png',
    name: 'Kyowon Jeong',
    title: 'Postdoc',
    team: TeamID.ABI,
    links: [],
});
