import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: ['node_modules/', 'dist/', 'src/**/*.spec.ts'],
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
