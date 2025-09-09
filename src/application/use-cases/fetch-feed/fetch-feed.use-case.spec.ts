import { FetchFeedUseCase } from '@use-cases/fetch-feed/fetch-feed.use-case.ts';
import { Mock } from 'vitest';

import { Article } from '@domain/article';
import { Feed } from '@domain/feed';

import { ArticleRepository } from '@ports/article.repository.ts';
import { FeedFetcherService } from '@ports/feed-fetcher.service.ts';
import { FeedRepository } from '@ports/feed.repository.ts';

describe('FetchFeedUseCase', () => {
    let useCase: FetchFeedUseCase;
    let feedRepository: FeedRepository;
    let articleRepository: ArticleRepository;
    let feedFetcherService: FeedFetcherService;

    beforeEach(() => {
        feedRepository = {
            findById: vi.fn().mockResolvedValue(
                Feed.create({
                    id: 'fde593f5-789d-4cd5-9323-7e806408c47a',
                    title: 'Feed 1',
                    url: 'http://example.com/feed1',
                }),
            ),
            save: vi.fn(),
        } as unknown as FeedRepository;
        articleRepository = {
            save: vi.fn(),
        } as unknown as ArticleRepository;
        feedFetcherService = {
            fetch: vi.fn().mockResolvedValue([
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
            ]),
        } as unknown as FeedFetcherService;

        useCase = new FetchFeedUseCase(
            feedRepository,
            articleRepository,
            feedFetcherService,
        );
    });

    it('should fetch feed and save articles', async () => {
        await feedRepository.save(
            Feed.create({
                id: 'fde593f5-789d-4cd5-9323-7e806408c47a',
                title: 'Feed 1',
                url: 'http://example.com/feed1',
            }),
        );
        await feedRepository.save(
            Feed.create({
                id: '52c72929-60d7-4df3-a55c-ac2ce7823fbf',
                title: 'Feed 2',
                url: 'http://example.com/feed2',
            }),
        );
        await articleRepository.save(
            Article.create({
                id: 'a1',
                title: 'Article 1',
                feedId: '1',
                url: 'http://example.com/article1',
                content: 'Content 1',
                publishedAt: new Date(),
            }),
        );
        await articleRepository.save(
            Article.create({
                id: 'a2',
                title: 'Article 2',
                feedId: '1',
                url: 'http://example.com/article2',
                content: 'Content 2',
                publishedAt: new Date(),
            }),
        );
        await articleRepository.save(
            Article.create({
                id: 'b1',
                title: 'Article 3',
                feedId: '2',
                url: 'http://example.com/article3',
                content: 'Content 3',
                publishedAt: new Date(),
            }),
        );

        vi.clearAllMocks();
        await useCase.execute('1');

        expect(feedRepository.findById).toHaveBeenCalledTimes(1);
        expect(feedFetcherService.fetch).toHaveBeenCalledTimes(1);
        expect(articleRepository.save).toHaveBeenCalledTimes(2);
        expect(feedRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should handle no feeds', async () => {
        (feedRepository.findById as Mock).mockResolvedValue(null);

        await useCase.execute('1');

        expect(feedRepository.findById).toHaveBeenCalledTimes(1);
        expect(feedFetcherService.fetch).not.toHaveBeenCalled();
        expect(articleRepository.save).not.toHaveBeenCalled();
        expect(feedRepository.save).not.toHaveBeenCalled();
    });
});
