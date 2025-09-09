import { describe } from 'vitest';

import { Feed } from '@domain/feed';

import { FeedRepository } from '@ports/feed.repository.ts';

import { InMemoryFeedRepository } from '@in-memory/feed-repository/in-memory.feed.repository.ts';

import { ListFeedsUseCase } from './list-feeds.use-case';

describe('ListFeedsUseCase', () => {
    let useCase: ListFeedsUseCase;
    let feedRepository: FeedRepository;

    beforeEach(() => {
        feedRepository = new InMemoryFeedRepository();
        useCase = new ListFeedsUseCase(feedRepository);
    });
    it('should list all feeds', async () => {
        const feeds = await useCase.execute();
        expect(Array.isArray(feeds)).toBe(true);
        expect(feeds.length).toBe(0);

        await feedRepository.save(
            Feed.create({
                id: 'fd324bc9-a029-445e-9246-e06b7c15bfe6',
                title: 'Test Feed',
                url: 'https://example.com/rss',
                fetchedAt: new Date(),
            }),
        );
        const updatedFeeds = await useCase.execute();
        expect(updatedFeeds.length).toBe(1);
        expect(updatedFeeds[0].title).toBe('Test Feed');
    });
});
