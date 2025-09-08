import { describe } from 'vitest';

import { InMemoryFeedRepository } from '@in-memory/feed-repository/in-memory.feed.repository.ts';

import { SubscribeToFeedUseCase } from './subscribe-to-feed.use-case';

describe('SubscribeToFeedUseCase', () => {
    let useCase: SubscribeToFeedUseCase;

    beforeEach(() => {
        useCase = new SubscribeToFeedUseCase(new InMemoryFeedRepository());
    });
    it('should subscribe to a new feed', async () => {
        const url = 'http://example.com/rss';
        const title = 'Example Feed';
        const feed = await useCase.execute(url, title);
        expect(feed.url).toBe(url);
        expect(feed.title).toBe(title);
        expect(feed.id).toBeDefined();
    });
});
