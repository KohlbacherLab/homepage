import { readTeamMembers } from "../../domains/team";

declare const data: string;
export { data };

export default {
    async load() {
        return readTeamMembers();
    },
};
