/*
 * Copyright (c) 2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { HistoryEntry } from "../history";

export type SocialLink = {
    icon: string,
    link: string,
    ariaLabel?: strin
}

export interface Person {
    /**
     * The full name of the person.
     * e.g., Oliver Kohlbacher
     */
    name: string,

    /**
     * The professional role of the person.
     * e.g., Researcher, Professor, PhD, etc.
     */
    role?: string,

    /**
     * URL to the person's avatar image. Can be absolute or relative.
     */
    avatar?: string,

    /**
     * A short description or bio of the person.
     */
    description?: string,

    /**
     * A list of the person's social media links.
     */
    socialLinks?: SocialLink[],

    /**
     * The person's address. Can be a string or an array of strings for multiple addresses.
     */
    address?: string | string[],

    /**
     * The person's email address.
     */
    email?: string,

    /**
     * The person's phone number. Can be a string or an array for multiple phone numbers.
     */
    phone?: string | string[],

    /**
     * The team or teams the person is part of.
     * e.g., "tbi" or "abi"
     */
    team: string | string[],

    /**
     * The person's educational background, represented as an array of history entries.
     */
    education?: HistoryEntry[],

    /**
     * Awards or recognitions the person has received, represented as an array of history entries.
     */
    awards?: HistoryEntry[],

    /**
     * A detailed biography of the person, represented as an array of history entries.
     */
    biography?: HistoryEntry[],

    /**
     * A list of the person's professional or personal interests.
     */
    interests?: string[]
}
