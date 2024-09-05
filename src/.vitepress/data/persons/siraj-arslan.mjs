import { TeamID } from "../../domains/team/constants";
import { definePerson } from "../../domains/person/define";

export default definePerson({
    avatar: '/images/persons/default.png',
    name: 'Arslan Siraj',
    team: TeamID.ABI,
    title: 'PhD Student',
    links: [],
});
