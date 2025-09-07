import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import parserTs from '@typescript-eslint/parser';
import ESLintBoundaries from 'eslint-plugin-boundaries';
import ESLintImport from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    {
        settings: {
            boundaries: {
                elements: [
                    { type: 'domain', pattern: 'src/domain/*' },
                    { type: 'application', pattern: 'src/application/*' },
                    { type: 'ports', pattern: 'src/ports/*' },
                    { type: 'infrastructure', pattern: 'src/infrastructure/*' },
                ],
            },
        },
        plugins: {
        },
    },
    {
        ignores: [
            'dist/**',
            'config/**',
            'coverage/**',
            'requests/**',
            'apps-script-gsheet/**',
            'node_modules/**',
        ],
    },
    {
        files: ['./src/**/*.ts'],
        languageOptions: {
            parser: parserTs,
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: new URL('.', import.meta.url).pathname,
                sourceType: 'module',
            },
            globals: {
                // Node + Vitest
                process: 'readonly',
                module: 'readonly',
                require: 'readonly',
                vi: 'readonly',
                describe: 'readonly',
                test: 'readonly',
                expect: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': eslintPluginTs,
            prettier: prettierPlugin,
            import: ESLintImport,
            boundaries: ESLintBoundaries,
        },
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/array-type': ['error', { default: 'generic' }],
            'prettier/prettier': 'warn',
            'import/no-relative-parent-imports': 'error',
        },
    },
];
