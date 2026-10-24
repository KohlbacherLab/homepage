/*
 * Copyright (c) 2026.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

export type ResearchArea = {
    /**
     * Must match the `##` heading on the research page.
     */
    title: string,

    summary: string,

    /**
     * FontAwesome classes.
     *
     * @example 'fa-solid fa-chart-column'
     */
    icon: string,

    /**
     * Heading anchor on /research, derived from the title.
     */
    anchor: string
};
