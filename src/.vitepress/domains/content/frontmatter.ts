/*
 * Copyright (c) 2026.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

export type Frontmatter = Record<string, unknown>;

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function isObject(value: unknown) : value is Frontmatter {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function readString(input: Frontmatter, key: string, source: string) : string {
    const value = input[key];
    if (typeof value !== 'string' || value.trim().length === 0) {
        throw new Error(`${source}: frontmatter "${key}" must be a non-empty string.`);
    }

    return value.trim();
}

export function readOptionalString(input: Frontmatter, key: string, source: string) : string | undefined {
    if (typeof input[key] === 'undefined' || input[key] === null) {
        return undefined;
    }

    return readString(input, key, source);
}

export function readDate(input: Frontmatter, key: string, source: string) : string {
    const value = input[key];
    if (typeof value !== 'string' || !ISO_DATE.test(value)) {
        throw new Error(`${source}: frontmatter "${key}" must be a quoted date string like '2024-01-31'.`);
    }

    return value;
}

export function readObject(input: Frontmatter, key: string, source: string) : Frontmatter {
    const value = input[key];
    if (!isObject(value)) {
        throw new Error(`${source}: frontmatter "${key}" must be an object.`);
    }

    return value;
}

export function readList(input: Frontmatter, key: string, source: string) : Frontmatter[] {
    const value = input[key];
    if (!Array.isArray(value) || value.length === 0) {
        throw new Error(`${source}: frontmatter "${key}" must be a non-empty list.`);
    }

    return value.map((item, index) => {
        if (!isObject(item)) {
            throw new Error(`${source}: frontmatter "${key}[${index}]" must be an object.`);
        }

        return item;
    });
}
