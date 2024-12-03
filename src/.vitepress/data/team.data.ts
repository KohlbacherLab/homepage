/*
 * Copyright (c) 2024-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { Person } from '../domains';
import { readPersons } from '../domains';

declare const data: [string, Person][];
export { data };

export default {
    watch: ['./persons/*.mjs'],
    async load(files: string[]) {
        return readPersons(files);
    },
};
