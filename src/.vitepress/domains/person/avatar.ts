/*
 * Copyright (c) 2026.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { Person } from './types.ts';

export const DEFAULT_AVATAR = '/images/persons/default.png';

export function getPersonAvatar(person: Person) : string {
    return person.avatar && person.avatar.length > 0 ?
        person.avatar :
        DEFAULT_AVATAR;
}
