import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: ['src/**/*.spec.ts'],
        setupFiles: ['./vitest.setup.ts'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html', 'lcov'],
            include: ['src/**/*.ts'],
            exclude: [
                'src/**/*.spec.ts',
                'src/**/index.ts',
                'src/**/*.module.ts',
                'src/ports/*',
                'src/infrastructure/rest/server.ts',
                'src/infrastructure/persistence/sqlite/database.ts',
            ],
        },
    },
    resolve: {
        alias: {
            '@ports': '/src/ports',
            '@use-cases': '/src/application/use-cases',
            '@domain': '/src/domain',
            '@in-memory': '/src/infrastructure/in-memory',
            '@persistence': '/src/infrastructure/persistence',
            '@rest': '/src/infrastructure/rest',
            '@thirds': '/src/infrastructure/thirds',
        },
    },
});
