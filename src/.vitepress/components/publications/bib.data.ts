import fs from 'fs';

declare const data: string;
export { data };

export default {
    async load() {
        return fs.promises.readFile('writable/pub.bib', { encoding: 'utf8' });
    },
};
