import { Article } from '@domain/article';
import { Feed } from '@domain/feed';

export interface FeedFetcherService {
    fetch(feed: Feed): Promise<Array<Article>>;
}
