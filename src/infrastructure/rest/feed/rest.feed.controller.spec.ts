import { RestFeedController } from '@rest/feed/rest.feed.controller.ts';
import { RestFeedService } from '@rest/feed/rest.feed.service.ts';

let restFeedService: RestFeedService;
let restFeedController: RestFeedController;

describe('RestFeedController', () => {
    beforeEach(() => {
        restFeedService = {
            getFeeds: vi.fn().mockResolvedValue([
                { id: '1', title: 'Feed 1', url: 'http://example.com/feed1' },
                { id: '2', title: 'Feed 2', url: 'http://example.com/feed2' },
            ]),
            subscribeToFeed: vi.fn().mockResolvedValue({
                id: '1',
                title: 'Test Feed',
                url: 'http://example.com/feed',
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
            const url = 'http://example.com/feed';

            await restFeedController.subscribeToFeed({ title, url });

            expect(restFeedService.subscribeToFeed).toHaveBeenCalledWith(
                title,
                url,
            );
        });
    });
});
