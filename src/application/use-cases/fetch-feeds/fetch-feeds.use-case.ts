import { ArticleRepository } from '@ports/article.repository.ts';
import { FeedFetcherService } from '@ports/feed-fetcher.service.ts';
import { FeedRepository } from '@ports/feed.repository.ts';

export class FetchFeedsUseCase {
    constructor(
        private readonly feedRepository: FeedRepository,
        private readonly articleRepository: ArticleRepository,
        private readonly feedFetcherService: FeedFetcherService,
    ) {}

    async execute() {
        const feeds = await this.feedRepository.list();
        for (const feed of feeds) {
            const articles = await this.feedFetcherService.fetch(feed);
            for (const article of articles) {
                await this.articleRepository.save(article);
            }
            await this.feedRepository.save(feed.withFetchedAt(new Date()));
        }
    }
}
