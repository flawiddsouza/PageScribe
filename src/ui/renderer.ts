import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css';
import 'splitpanes/dist/splitpanes.css';
import './overrides.css';
import './index.css';

import { createApp } from 'vue';
import App from './App.vue';
import ContextMenu from '@imengyu/vue3-context-menu';

const app = createApp(App);

app.use(ContextMenu);

app.mount('#app');
