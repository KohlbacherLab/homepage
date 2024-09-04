import fs from "fs";
import { load } from "locter";
import path from "node:path";
import {TEAM_DIRECTORY} from "../../constants";
import { TeamMember } from "./types";

export async function readTeamMembers() : Promise<[string, TeamMember][]> {
    const files = await fs.promises.readdir(TEAM_DIRECTORY);
    const members : [string, TeamMember][] =  [];
    for(let i=0; i<files.length; i++) {
        const slug = files[i].replace(/\.[^/.]+$/, "");
        let member = await readTeamMember(slug);

        members.push([slug, member]);
    }

    return members;
}

export async function readTeamMember(slug: string) : Promise<TeamMember> {
    const filePath = path.join(TEAM_DIRECTORY, slug + '.mjs');
    let member = await load(filePath);
    if(member.default) {
        member = member.default;
    }

    return member;
}
