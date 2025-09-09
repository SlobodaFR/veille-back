import { ListFeedsUseCase } from '@use-cases/list-feeds';
import { SubscribeToFeedUseCase } from '@use-cases/subscribe-to-feed';
import { Mock } from 'vitest';

import { Feed } from '@domain/feed';

import { RestFeedService } from '@rest/feed/rest.feed.service.ts';

let listFeedsUseCase: ListFeedsUseCase;
let subscribeToFeedUseCase: SubscribeToFeedUseCase;

let restFeedService: RestFeedService;

describe('RestFeedService', () => {
    beforeEach(() => {
        listFeedsUseCase = {
            execute: vi.fn().mockResolvedValue([
                Feed.create({
                    id: 'feed-id',
                    title: 'Feed Title',
                    url: 'http://example.com/feed',
                    fetchedAt: new Date(),
                }),
            ]),
        } as unknown as ListFeedsUseCase;
        subscribeToFeedUseCase = {
            execute: vi.fn(),
        } as unknown as SubscribeToFeedUseCase;

        restFeedService = new RestFeedService(
            listFeedsUseCase,
            subscribeToFeedUseCase,
        );
    });

    describe('getFeeds', () => {
        it('should return an array of feeds', async () => {
            const result = await restFeedService.getFeeds();

            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(1);
        });
    });
    describe('subscribeToFeed', () => {
        it('should subscribe to a new feed and return the feed', async () => {
            const title = 'New Feed';
            const url = 'http://example.com/new-feed';
            const mockFeed = Feed.create({
                id: 'new-feed-id',
                title,
                url,
                fetchedAt: new Date(),
            });
            (subscribeToFeedUseCase.execute as Mock).mockResolvedValue(
                mockFeed,
            );
            const result = await restFeedService.subscribeToFeed(title, url);

            expect(result).toEqual(mockFeed);
            expect(subscribeToFeedUseCase.execute).toHaveBeenCalledWith(
                url,
                title,
            );
        });
    });
});
