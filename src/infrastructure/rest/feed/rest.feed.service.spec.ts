import { ListFeedsUseCase } from '@use-cases/list-feeds';
import { SubscribeToFeedUseCase } from '@use-cases/subscribe-to-feed';
import { Mock } from 'vitest';

import { Article } from '@domain/article';
import { Feed } from '@domain/feed';

import { RestFeedService } from '@rest/feed/rest.feed.service.ts';

let listFeedsUseCase: ListFeedsUseCase;
let subscribeToFeedUseCase: SubscribeToFeedUseCase;

let restFeedService: RestFeedService;
let fetchFeedUseCase: any;
let feedRepository: any;
let articleRepository: any;
let feedFetcherService: any;
let retrieveFeedArticlesUseCase: any;

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
        fetchFeedUseCase = { execute: vi.fn() };
        feedRepository = {};
        articleRepository = {};
        feedFetcherService = {};
        retrieveFeedArticlesUseCase = { execute: vi.fn() };

        restFeedService = new RestFeedService(
            listFeedsUseCase,
            subscribeToFeedUseCase,
            fetchFeedUseCase,
            feedRepository,
            articleRepository,
            feedFetcherService,
            retrieveFeedArticlesUseCase,
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
    describe('getFeedArticles', () => {
        it('should return articles for a feed', async () => {
            const feedId = '3f178b6d-dba8-4477-8010-ff752d2f926d';
            const mockArticles = [
                Article.create({
                    id: 'fd324bc9-a029-445e-9246-e06b7c15bfe6',
                    feedId,
                    title: 'Article 1',
                    url: 'https://example.com/a1',
                    content: 'Content 1',
                    publishedAt: new Date(),
                }),
            ];
            retrieveFeedArticlesUseCase.execute.mockResolvedValue(mockArticles);
            const articles = await restFeedService.getFeedArticles(feedId);
            expect(Array.isArray(articles)).toBe(true);
            expect(articles.length).toBe(1);
            expect(articles[0].feedId).toBe(feedId);
        });
    });
});
