/*
 * Copyright (c) 2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import {Person, readPersons} from "../../domains";

declare const data: [string, Person][];
export { data };

export default {
    async load() {
        return readPersons();
    },
};
