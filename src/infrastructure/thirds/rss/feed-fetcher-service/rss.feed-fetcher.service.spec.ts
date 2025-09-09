import { Feed } from '@domain/feed';

import { RssFeedFetcherService } from '@thirds/rss/feed-fetcher-service/rss.feed-fetcher.service.ts';

describe('RssFeedFetcherService', () => {
    let rssFeedFetcherService: RssFeedFetcherService;
    beforeEach(() => {
        rssFeedFetcherService = new RssFeedFetcherService();
    });

    it('should fetch and parse RSS feed', async () => {
        const feed: Feed = Feed.create({
            id: 'fd324bc9-a029-445e-9246-e06b7c15bfe6',
            title: 'Test Feed',
            url: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
        });

        const articles = await rssFeedFetcherService.fetch(feed);

        expect(articles.length).toBeGreaterThan(0);
        expect(articles[0]).toHaveProperty('id');
        expect(articles[0]).toHaveProperty('feedId', feed.id);
        expect(articles[0]).toHaveProperty('title');
        expect(articles[0]).toHaveProperty('url');
        expect(articles[0]).toHaveProperty('content');
        expect(articles[0]).toHaveProperty('publishedAt');
        expect(articles[0]).toHaveProperty('read', false);
    });
});
