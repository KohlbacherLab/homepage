/*
 * Copyright (c) 2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

export type ContactDetails = {
    /**
     * The address. Can be a string or an array of strings for multiple addresses.
     */
    address?: string | string[],

    /**
     * The email address.
     */
    email?: string,

    /**
     * The phone number. Can be a string or an array for multiple phone numbers.
     */
    phone?: string | string[],

    /**
     * The fax number. Can be a string or an array for multiple phone numbers.
     */
    fax?: string | string[]
};
