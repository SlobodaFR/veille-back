import { Feed } from '@domain/feed';

export interface FeedRepository {
    save(feed: Feed): Promise<void>;
    findById(id: string): Promise<Feed | null>;
    list(): Promise<Array<Feed>>;
}
