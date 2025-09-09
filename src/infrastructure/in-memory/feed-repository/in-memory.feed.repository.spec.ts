import { Feed } from '@domain/feed';

import { InMemoryFeedRepository } from '@in-memory/feed-repository/in-memory.feed.repository.ts';

describe('InMemoryFeedRepository', () => {
    let repository: InMemoryFeedRepository;

    beforeEach(() => {
        repository = new InMemoryFeedRepository();
    });

    it('should save and retrieve a feed by id', async () => {
        const feed = {
            id: 'fd324bc9-a029-445e-9246-e06b7c15bfe6',
            url: 'https://example.com/rss',
            title: 'Example Feed',
        } as unknown as Feed;
        await repository.save(feed);
        const retrievedFeed = await repository.findById(
            'fd324bc9-a029-445e-9246-e06b7c15bfe6',
        );
        expect(retrievedFeed).toEqual(feed);
    });

    it('should return null for a non-existent feed id', async () => {
        const retrievedFeed = await repository.findById('non-existent-id');
        expect(retrievedFeed).toBeNull();
    });

    it('should list all saved feeds', async () => {
        const feed1 = {
            id: 'fd324bc9-a029-445e-9246-e06b7c15bfe6',
            url: 'https://example.com/rss1',
            title: 'Example Feed 1',
        } as unknown as Feed;
        const feed2 = {
            id: '52c72929-60d7-4df3-a55c-ac2ce7823fbf',
            url: 'https://example.com/rss2',
            title: 'Example Feed 2',
        } as unknown as Feed;
        await repository.save(feed1);
        await repository.save(feed2);
        const feeds = await repository.list();
        expect(feeds).toHaveLength(2);
        expect(feeds).toContainEqual(feed1);
        expect(feeds).toContainEqual(feed2);
    });
});
