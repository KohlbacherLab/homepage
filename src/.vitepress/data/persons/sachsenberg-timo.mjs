import {TeamID} from "../../domains/team/constants";
import {definePerson} from "../../domains/person/define";

export default definePerson({
    avatar: '/images/persons/sachsenberg-timo.png',
    name: 'Timo Sachsenberg',
    team: TeamID.ABI,
    title: 'Postdoc',
});
