/*
 * Copyright (c) 2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import fs from 'fs';

declare const data: string;
export { data };

export default {
    async load() {
        return fs.promises.readFile('src/.vitepress/data/publications/pub.bib', { encoding: 'utf8' });
    },
};
