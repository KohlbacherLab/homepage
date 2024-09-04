import { readTeamMembers } from '../.vitepress/domains/team';

export default {
    async paths() {
        const items = await readTeamMembers();

        const paths = [];

        for (let i = 0; i < items.length; i++) {
            paths.push({
                params: {
                    member: items[i][0],
                },
            });
        }

        return paths;
    },
};
