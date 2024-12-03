import DefaultTheme from 'vitepress/theme';
import 'bootstrap/dist/css/bootstrap-grid.css';
import 'bootstrap/dist/css/bootstrap-reboot.css';
import 'bootstrap/dist/css/bootstrap-utilities.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@vuecs/pagination/dist/index.css';
import './style.css';
import { applyStoreManagerOptions, installStoreManager } from '@vuecs/pagination/core';
import { install } from '@vuecs/pagination';

import fontAwesome from '@vuecs/preset-font-awesome';

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        const storeManagerOptions = {
            presets: {
                fontAwesome,
            },
            defaults: {
                pagination: {
                    class: 'pagination',
                    itemClass: 'page-item',
                },
            },
        };

        const storeManager = installStoreManager(app);
        applyStoreManagerOptions(storeManager, storeManagerOptions);

        app.use(install);
    },
};
