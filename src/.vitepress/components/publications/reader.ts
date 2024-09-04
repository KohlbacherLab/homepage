// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import data from '../../../writable/pub.bib' assert {type: 'string'};

export function getPublications() {
    return data;
}
