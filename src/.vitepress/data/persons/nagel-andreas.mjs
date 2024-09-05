import {TeamID} from "../../domains/team/constants";
import {definePerson} from "../../domains/person/define";

export default definePerson({
    avatar: '/images/persons/nagel-andreas.png',
    name: 'Andreas Nagel',
    title: 'Systemadministrator',
    team: TeamID.ABI,
    links: [],
});
