import eslintConfig from '@tada5hi/eslint-config';

export default eslintConfig(
    { typescript: true, vue: true },
    {
        rules: {
            'class-methods-use-this': 'off',
            'no-shadow': 'off',
            'no-use-before-define': 'off',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            'import-x/extensions': 'off',
            'import-x/no-extraneous-dependencies': 'off',
        },
    },
    {
        // Vue components run in the browser; make the browser globals they
        // reference (e.g. `window`) known to `no-undef`.
        files: ['**/*.vue'],
        languageOptions: { globals: { window: 'readonly' } },
    },
    { ignores: ['src/.vitepress/cache/**', 'src/.vitepress/dist/**'] },
);
