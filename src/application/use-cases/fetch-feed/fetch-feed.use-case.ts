import { Article } from '@domain/article';

import { ArticleRepository } from '@ports/article.repository.ts';
import { FeedFetcherService } from '@ports/feed-fetcher.service.ts';
import { FeedRepository } from '@ports/feed.repository.ts';

export class FetchFeedUseCase {
    constructor(
        private readonly feedRepository: FeedRepository,
        private readonly articleRepository: ArticleRepository,
        private readonly feedFetcherService: FeedFetcherService,
    ) {}

    async execute(feedId: string): Promise<Array<Article>> {
        const feeds = await this.feedRepository.findById(feedId);

        if (!feeds) {
            return [];
        }
        const articles = await this.feedFetcherService.fetch(feeds);
        for (const article of articles) {
            await this.articleRepository.save(article);
        }
        await this.feedRepository.save(feeds.withFetchedAt(new Date()));
        return articles;
    }
}
