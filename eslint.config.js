import eslintConfig from '@tada5hi/eslint-config';

export default eslintConfig(
    { typescript: true, vue: true },
    {
        rules: {
            'class-methods-use-this': 'off',
            'no-shadow': 'off',
            'no-use-before-define': 'off',
            '@typescript-eslint/no-unused-vars': ['error', {
                argsIgnorePattern: '^_',
            }],
        },
    },
    {
        ignores: ['dist/**'],
    },
);
