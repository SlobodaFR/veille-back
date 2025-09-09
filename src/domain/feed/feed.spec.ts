import { Feed } from './feed';

describe('Feed', () => {
    it('should create a Feed instance with provided fetchedAt', () => {
        const id = 'd3b00de3-5c03-4878-9360-912065587fbb';
        const title = 'Test Feed';
        const url = 'https://example.com/feed';
        const fetchedAt = new Date('2024-01-01T00:00:00Z');

        const feed = Feed.create({ id, title, url, fetchedAt });

        expect(feed.id).toBe(id);
        expect(feed.title).toBe(title);
        expect(feed.url).toBe(url);
        expect(feed.fetchedAt).toBe(fetchedAt);
    });

    it('should create a Feed instance with current date as fetchedAt if not provided', () => {
        const id = 'e2430fe5-6341-42cf-8a08-10917149b05f';
        const title = 'Another Feed';
        const url = 'https://example.com/another-feed';

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
        const id = '0500824e-3d9f-46a0-a275-ae9afe7f174e';
        const title = 'Update Feed';
        const url = 'https://example.com/update-feed';
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
