import vuecs from '@vuecs/core';
import pagination from '@vuecs/pagination';
import tailwind from '@vuecs/theme-tailwind';
import DefaultTheme from 'vitepress/theme';
import '@fortawesome/fontawesome-free/css/all.css';
import KProjectMeta from '../components/project/KProjectMeta.vue';
import './style.css';

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        // Used in src/projects/*.md, so lab members don't need a script block.
        app.component('KProjectMeta', KProjectMeta);

        app.use(vuecs, {
            themes: [tailwind()],
            overrides: {
                elements: {
                    pagination: {
                        defaultVariants: {
                            variant: 'soft',
                            size: 'sm',
                        },
                    },
                },
            },
        });
        app.use(pagination);
    },
};
