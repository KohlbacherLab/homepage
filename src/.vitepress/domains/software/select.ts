/*
 * Copyright (c) 2026.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { Software } from './types.ts';

export function selectFeaturedSoftware(items: Software[], limit = 4) : Software[] {
    return items
        .filter((item) => item.featured)
        .sort((a, b) => a.title.localeCompare(b.title))
        .slice(0, limit);
}
