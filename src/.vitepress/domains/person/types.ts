/*
 * Copyright (c) 2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { HistoryEntry } from '../history/index.ts';

/**
 * Represents a social media or external profile link.
 */
export type SocialLink = {
    /**
     * The icon identifier for the social platform.
     *
     * @example 'github'
     * @example 'linkedin'
     */
    icon: string,

    /**
     * The URL to the social profile.
     */
    link: string,

    /**
     * Accessible label for screen readers.
     */
    ariaLabel?: string
};

/**
 * Represents a team member with their personal and professional information.
 */
export interface Person {
    /**
     * The full name of the person.
     *
     * @example 'Oliver Kohlbacher'
     */
    name: string,

    /**
     * The professional role of the person.
     *
     * @example 'Researcher'
     * @example 'Professor'
     */
    role?: string,

    /**
     * URL to the person's avatar image.
     * Can be absolute or relative.
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
     * The person's address.
     * Can be a string or an array of strings for multiple addresses.
     */
    address?: string | string[],

    /**
     * The person's email address.
     */
    email?: string,

    /**
     * The person's phone number.
     * Can be a string or an array for multiple phone numbers.
     */
    phone?: string | string[],

    /**
     * The team or teams the person is part of.
     *
     * @example 'tbi'
     * @example ['tbi', 'abi']
     */
    team: string | string[],

    /**
     * The person's educational background.
     */
    education?: HistoryEntry[],

    /**
     * Awards or recognitions the person has received.
     */
    awards?: HistoryEntry[],

    /**
     * A detailed biography of the person.
     */
    biography?: HistoryEntry[],

    /**
     * A list of the person's professional or personal interests.
     */
    interests?: string[],

    /**
     * URL to the person's sponsor page.
     */
    sponsor?: string,

    /**
     * Custom text for the sponsor action button.
     */
    actionText?: string
}
