import DefaultTheme from 'vitepress/theme';
import 'bootstrap/dist/css/bootstrap-grid.css';
import 'bootstrap/dist/css/bootstrap-reboot.css';
import 'bootstrap/dist/css/bootstrap-utilities.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@vuecs/pagination/style.css';
import './style.css';
import { install } from '@vuecs/pagination';

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.use(install);
    },
};
