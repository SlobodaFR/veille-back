import { Feed } from '@domain/feed';

import { FeedRepository } from '@ports/feed.repository';

import { prisma } from '../database';

export class SqliteFeedRepository implements FeedRepository {
    async save(feed: Feed): Promise<void> {
        await prisma.feed.upsert({
            where: { id: feed.id },
            update: {
                title: feed.title,
                url: feed.url,
                fetchedAt: feed.fetchedAt,
            },
            create: {
                id: feed.id,
                title: feed.title,
                url: feed.url,
                fetchedAt: feed.fetchedAt,
            },
        });
    }

    async findById(id: string): Promise<Feed | null> {
        const dbFeed = await prisma.feed.findUnique({ where: { id } });
        return dbFeed
            ? Feed.create({
                  id: dbFeed.id,
                  title: dbFeed.title,
                  url: dbFeed.url,
                  fetchedAt: dbFeed.fetchedAt,
              })
            : null;
    }

    async list(): Promise<Array<Feed>> {
        const dbFeeds = await prisma.feed.findMany();
        return dbFeeds.map((dbFeed) =>
            Feed.create({
                id: dbFeed.id,
                title: dbFeed.title,
                url: dbFeed.url,
                fetchedAt: dbFeed.fetchedAt,
            }),
        );
    }
}
