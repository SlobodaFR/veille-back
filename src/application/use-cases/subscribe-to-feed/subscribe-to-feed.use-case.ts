import { randomUUID } from 'crypto';

import { Feed } from '@domain/feed';

import { FeedRepository } from '@ports/feed.repository.ts';

export class SubscribeToFeedUseCase {
    constructor(private readonly feedRepository: FeedRepository) {}

    async execute(url: string, title?: string) {
        const feed = Feed.create({
            id: randomUUID(),
            url,
            title: title || 'Untitled Feed',
        });
        await this.feedRepository.save(feed);
        return feed;
    }
}
