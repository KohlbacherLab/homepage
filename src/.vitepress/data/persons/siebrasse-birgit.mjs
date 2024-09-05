import {TeamID} from "../../domains/team/constants";
import {definePerson} from "../../domains/person/define";

export default definePerson({
    avatar: '/images/persons/siebrasse-birgit.png',
    name: 'Siebrasse Birgit',
    team: TeamID.TBI,
    title: 'Projektkoordinatorin BWHC & DNPM',
});
