import { Feed } from '@domain/feed';

import { ArticleRepository } from '@ports/article.repository.ts';
import { FeedFetcherService } from '@ports/feed-fetcher.service.ts';
import { FeedRepository } from '@ports/feed.repository.ts';

import { FetchFeedsUseCase } from './fetch-feeds.use-case';

describe('FetchFeedsUseCase', () => {
    let fetchFeedsUseCase: FetchFeedsUseCase;
    let feedRepository: any;
    let articleRepository: any;
    let feedFetcherService: any;

    beforeEach(() => {
        feedRepository = {
            list: vi.fn(),
            save: vi.fn(),
        } as unknown as FeedRepository;
        articleRepository = {
            save: vi.fn(),
        } as unknown as ArticleRepository;
        feedFetcherService = {
            fetch: vi.fn(),
        } as unknown as FeedFetcherService;

        fetchFeedsUseCase = new FetchFeedsUseCase(
            feedRepository,
            articleRepository,
            feedFetcherService,
        );
    });

    it('should fetch feeds and save articles', async () => {
        const mockFeeds = [
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
        const mockArticlesFeed1 = [
            { id: 'a1', title: 'Article 1', feedId: '1' },
            { id: 'a2', title: 'Article 2', feedId: '1' },
        ];
        const mockArticlesFeed2 = [
            { id: 'b1', title: 'Article 3', feedId: '2' },
        ];

        feedRepository.list.mockResolvedValue(mockFeeds);
        feedFetcherService.fetch
            .mockResolvedValueOnce(mockArticlesFeed1)
            .mockResolvedValueOnce(mockArticlesFeed2);

        await fetchFeedsUseCase.execute();

        expect(feedRepository.list).toHaveBeenCalledTimes(1);
        expect(feedFetcherService.fetch).toHaveBeenCalledTimes(2);
        expect(feedFetcherService.fetch).toHaveBeenNthCalledWith(
            1,
            mockFeeds[0],
        );
        expect(feedFetcherService.fetch).toHaveBeenNthCalledWith(
            2,
            mockFeeds[1],
        );
        expect(articleRepository.save).toHaveBeenCalledTimes(3);
        expect(articleRepository.save).toHaveBeenNthCalledWith(
            1,
            mockArticlesFeed1[0],
        );
        expect(articleRepository.save).toHaveBeenNthCalledWith(
            2,
            mockArticlesFeed1[1],
        );
        expect(articleRepository.save).toHaveBeenNthCalledWith(
            3,
            mockArticlesFeed2[0],
        );
        expect(feedRepository.save).toHaveBeenCalledTimes(2);
    });

    it('should handle no feeds', async () => {
        feedRepository.list.mockResolvedValue([]);

        await fetchFeedsUseCase.execute();

        expect(feedRepository.list).toHaveBeenCalledTimes(1);
        expect(feedFetcherService.fetch).not.toHaveBeenCalled();
        expect(articleRepository.save).not.toHaveBeenCalled();
        expect(feedRepository.save).not.toHaveBeenCalled();
    });
});
