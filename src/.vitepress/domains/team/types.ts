/*
 * Copyright (c) 2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import {DefaultTheme} from 'vitepress/types/default-theme';
import {HistoryEntry} from "../history";

export interface TeamMember extends DefaultTheme.TeamMember {
    // Team (ABI, TBI, ...)
    team: string | string[],

    education?: HistoryEntry[],

    awards?: HistoryEntry[],

    biography?: HistoryEntry[]
}
