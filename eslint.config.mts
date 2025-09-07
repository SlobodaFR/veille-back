import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: { globals: globals.node },
    },
    {
        files: ['**/*.{ts,tsx,mts,cts}'],
        plugins: { '@typescript-eslint': tseslint.plugin },
        extends: [tseslint.configs.recommended],
        languageOptions: { globals: globals.node },
    },
])
