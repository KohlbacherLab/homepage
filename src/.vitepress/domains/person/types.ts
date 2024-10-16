/*
 * Copyright (c) 2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { DefaultTheme } from 'vitepress/types/default-theme';
import { HistoryEntry } from "../history";

export interface Person {
    name: string,

    /**
     * e.g. Researcher, Professor, PhD, ...
     */
    role?: string,

    avatar?: string,

    description?: string,

    socialLinks?: DefaultTheme.SocialLink[],

    address?: string | string[],

    email?: string,

    phone?: string | string[],

    /**
     * enum: TBI | ABI
     */
    team: string | string[],

    education?: HistoryEntry[],

    awards?: HistoryEntry[],

    biography?: HistoryEntry[],

    interests?: string[]
}
