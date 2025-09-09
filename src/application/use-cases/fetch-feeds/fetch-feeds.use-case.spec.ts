import { Mock, vi } from 'vitest';

import { Article } from '@domain/article';
import { Feed } from '@domain/feed';

import { ArticleRepository } from '@ports/article.repository.ts';
import { FeedFetcherService } from '@ports/feed-fetcher.service.ts';
import { FeedRepository } from '@ports/feed.repository.ts';

import { FetchFeedsUseCase } from './fetch-feeds.use-case';

describe('FetchFeedsUseCase', () => {
    let fetchFeedsUseCase: FetchFeedsUseCase;
    let feedRepository: FeedRepository;
    let articleRepository: ArticleRepository;
    let feedFetcherService: FeedFetcherService;

    beforeEach(() => {
        feedRepository = {
            list: vi.fn().mockResolvedValue([]),
            save: vi.fn(),
            findById: vi.fn().mockResolvedValue(null),
        } as unknown as FeedRepository;
        articleRepository = {
            save: vi.fn(),
        } as unknown as ArticleRepository;
        feedFetcherService = {
            fetch: vi.fn().mockResolvedValue([]),
        } as unknown as FeedFetcherService;
        fetchFeedsUseCase = new FetchFeedsUseCase(
            feedRepository,
            articleRepository,
            feedFetcherService,
        );
    });

    it('should fetch feeds and save articles', async () => {
        const feeds = [
            Feed.create({
                id: '6abd98c9-4e82-41fd-9d89-08c2bf58d54e',
                title: 'Feed 1',
                url: 'https://example.com/feed1',
            }),
            Feed.create({
                id: '52c72929-60d7-4df3-a55c-ac2ce7823fbf',
                title: 'Feed 2',
                url: 'https://example.com/feed2',
            }),
        ];
        (feedRepository.list as Mock).mockResolvedValue(feeds);

        const articles = [
            Article.create({
                id: '6acfcf24-7d13-4234-9160-6c832db9afc4',
                title: 'Article 1',
                feedId: '6abd98c9-4e82-41fd-9d89-08c2bf58d54e',
                url: 'https://example.com/article1',
                content: 'Content 1',
                publishedAt: new Date(),
            }),
            Article.create({
                id: 'fe52d6fc-f65a-4ec9-8c39-b8676e32a3b2',
                title: 'Article 2',
                feedId: '6abd98c9-4e82-41fd-9d89-08c2bf58d54e',
                url: 'https://example.com/article2',
                content: 'Content 2',
                publishedAt: new Date(),
            }),
        ];
        (feedFetcherService.fetch as Mock).mockResolvedValue(articles);

        await fetchFeedsUseCase.execute();

        expect(feedRepository.list).toHaveBeenCalledTimes(1);
        expect(feedFetcherService.fetch).toHaveBeenCalledTimes(2);
        expect(articleRepository.save).toHaveBeenCalledTimes(4);
        expect(feedRepository.save).toHaveBeenCalledTimes(2);
    });

    it('should handle no feeds', async () => {
        await fetchFeedsUseCase.execute();

        expect(feedRepository.list).toHaveBeenCalledTimes(1);
        expect(feedFetcherService.fetch).not.toHaveBeenCalled();
        expect(articleRepository.save).not.toHaveBeenCalled();
        expect(feedRepository.save).not.toHaveBeenCalled();
    });
});
