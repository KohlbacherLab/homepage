/*
 * Copyright (c) 2026.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { Entry } from '@retorquere/bibtex-parser';

const PUBMED_KEY = /pmid(\d+)/;

/**
 * Link target for a publication: PubMed for `pmid…` keys, otherwise the `url` field.
 */
export function getPublicationLink(entry: Entry) : string | undefined {
    const match = entry.key.match(PUBMED_KEY);
    if (match && match[1]) {
        return `https://pubmed.ncbi.nlm.nih.gov/${match[1]}`;
    }

    if ('url' in entry.fields && typeof entry.fields.url === 'string') {
        return entry.fields.url;
    }

    return undefined;
}
