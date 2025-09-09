import { Module } from '@nestjs/common';
import { FetchFeedUseCase } from '@use-cases/fetch-feed';
import { ListFeedsUseCase } from '@use-cases/list-feeds';
import { RetrieveFeedArticlesUseCase } from '@use-cases/retrieve-feed-articles/retrieve-feed-articles.use-case';
import { SubscribeToFeedUseCase } from '@use-cases/subscribe-to-feed';

import { ArticleRepository } from '@ports/article.repository.ts';
import { FeedFetcherService } from '@ports/feed-fetcher.service.ts';
import { FeedRepository } from '@ports/feed.repository.ts';

import { InMemoryArticleRepository } from '@in-memory/article-repository';
import { InMemoryFeedRepository } from '@in-memory/feed-repository';
import { RestFeedController } from '@rest/feed/rest.feed.controller.ts';
import { RestFeedService } from '@rest/feed/rest.feed.service.ts';
import { RssFeedFetcherService } from '@thirds/rss/feed-fetcher-service';

@Module({
    controllers: [RestFeedController],
    providers: [
        RestFeedService,
        {
            provide: ListFeedsUseCase,
            useFactory: (feedRepository: FeedRepository) =>
                new ListFeedsUseCase(feedRepository),
            inject: ['FeedRepository'],
        },
        {
            provide: SubscribeToFeedUseCase,
            useFactory: (feedRepository: FeedRepository) =>
                new SubscribeToFeedUseCase(feedRepository),
            inject: ['FeedRepository'],
        },
        {
            provide: FetchFeedUseCase,
            useFactory: (
                feedRepository: FeedRepository,
                articleRepository: ArticleRepository,
                feedFetcherService: FeedFetcherService,
            ) =>
                new FetchFeedUseCase(
                    feedRepository,
                    articleRepository,
                    feedFetcherService,
                ),
            inject: [
                'FeedRepository',
                'ArticleRepository',
                'FeedFetcherService',
            ],
        },
        {
            provide: RetrieveFeedArticlesUseCase,
            useFactory: (articleRepository: ArticleRepository) =>
                new RetrieveFeedArticlesUseCase(articleRepository),
            inject: ['ArticleRepository'],
        },
        { provide: 'FeedRepository', useClass: InMemoryFeedRepository },
        { provide: 'ArticleRepository', useClass: InMemoryArticleRepository },
        { provide: 'FeedFetcherService', useClass: RssFeedFetcherService },
    ],
})
export class RestFeedModule {}
