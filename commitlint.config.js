module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'header-max-length': [0, 'always', 1000],
        'body-max-line-length': [0, 'always', Infinity],
        'footer-max-line-length': [0, 'always', Infinity],
        'type-enum': [
            2,
            'always',
            [
                'feat',
                'fix',
                'docs',
                'chore',
                'style',
                'refactor',
                'ci',
                'test',
                'revert',
                'perf',
            ],
        ],
    },
}
