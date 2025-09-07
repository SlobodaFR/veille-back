import eslintPluginTs from '@typescript-eslint/eslint-plugin'
import parserTs from '@typescript-eslint/parser'
import prettierPlugin from 'eslint-plugin-prettier'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
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
        },
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/array-type': ['error', { default: 'generic' }],
            'prettier/prettier': 'warn',
            'import/no-relative-parent-imports': 'error',
            'boundaries/element-types': [
                2,
                {
                    default: 'disallow',
                    rules: [
                        { from: 'domain', allow: [] },
                        { from: 'application', allow: ['domain', 'ports'] },
                        { from: 'ports', allow: ['domain'] },
                        {
                            from: 'infrastructure',
                            allow: ['application', 'domain', 'ports'],
                        },
                    ],
                },
            ],
        },
    },
]
