import { RestFeedController } from '@rest/feed/rest.feed.controller.ts';
import { RestFeedService } from '@rest/feed/rest.feed.service.ts';

let restFeedService: RestFeedService;
let restFeedController: RestFeedController;

describe('RestFeedController', () => {
    beforeEach(() => {
        restFeedService = {
            getFeeds: vi.fn().mockResolvedValue([
                { id: '1', title: 'Feed 1', url: 'https://example.com/feed1' },
                { id: '2', title: 'Feed 2', url: 'https://example.com/feed2' },
            ]),
            subscribeToFeed: vi.fn().mockResolvedValue({
                id: '1',
                title: 'Test Feed',
                url: 'https://example.com/feed',
            }),
        } as unknown as RestFeedService;

        restFeedController = new RestFeedController(restFeedService);
    });

    describe('getFeeds', () => {
        it('should return an array of FeedItemDto', async () => {
            await restFeedController.getFeeds();

            expect(restFeedService.getFeeds).toHaveBeenCalled();
        });
    });

    describe('subscribeToFeed', () => {
        it('should return a FeedItemDto', async () => {
            const title = 'Test Feed';
            const url = 'https://example.com/feed';

            await restFeedController.subscribeToFeed({ title, url });

            expect(restFeedService.subscribeToFeed).toHaveBeenCalledWith(
                title,
                url,
            );
        });
    });

    describe('getFeedArticles', () => {
        it('should return articles for a feed', async () => {
            const feedId = '3f178b6d-dba8-4477-8010-ff752d2f926d';
            (restFeedService.getFeedArticles as any) = vi
                .fn()
                .mockResolvedValue([
                    {
                        id: 'fd324bc9-a029-445e-9246-e06b7c15bfe6',
                        feedId,
                        title: 'Article 1',
                        url: 'https://example.com/a1',
                        content: 'Content 1',
                        publishedAt: new Date(),
                    },
                ]);
            const result = await restFeedController.getFeedArticles(feedId);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(1);
            expect(result[0].feedId).toBe(feedId);
            expect(restFeedService.getFeedArticles).toHaveBeenCalledWith(
                feedId,
            );
        });
    });
});
