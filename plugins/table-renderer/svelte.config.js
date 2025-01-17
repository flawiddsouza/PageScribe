import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  onwarn: (warning, handler) => {
    // suppress warnings on `vite dev` and `vite build`; but even without this, things still work
    if (warning.code === 'a11y_click_events_have_key_events') return;
    if (warning.code === 'a11y_no_static_element_interactions') return;
    if (warning.code === 'a11y_no_noninteractive_element_interactions') return;
    if (warning.code === 'a11y_no_noninteractive_tabindex') return;
    handler(warning);
  },
};
