import {TeamID} from "../../domains/team/constants";
import {definePerson} from "../../domains/person/define";

export default definePerson({
    avatar: '/images/persons/elhabashi-hadeer.png',
    name: 'Hadeer Elhabashy',
    team: TeamID.ABI,
    title: 'Postdoc',
    links: [],
});
