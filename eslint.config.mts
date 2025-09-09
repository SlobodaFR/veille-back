
// ESLint v9 Flat Config
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import boundariesPlugin from 'eslint-plugin-boundaries';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
    {
        ignores: [
            'dist/**',
            'coverage/**',
            'node_modules/**',
            'generated',
        ],
    },
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: new URL('.', import.meta.url).pathname,
                sourceType: 'module',
            },
            globals: {
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
            '@typescript-eslint': tsPlugin,
            boundaries: boundariesPlugin,
            import: importPlugin,
            prettier: prettierPlugin,
        },
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/array-type': ['error', { default: 'generic' }],
            'prettier/prettier': 'warn',
            'import/no-relative-parent-imports': 'error',
        },
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
    },
];
