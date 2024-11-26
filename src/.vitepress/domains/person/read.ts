/*
 * Copyright (c) 2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import fs from "fs";
import { load } from "locter";
import path from "node:path";
import {PERSON_DIRECTORY} from "../../constants";
import { Person } from "./types";

export async function readPersons(input?: string[]) : Promise<[string, Person][]> {
    let files: string[] = [];
    if (input) {
        files = input.map((el) => path.basename(el));
    } else {
        files = await fs.promises.readdir(PERSON_DIRECTORY);
    }

    const members : [string, Person][] =  [];
    for(let i=0; i<files.length; i++) {
        const slug = files[i].replace(/\.[^/.]+$/, "");
        let member = await readPerson(slug);

        members.push([slug, member]);
    }

    return members;
}

export async function readPerson(slug: string) : Promise<Person> {
    const filePath = path.join(PERSON_DIRECTORY, slug + '.mjs');
    let member = await load(filePath);
    if(member.default) {
        member = member.default;
    }

    return member;
}
