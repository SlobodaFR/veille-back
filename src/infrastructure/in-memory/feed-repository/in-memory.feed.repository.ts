import { Feed } from '@domain/feed';

import { FeedRepository } from '@ports/feed.repository.ts';

export class InMemoryFeedRepository implements FeedRepository {
    private feeds: Array<Feed> = [];

    async save(feed: Feed) {
        const index = this.feeds.findIndex((f) => f.id === feed.id);
        if (index !== -1) this.feeds[index] = feed;
        else this.feeds.push(feed);
    }

    async findById(id: string) {
        return this.feeds.find((f) => f.id === id) || null;
    }

    async list() {
        return this.feeds;
    }
}
