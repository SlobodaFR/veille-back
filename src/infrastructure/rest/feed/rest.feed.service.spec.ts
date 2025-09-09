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
                    id: 'fd324bc9-a029-445e-9246-e06b7c15bfe6',
                    title: 'Feed Title',
                    url: 'https://example.com/feed',
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
            const url = 'https://example.com/new-feed';
            const mockFeed = Feed.create({
                id: '3f178b6d-dba8-4477-8010-ff752d2f926d',
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
