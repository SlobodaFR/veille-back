import { Injectable } from '@nestjs/common';
import { FetchFeedUseCase } from '@use-cases/fetch-feed';
import { ListFeedsUseCase } from '@use-cases/list-feeds';
import { SubscribeToFeedUseCase } from '@use-cases/subscribe-to-feed';

import { Feed } from '@domain/feed';

import { ArticleRepository } from '@ports/article.repository.ts';
import { FeedFetcherService } from '@ports/feed-fetcher.service.ts';
import { FeedRepository } from '@ports/feed.repository.ts';

import { InMemoryArticleRepository } from '@in-memory/article-repository';
import { InMemoryFeedRepository } from '@in-memory/feed-repository';
import { RssFeedFetcherService } from '@thirds/rss/feed-fetcher-service';

@Injectable()
export class RestFeedService {
    private readonly feedRepository: FeedRepository;
    private readonly articleRepository: ArticleRepository;
    private readonly feedFetcherService: FeedFetcherService;

    private readonly listFeedsUseCase: ListFeedsUseCase;
    private readonly subscribeToFeedUseCase: SubscribeToFeedUseCase;
    private readonly fetchFeedUseCase: FetchFeedUseCase;

    constructor(
        listFeedsUseCase?: ListFeedsUseCase,
        subscribeToFeedUseCase?: SubscribeToFeedUseCase,
        fetchFeedUseCase?: FetchFeedUseCase,
        feedRepository?: FeedRepository,
        articleRepository?: ArticleRepository,
        feedFetcherService?: FeedFetcherService,
    ) {
        this.feedRepository = feedRepository ?? new InMemoryFeedRepository();
        this.articleRepository =
            articleRepository ?? new InMemoryArticleRepository();
        this.feedFetcherService =
            feedFetcherService ?? new RssFeedFetcherService();

        this.listFeedsUseCase =
            listFeedsUseCase ?? new ListFeedsUseCase(this.feedRepository);
        this.subscribeToFeedUseCase =
            subscribeToFeedUseCase ??
            new SubscribeToFeedUseCase(this.feedRepository);
        this.fetchFeedUseCase =
            fetchFeedUseCase ??
            new FetchFeedUseCase(
                this.feedRepository,
                this.articleRepository,
                this.feedFetcherService,
            );
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
