import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import stylisticTs from '@stylistic/eslint-plugin-ts';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    plugins: {
      '@stylistic/ts': stylisticTs
    }
  },
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    ignores: [
      '.vite',
      'out',
      'plugins/scribe-renderer/dist',
      'plugins/table-renderer/dist',
    ]
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: ['.vue'],
      },
    },
  },
  ...pluginVue.configs['flat/recommended'],
  { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      '@stylistic/ts/indent': ['error', 2],
      '@stylistic/ts/quotes': ['error', 'single'],
      '@stylistic/ts/semi': ['error', 'always'],
      // '@typescript-eslint/no-floating-promises': 'error',
      '@stylistic/ts/function-call-spacing': ['error', 'never'],
    }
  }
];
