/*
 * Copyright (c) 2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import fs from 'node:fs';
import path from 'node:path';
import { load } from 'locter';
import { PERSON_DIRECTORY } from '../../constants';
import type { Person } from './types';

export async function readPerson(slug: string) : Promise<Person> {
    const filePath = path.join(PERSON_DIRECTORY, `${slug}.mjs`);
    let member = await load(filePath);
    if (member.default) {
        member = member.default;
    }

    return member;
}

export async function readPersons(input?: string[]) : Promise<[string, Person][]> {
    let files: string[] = [];
    if (input) {
        files = input.map((el) => path.basename(el));
    } else {
        files = await fs.promises.readdir(PERSON_DIRECTORY);
    }

    const members : [string, Person][] = [];
    for (const file of files) {
        const slug = file.replace(/\.[^/.]+$/, '');
        const member = await readPerson(slug);

        members.push([slug, member]);
    }

    return members;
}
