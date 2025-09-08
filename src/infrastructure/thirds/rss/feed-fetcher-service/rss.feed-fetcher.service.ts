import { randomUUID } from 'crypto';

import Parser from 'rss-parser';

import { Article } from '@domain/article';
import { Feed } from '@domain/feed';

import { FeedFetcherService } from '@ports/feed-fetcher.service.ts';

export class RssFeedFetcherService implements FeedFetcherService {
    private readonly parser = new Parser();

    async fetch(feed: Feed): Promise<Array<Article>> {
        const feedContent = await this.parser.parseURL(feed.url);
        return feedContent.items.map((item) =>
            Article.create({
                id: randomUUID(),
                feedId: feed.id,
                title: item.title || '',
                url: item.link || '',
                content: item.content || '',
                publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
                read: false,
            }),
        );
    }
}
