import { Feed } from './feed';

describe('Feed', () => {
    it('should create a Feed instance with provided fetchedAt', () => {
        const id = '1';
        const title = 'Test Feed';
        const url = 'http://example.com/feed';
        const fetchedAt = new Date('2024-01-01T00:00:00Z');

        const feed = Feed.create({ id, title, url, fetchedAt });

        expect(feed.id).toBe(id);
        expect(feed.title).toBe(title);
        expect(feed.url).toBe(url);
        expect(feed.fetchedAt).toBe(fetchedAt);
    });

    it('should create a Feed instance with current date as fetchedAt if not provided', () => {
        const id = '2';
        const title = 'Another Feed';
        const url = 'http://example.com/another-feed';

        const beforeCreation = new Date();
        const feed = Feed.create({ id, title, url });
        const afterCreation = new Date();

        expect(feed.id).toBe(id);
        expect(feed.title).toBe(title);
        expect(feed.url).toBe(url);
        expect(feed.fetchedAt.getTime()).toBeGreaterThanOrEqual(
            beforeCreation.getTime(),
        );
        expect(feed.fetchedAt.getTime()).toBeLessThanOrEqual(
            afterCreation.getTime(),
        );
    });

    it('should return a new Feed instance with updated fetchedAt', () => {
        const id = '3';
        const title = 'Update Feed';
        const url = 'http://example.com/update-feed';
        const initialFetchedAt = new Date('2024-01-01T00:00:00Z');
        const newFetchedAt = new Date('2024-02-01T00:00:00Z');

        const feed = Feed.create({
            id,
            title,
            url,
            fetchedAt: initialFetchedAt,
        });
        const updatedFeed = feed.withFetchedAt(newFetchedAt);

        expect(updatedFeed).not.toBe(feed);
        expect(updatedFeed.id).toBe(feed.id);
        expect(updatedFeed.title).toBe(feed.title);
        expect(updatedFeed.url).toBe(feed.url);
        expect(updatedFeed.fetchedAt).toBe(newFetchedAt);
        expect(feed.fetchedAt).toBe(initialFetchedAt);
    });
});
