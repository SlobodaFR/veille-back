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
                id: '1',
                title: 'Feed 1',
                url: 'http://example.com/feed1',
            }),
            Feed.create({
                id: '2',
                title: 'Feed 2',
                url: 'http://example.com/feed2',
            }),
        ];
        (feedRepository.list as Mock).mockResolvedValue(feeds);

        const articles = [
            Article.create({
                id: 'a1',
                title: 'Article 1',
                feedId: '1',
                url: 'http://example.com/article1',
                content: 'Content 1',
                publishedAt: new Date(),
            }),
            Article.create({
                id: 'a2',
                title: 'Article 2',
                feedId: '1',
                url: 'http://example.com/article2',
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
