/*
 * Copyright (c) 2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import fs from 'node:fs';
import path from 'node:path';
import { readAsModule } from 'locter';
import { PERSON_DIRECTORY } from '../../constants.ts';
import type { Person } from './types.ts';

export async function readPerson(slug: string) : Promise<Person> {
    const filePath = path.join(PERSON_DIRECTORY, `${slug}.mjs`);
    const module = await readAsModule(filePath);

    return module.default;
}

export async function readPersons(input?: string[]) : Promise<[string, Person][]> {
    const files = input ?
        input.map((el) => path.basename(el)) :
        await fs.promises.readdir(PERSON_DIRECTORY);

    const members : [string, Person][] = [];
    for (const file of files) {
        const slug = file.replace(/\.[^/.]+$/, '');
        const member = await readPerson(slug);

        members.push([slug, member]);
    }

    return members;
}
