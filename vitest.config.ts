import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: ['src/**/*.ts'],
            exclude: ['src/**/*.spec.ts', 'src/**/index.ts'],
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
