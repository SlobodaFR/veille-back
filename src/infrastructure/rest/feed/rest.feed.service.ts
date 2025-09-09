import { Inject, Injectable } from '@nestjs/common';
import { FetchFeedUseCase } from '@use-cases/fetch-feed';
import { ListFeedsUseCase } from '@use-cases/list-feeds';
import { RetrieveFeedArticlesUseCase } from '@use-cases/retrieve-feed-articles/retrieve-feed-articles.use-case';
import { SubscribeToFeedUseCase } from '@use-cases/subscribe-to-feed';

import { Feed } from '@domain/feed';

import { ArticleRepository } from '@ports/article.repository.ts';
import { FeedFetcherService } from '@ports/feed-fetcher.service.ts';
import { FeedRepository } from '@ports/feed.repository.ts';

// Removed unused imports

@Injectable()
export class RestFeedService {
    constructor(
        private readonly listFeedsUseCase: ListFeedsUseCase,
        private readonly subscribeToFeedUseCase: SubscribeToFeedUseCase,
        private readonly fetchFeedUseCase: FetchFeedUseCase,
        @Inject('FeedRepository')
        private readonly feedRepository: FeedRepository,
        @Inject('ArticleRepository')
        private readonly articleRepository: ArticleRepository,
        @Inject('FeedFetcherService')
        private readonly feedFetcherService: FeedFetcherService,
        @Inject(RetrieveFeedArticlesUseCase)
        private readonly retrieveFeedArticlesUseCase: RetrieveFeedArticlesUseCase,
    ) {}

    async getFeedArticles(feedId: string) {
        if (!this.retrieveFeedArticlesUseCase)
            throw new Error('RetrieveFeedArticlesUseCase not provided');
        return this.retrieveFeedArticlesUseCase.execute(feedId);
    }

    async getFeeds(): Promise<Array<Feed>> {
        return this.listFeedsUseCase.execute();
    }

    async subscribeToFeed(title: string, url: string): Promise<Feed> {
        const feed = await this.subscribeToFeedUseCase.execute(url, title);
        await this.fetchFeedUseCase.execute(feed.id);
        return feed;
    }
}
