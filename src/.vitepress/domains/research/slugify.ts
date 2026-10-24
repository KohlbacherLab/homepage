/*
 * Copyright (c) 2026.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

// Same algorithm VitePress uses for heading anchors (@mdit-vue/shared).
// eslint-disable-next-line no-control-regex
const CONTROL = /[\u0000-\u001F]/g;
const SPECIAL = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?/]+/g;
const COMBINING = /[\u0300-\u036F]/g;

export function slugify(value: string) : string {
    return value
        .normalize('NFKD')
        .replace(COMBINING, '')
        .replace(CONTROL, '')
        .replace(SPECIAL, '-')
        .replace(/-{2,}/g, '-')
        .replace(/^-+|-+$/g, '')
        .replace(/^(\d)/, '_$1')
        .toLowerCase();
}
