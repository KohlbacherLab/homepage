import {TeamID} from "../../domains/team/constants";
import {definePerson} from "../../domains/person/define";

export default definePerson({
    avatar: '/images/persons/dijkstra-tjeerd.png',
    name: 'Tjeerd Dijkstra',
    team: TeamID.ABI,
    title: 'Postdoc',
});
