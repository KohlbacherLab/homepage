/*
 * Copyright (c) 2026.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { Project } from './types.ts';

export function compareProjectsByStart(a: Project, b: Project) : number {
    return b.runtime.start.localeCompare(a.runtime.start);
}

export function isProjectRunning(project: Project, now: Date) : boolean {
    return now.getTime() <= new Date(`${project.runtime.end}T23:59:59.999`).getTime();
}

export function selectFeaturedProjects(projects: Project[], now: Date, limit = 4) : Project[] {
    return projects
        .filter((project) => project.featured && isProjectRunning(project, now))
        .sort(compareProjectsByStart)
        .slice(0, limit);
}
