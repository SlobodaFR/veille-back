import { type Config } from 'prettier'

const config: Config = {
    trailingComma: 'all',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    plugins: ['@ianvs/prettier-plugin-sort-imports'],
    importOrder: [
        '<TYPES>^(node:)',
        '<TYPES>',
        '<TYPES>^[.]',
        '',
        '<BUILTIN_MODULES>',
        '',
        '<THIRD_PARTY_MODULES>',
        '',
        '@domain/',
        '',
        '@application/',
        '',
        '@ports/',
        '',
        '@in-memory/',
        '@persistence/',
        '@rest/',
        '@thirds/',
        '',
        '^[.]',
    ],
    importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
    importOrderCaseSensitive: false,
}

export default config
