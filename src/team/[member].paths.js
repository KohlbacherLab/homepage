import { readPersons } from '../.vitepress/domains';

export default {
    async paths() {
        const items = await readPersons();

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
