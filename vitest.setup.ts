import { vi } from 'vitest';

let feeds: any[] = [];
let articles: any[] = [];

vi.mock('./src/infrastructure/persistence/sqlite/database', () => ({
  prisma: {
    feed: {
      upsert: vi.fn(({ where, update, create }) => {
        const idx = feeds.findIndex(f => f.id === where.id);
        if (idx !== -1) {
          feeds[idx] = { ...feeds[idx], ...update };
          return feeds[idx];
        } else {
          feeds.push(create);
          return create;
        }
      }),
      findUnique: vi.fn(({ where }) => feeds.find(f => f.id === where.id) || null),
      findMany: vi.fn(() => feeds),
      // ...autres méthodes si besoin
    },
    article: {
      upsert: vi.fn(({ where, update, create }) => {
        const idx = articles.findIndex(a => a.id === where.id);
        if (idx !== -1) {
          articles[idx] = { ...articles[idx], ...update };
          return articles[idx];
        } else {
          articles.push(create);
          return create;
        }
      }),
      findMany: vi.fn(({ where }) => {
        if (where?.feedId) {
          return articles.filter(a => a.feedId === where.feedId);
        }
        return articles;
      }),
      findUnique: vi.fn(({ where }) => articles.find(a => a.id === where.id) || null),
      update: vi.fn(({ where, data }) => {
        const idx = articles.findIndex(a => a.id === where.id);
        if (idx !== -1) {
          articles[idx] = { ...articles[idx], ...data };
          return articles[idx];
        }
        return null;
      }),
      // ...autres méthodes si besoin
    },
    $connect: vi.fn(),
    $disconnect: vi.fn(),
  },
}));