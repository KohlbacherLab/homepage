import { readPersons } from '../.vitepress/domains';

export default {
    async paths() {
        const items = await readPersons();

        const paths = [];

        for (const item of items) {
            paths.push({
                params: {
                    member: item[0],
                },
            });
        }

        return paths;
    },
};
