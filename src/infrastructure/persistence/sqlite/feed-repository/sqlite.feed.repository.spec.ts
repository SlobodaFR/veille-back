import { Feed } from '@domain/feed';

import { SqliteFeedRepository } from './sqlite.feed.repository';

describe('SqliteFeedRepository', () => {
    const repo = new SqliteFeedRepository();
    const feedData = {
        id: '37756c03-e9d5-4fb8-a45e-09f41f931c9b',
        title: 'Test Feed',
        url: 'https://test.com/rss',
        fetchedAt: new Date(),
    };
    let feed: Feed;

    beforeEach(() => {
        feed = Feed.create(feedData);
    });

    it('should save a feed', async () => {
        await expect(repo.save(feed)).resolves.toBeUndefined();
    });

    it('should find a feed by id', async () => {
        await repo.save(feed);
        const found = await repo.findById(feed.id);
        expect(found).not.toBeNull();
        expect(found?.id).toBe(feed.id);
        expect(found?.title).toBe(feed.title);
    });

    it('should list feeds', async () => {
        await repo.save(feed);
        const feeds = await repo.list();
        expect(Array.isArray(feeds)).toBe(true);
        expect(feeds.length).toBeGreaterThan(0);
        expect(feeds[0].id).toBe(feed.id);
    });
});
